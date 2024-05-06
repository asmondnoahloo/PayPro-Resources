const Emp = artifacts.require("EmployeeContract");

module.exports = function (deployer) {
  deployer.deploy(Emp);
};