const EmpContract = artifacts.require("./EmployeeContract.sol");


contract("EmployeeContract", (accounts) => {
    let empContract;
    console.log("Employee addresses:", accounts);
    let employer = accounts[0];
    let employee1 = accounts[1];
    console.log("Employee 1 address:", employee1);

    before(async () => {
        empContract = await EmpContract.deployed();
    });

    describe("Deployment", async () => {
        it("Verify the employee count is 0", async () => {
            const empCount = await empContract.getEmpCount();
            assert.equal(empCount, 0);
        });

        it("Verify the company name", async () => {
            const companyName = await empContract.getCompanyName();
            assert.equal(companyName, "PayPro Resources Pte Ltd");

        });
    });

    describe("Add Employee", async () => {

        before(async () => {

            const accountId = "employee1";
            const picture = "test";
            const password = "password";
            const name = "John Doe";
            const salary = '5';
            const department = "IT";
            const role = "Software Engineer";
            const isHR = false;

            await empContract.addEmployee(
                employee1,
                accountId,
                picture,
                password,
                name,
                salary,
                department,
                role,
                isHR,
            );
        });

        it("Employee count should go up ", async () => {
            const empCount = await empContract.getEmpCount();
            assert.equal(empCount, 1);
        });

        it("Employee details should be correct", async () => {
            const empDetails = await empContract.getEmployee(employee1);
            console.log("Employee details:", empDetails);
            assert.equal(empDetails[0], employee1);
            assert.equal(empDetails[1], "employee1");
            assert.equal(empDetails[2], "John Doe");
            assert.equal(empDetails[3].toString(), "5");
            assert.equal(empDetails[4], "IT");
            assert.equal(empDetails[5], "Software Engineer");
            assert.equal(empDetails[6], false);
            assert.equal(empDetails[7], true);
        });

    });

    describe("pay salary to employee", async () => {
        console.log("employer address", employer);
        salary = 5;
        it("Verify employer and employee's balances", async () => {
            employerBalance = await web3.eth.getBalance(employer);
            employerBalanceEth = web3.utils.fromWei(employerBalance, "ether");
            console.log("Employer balance:", employerBalanceEth);
    
            employee1Balance = await web3.eth.getBalance(employee1);
            employee1BalanceEth = web3.utils.fromWei(employee1Balance, "ether");
            console.log("Employee balance:", employee1BalanceEth);
    
            assert(employerBalance > 0);
        });
    
        it("Employer should be able to pay salary to employee", async () => {
            employee1Details = await empContract.getEmployee(employee1);
            console.log('employee1Details',employee1Details)
            const salaryInWei = web3.utils.toWei(salary.toString(), "ether");
            console.log('salaryInWei',salaryInWei)
            const result = await empContract.paySalary(employee1Details[1], { from: employer, value: salaryInWei, gas: 2000000 });
            console.log("Transaction hash:", result.tx);
        });
    
        it("Salary paid count should be 1", async () => {
            const salaryPaidCount = await empContract.getSalaryPaidCount();
            assert.equal(salaryPaidCount, 1);
        });
    
        it("Employee balance should go up", async () => {
            // Update employee1Balance after paying the salary
            employee1Balance = await web3.eth.getBalance(employee1);
            const currentEmployee1Balance = web3.utils.fromWei(employee1Balance, "ether");
            console.log("Employee balance after salary paid:", currentEmployee1Balance);
                
            // Calculate the expected new balance
            const newEmployee1Balance = parseFloat(currentEmployee1Balance) ;
        
            // Assert that the new balance matches the expected value
            assert.equal(employee1Balance, web3.utils.toWei(newEmployee1Balance.toString(), "ether"));
        });
        
    });
    

});
