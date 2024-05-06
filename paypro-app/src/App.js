import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import SignIn from './pages/SignIn';
import Account from './pages/Account';
import './App.css';
import Web3 from 'web3';
import EmployeeContract from './build/EmployeeContract.json';
import AddEmp from './components/AddEmp';
import ViewAllEmp from './pages/ViewAllEmp';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      petCount: 0,
      loading: true,
      listOfEmp: [],
    };
    this.addEmployee = this.addEmployee.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
    this.payEmployee = this.payEmployee.bind(this);
    this.terminateEmp = this.terminateEmp.bind(this);
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchain();
    this.fetchEmployeeList();
  }

  async fetchEmployeeList() {
    try {
      const { employeeContract } = this.state;
      const employeeList = await employeeContract.methods
        .getAllEmployees()
        .call();
      this.setState({ listOfEmp: employeeList });
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }
  async loadWeb3() {
    //loads the connection to the blockchain (ganache )
    //window.web3 = new Web3("http://127.0.0.1:7545");
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
  }

  async loadBlockchain() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const networkData = EmployeeContract.networks[networkId];
    if (networkData) {
      const employeeContract = new web3.eth.Contract(
        EmployeeContract.abi,
        networkData.address
      );

      this.setState({
        web3,
        accounts,
        employeeContract,
        loading: false,
        account: accounts[0],
      });

      const adminExists = await employeeContract.methods
        .accountExists('admin')
        .call({ from: accounts[0], gas: 2000000 });

      if (!adminExists) {
        await this.addEmployee(
          accounts[0],
          'admin',
          '/images/admin.jpg',
          'admin',
          'Admin',
          100000,
          'HR',
          'Admin',
          true
        );
      }
    }
  }

  async addEmployee(
    employeeAddress,
    accountId,
    picName,
    password,
    name,
    salary,
    department,
    role,
    isHR
  ) {
    const boolIsHR = Boolean(isHR);
    const { employeeContract, account } = this.state;

    try {
      // Get the balance of the current account
      const balance = await window.web3.eth.getBalance(account);
      console.log('Account Balance:', balance);

      const gasEstimation = await employeeContract.methods
        .addEmployee(
          employeeAddress,
          accountId,
          picName,
          password,
          name,
          window.web3.utils.toWei(salary, 'ether'),
          department,
          role,
          boolIsHR
        )
        .estimateGas({ from: account });

      console.log('Gas Estimate:', gasEstimation);

      // Send the transaction to add an employee
      const transaction = await employeeContract.methods
        .addEmployee(
          employeeAddress,
          accountId,
          picName,
          password,
          name,
          window.web3.utils.toWei(salary, 'ether'),
          department,
          role,
          boolIsHR
        )
        .send({ from: account, gas: gasEstimation });
      this.fetchEmployeeList();
      console.log('Transaction Hash:', transaction.transactionHash);
      console.log('Employee added successfully');
    } catch (error) {
      console.error('Error adding employee:', error);

      if (error instanceof Error && error.message.includes('revert')) {
        console.error('Transaction reverted. Check the input parameters.');
      } else if (
        error instanceof Error &&
        error.message.includes('out of gas')
      ) {
        console.error('Transaction ran out of gas. Increase the gas limit.');
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }

  async payEmployee(id, salary) {
    await this.state.employeeContract.methods
      .paySalary(id)
      .send({
        from: this.state.account,
        value: salary,
        gas: 2100000,
      })
      .on('transactionHash', function (hash) {
        console.log('Transaction hash:', hash);
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        console.log('Confirmation number:', confirmationNumber);
      })
      .on('receipt', function (receipt) {
        console.log('Receipt:', receipt);
      })
      .on('error', console.error);
    window.location.reload();
  }

  async checkUserExists(_accountId) {
    try {
      const { employeeContract, accounts } = this.state;

      if (employeeContract && accounts) {
        const exists = await employeeContract.methods
          .accountExists(_accountId)
          .call({ from: accounts[0], gas: 2000000 });

        console.log('User exists on the blockchain:', exists);

        if (exists) {
          const employeeAddress = await employeeContract.methods
            .getEmployeeAddress(_accountId)
            .call({ from: accounts[0], gas: 2000000 });

          this.setState({ account: employeeAddress });

          return true;
        }
      } else {
        console.log('Employee contract or accounts not available.');
      }
    } catch (error) {
      console.log('Error checking user existence:', error);
    }

    return false;
  }


  async terminateEmp(id) {
    try {
      const { employeeContract } = this.state;
      // Call the terminateEmployee function of the contract
      const transaction = await employeeContract.methods.terminateEmp(id).send({
        from: this.state.account,
        gas: 3000000, // Adjust gas limit as needed
        gasPrice: '1000000000', // Adjust gas price as needed
      });
      console.log('Transaction Hash:', transaction.transactionHash);
      console.log('Transaction Receipt:', transaction);
      // Refresh the employee list after termination
      this.fetchEmployeeList();
      // Optionally, display a success message or perform any other action
    } catch (error) {
      console.error('Error terminating employee:', error);
      // Display the error message to the user
      // You can set an error state here to display an error message in the UI
    }
  }
  

  render() {
    const { listOfEmp } = this.state;
    return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route
          path="/signin"
          element={<SignIn checkUserExists={this.checkUserExists} />}
        />
        <Route
          path="/account"
          element={<Account account={this.state.account} />}
        />

        <Route
          path="/addEmployee"
          element={<AddEmp addEmployee={this.addEmployee} />}
        />
        <Route
          path="/viewEmployee"
          element={
            <ViewAllEmp
              employees={listOfEmp}
              payEmployee={this.payEmployee}
              terminateEmp={this.terminateEmp}

            />
          }
        />
      </Routes>
    );
  }
}

export default App;
