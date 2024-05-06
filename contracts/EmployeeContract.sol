// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract EmployeeContract {
    enum empStatus {
        active,
        inactive
    }
    uint256 public empCount = 0;
    empStatus status;
    string companyName;
    uint256 public totalSalaryPaid;

    struct Employee {
        address employeeAddress;
        string accountId;
        string picture;
        string password;
        string name;
        uint256 salary;
        string department;
        string role;
        empStatus status;
        bool isHR;
    }

    struct Salary {
        uint256 amount;
        uint256 datePaid;
        address employeeAddress;
    }

    Salary[] public salaries;
    mapping(address => Salary) public salaryDetails;

    event SalaryPaid(uint256 amount, uint256 datePaid, address employeeAddress);

    constructor() {
        empCount = 0;
        status = empStatus.active;
        companyName = "PayPro Resources Pte Ltd";
        totalSalaryPaid = 0;
    }

    mapping(string => Employee) public employees;
    mapping(address => Employee) public pastEmployees;
    mapping(address => Employee) public employeeAddressList;
    Employee[] public employeeList;

    event EmployeeAdded(
        address indexed employeeAddress,
        string indexed accountId
    );
    event EmployeeDeleted(
        address indexed employeeAddress,
        string indexed accountId
    );
    event EmployeeUpdated(
        address indexed employeeAddress,
        string indexed accountId
    );

    function addEmployee(
        address _employeeAddress,
        string memory _accountId,
        string memory _picture,
        string memory _password,
        string memory _name,
        uint256 _salary,
        string memory _department,
        string memory _role,
        bool _isHR
    ) public {
        Employee memory employee = Employee({
            employeeAddress: _employeeAddress,
            accountId: _accountId,
            picture: _picture,
            password: _password,
            name: _name,
            salary: _salary,
            department: _department,
            role: _role,
            status: empStatus.active,
            isHR: _isHR
        });
        employeeList.push(employee);
        employees[_accountId] = employee;
        employeeAddressList[_employeeAddress] = employee;
        empCount++;

        emit EmployeeAdded(_employeeAddress, _accountId);
    }

    function terminateEmp(string memory id) public {
        Employee storage emp = employees[id];
        emp.status = empStatus.inactive;
        
    }


    function updateEmployee(
        address _employeeAddress,
        string memory _accountId,
        string memory _name,
        uint256 _salary,
        string memory _department,
        string memory _role
    ) public {
        Employee storage employee = employees[_accountId];
        employee.accountId = _accountId;
        employee.name = _name;
        employee.salary = _salary;
        employee.department = _department;
        employee.role = _role;

        emit EmployeeUpdated(_employeeAddress, _accountId);
    }

    function getEmployee(
        address _employeeAddress
    )
        public
        view
        returns (
            address,
            string memory,
            string memory,
            uint256,
            string memory,
            string memory,
            bool,
            bool
        )
    {
        Employee storage employee = employeeAddressList[_employeeAddress];
        return (
            employee.employeeAddress,
            employee.accountId,
            employee.name,
            employee.salary,
            employee.department,
            employee.role,
            employee.isHR,
            employee.status == empStatus.active
        );
    }

    function accountExists(
        string memory _accountId
    ) public view returns (bool) {
        bool accountFound = false;

        for (uint256 i = 0; i < employeeList.length; i++) {
            if (
                keccak256(abi.encodePacked(employeeList[i].accountId)) ==
                keccak256(abi.encodePacked(_accountId))
            ) {
                accountFound = true;
                break;
            }
        }

        return accountFound;
    }

    function paySalary(string memory accountId) public payable {
        // Retrieve the employee details using the account ID
        Employee memory employee = employees[accountId];

        // Ensure that the employee exists and the amount sent is greater than or equal to the employee's salary
        require(employee.employeeAddress != address(0), "Employee not found");
        require(msg.value >= employee.salary, "Incorrect salary amount");

        address payable employeeAddress = payable(employee.employeeAddress);

        // Perform the salary payment
        uint256 salaryAmount = msg.value;
        Salary memory newSalary = Salary(
            salaryAmount,
            block.timestamp,
            employee.employeeAddress
        );
        employeeAddress.transfer(salaryAmount);

        // Update salary-related mappings and arrays
        salaries.push(newSalary);
        salaryDetails[employee.employeeAddress] = newSalary;
        totalSalaryPaid++;

        // Emit the SalaryPaid event
        emit SalaryPaid(
            salaryAmount,
            block.timestamp,
            employee.employeeAddress
        );
    }

    function getSalariesPaid() public view returns (Salary[] memory) {
        return salaries;
    }

    function getEmployeeAddress(
        string memory _accountId
    ) public view returns (address) {
        return employees[_accountId].employeeAddress;
    }

    function getAllEmployees() public view returns (Employee[] memory) {
        return employeeList;
    }

    function getCompanyName() public view returns (string memory) {
        return companyName;
    }

    function getEmpCount() public view returns (uint256) {
        return empCount;
    }

    function getEmpSalary(string memory id) public view returns (uint256) {
        return employees[id].salary;
    }

    function getSalaryPaidCount() public view returns (uint256) {
        return totalSalaryPaid;
    }

    function getEmpBalance(
        address _employeeAddress
    ) public view returns (uint256) {
        return _employeeAddress.balance;
    }

    function getEmployeeStatusByAddress(address _employeeAddress) public view returns (empStatus) {
    Employee storage employee = employeeAddressList[_employeeAddress];
    return employee.status;
}



    
}
