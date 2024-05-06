import React, { Component } from 'react';
import AccountNavbar from './AccountNavbar';

class AddEmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: '',
      errorMessage: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      employeeAddress,
      accountId,
      pictureURL,
      password,
      name,
      salary,
      department,
      role,
      isHR,
    } = this;

    // Validate inputs
    if (
      !employeeAddress.value ||
      !accountId.value ||
      !password.value ||
      !name.value ||
      isNaN(parseFloat(salary.value))
    ) {
      this.setState({
        errorMessage: 'Please fill in all fields and provide a valid salary.',
      });
      return;
    }

    // Add employee
    this.props.addEmployee(
      employeeAddress.value,
      accountId.value,
      pictureURL.value,
      password.value,
      name.value,
      salary.value,
      department.value,
      role.value,
      isHR.checked
    );

    // Reset form and show success message
    this.setState({
      successMessage: 'Employee added successfully',
      errorMessage: '',
    });
    event.target.reset();
  };

  render() {
    const { successMessage, errorMessage } = this.state;
    const centerStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    };

    return (
      <>
        <AccountNavbar />
        <div id="content" style={centerStyle}>
          <h1>Add Employee</h1>
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group mr-sm-2">
              <input
                id="employeeAddress"
                type="text"
                ref={(input) => {
                  this.employeeAddress = input;
                }}
                className="form-control"
                placeholder="Employee Address"
                required
              />
            </div>
            <br />
            <div className="form-group mr-sm-2">
              <input
                id="accountId"
                type="text"
                ref={(input) => {
                  this.accountId = input;
                }}
                className="form-control"
                placeholder="Account ID"
                required
              />
            </div>
            <br />
            <div className="form-group mr-sm-2">
              <input
                id="pictureURL"
                type="text"
                ref={(input) => {
                  this.pictureURL = input;
                }}
                className="form-control"
                placeholder="Picture URL"
                required
              />
            </div>
            <br />
            <div className="form-group mr-sm-2">
              <input
                id="password"
                type="text"
                ref={(input) => {
                  this.password = input;
                }}
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
            <br />
            <div className="form-group mr-sm-2">
              <input
                id="name"
                type="text"
                ref={(input) => {
                  this.name = input;
                }}
                className="form-control"
                placeholder="Name"
                required
              />
            </div>
            <br />
            <div className="form-group mr-sm-2">
              <input
                id="salary"
                type="text"
                ref={(input) => {
                  this.salary = input;
                }}
                className="form-control"
                placeholder="Salary"
                required
              />
            </div>
            <br />
            <div className="form-group mr-sm-2">
              <input
                id="department"
                type="text"
                ref={(input) => {
                  this.department = input;
                }}
                className="form-control"
                placeholder="Department"
                required
              />
            </div>
            <br />
            <div className="form-group mr-sm-2">
              <input
                id="role"
                type="text"
                ref={(input) => {
                  this.role = input;
                }}
                className="form-control"
                placeholder="Role"
                required
              />
            </div>
            <br />
            <div className="form-group mr-sm-2">
              <label>
                Is HR:
                <input
                  type="checkbox"
                  ref={(input) => {
                    this.isHR = input;
                  }}
                />
              </label>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Add Employee
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default AddEmp;
