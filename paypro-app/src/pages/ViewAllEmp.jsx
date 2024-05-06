import React from 'react';
import AccountNavbar from '../components/AccountNavbar';

const ViewAllEmp = ({ employees, payEmployee, terminateEmp }) => {
 
 
  return (
    <>
      <style>
        {`
          .panel-pet {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 20px;
            transition: box-shadow 0.3s ease;
            color: #fff;
            background-color: #3A855A;
          }

          .panel-pet:hover {
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.8);
          }

          .buyButton {
            background-color: #fff;
            color: #3A855A;
            
          }

          .buyButton:hover {  
            opacity: 0.6;
          }
          .terminateButton {
            background-color: red;
            color: #fff;
            margin-left: 10px;
          }

          .terminateButton:hover {
            opacity: 0.6;
          }
        `}
      </style>
      <AccountNavbar />
      <div className="p-5">
        <h2 className="text-center fw-bold">Employee Table</h2>
        <div id="petsRow" className="row">
          {employees.map((emp, key) => (
            <div key={key} className="col-sm-6 col-md-4 col-lg-3 mt-4">
              <div id="empTemplate">
                <div className="panel panel-default panel-pet">
                  <div className="panel-heading">
                    <h3 className="panel-title">{emp.name}</h3>
                  </div>
                  <div className="panel-body">
                    <img
                      alt="140x140"
                      height="200"
                      data-src="holder.js/140x140"
                      className="img-rounded img-center"
                      src={emp.picture}
                      data-holder-rendered="true"
                    />
                    <br />
                    <br />
                    <strong>Account ID</strong>:{' '}
                    <span className="pet-name">{emp.accountId}</span>
                    <br />
                    <strong>Role</strong>:{' '}
                    <span className="pet-breed">{emp.role}</span>
                    <br />
                    <strong>Department</strong>:{' '}
                    <span className="pet-age">{emp.department}</span>
                    <br />
                    <strong>Salary</strong>:{' '}
                    <span className="pet-location">
                      {window.web3.utils.fromWei(
                        emp.salary.toString(),
                        'ether'
                      ) + ' ETH'}{' '}
                    </span>
                    <br />
                    <strong>Status </strong>:{' '}
                    {emp.status.toString() === '0' ? 'Active' : 'Inactive'}
                    <br />
                    <strong>Wallet Address</strong>:{' '}
                    <span
                      style={{ wordWrap: 'break-word' }}
                      className="pet-owner"
                    >
                      {emp.employeeAddress}
                    </span>
                    <br />
                    <br />
                    <strong>
                      {
                        <button
                          className="buyButton"
                          name={emp.accountId}
                          value={emp.salary}
                          onClick={(event) => {
                            console.log('buy clicked');
                            payEmployee(event.target.name, event.target.value);
                          }}
                        >
                          Pay
                        </button>
                      }
                    </strong>
                    <strong>
                      {
                        <button
                          className="terminateButton"
                          name={emp.employeeAddress}
                          status = {emp.status.toString() === '0' ? 'Active' : 'Inactive'}
                          onClick={(event) => {
                            console.log('Terminate clicked');
                            console.log(event.target.status);
                            console.log(event.target.name);
                            terminateEmp(event.target.name);
                          }}
                        >
                          Terminate
                        </button>
                      }
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewAllEmp;
