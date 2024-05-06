import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const AboutUs = () => {
  const centeredTextStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    fontSize: '20px',
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: '#3A855D',
    fontWeight: 'bolder',
    textAlign: 'center',
    marginTop: '30px',
  };
  

  return (
    <>
      <Navbar/>
      <div style = {centeredTextStyle}>
      At BlockHR PayPro, we are more than just a company; <br/>
      we are architects of change, reshaping the landscape of HR and payroll management. <br/>
      Established with a passion for innovation, we are a team of dedicated <br/>professionals driven by a shared vision: <br/>
      to redefine how businesses approach human resources.
      </div>
      <div style={centeredTextStyle}>
      Smart contracts in PayPro automate the payroll process. <br/>Once predefined conditions (e.g., work hours, bonuses, deductions) are met, <br/>
      the smart contract triggers and executes salary payments. <br/>
This automation reduces the need for manual intervention, <br/> minimizing errors and ensuring timely and accurate payroll processing.
      </div>
      <div style = {centeredTextStyle}>
      Every salary transaction is recorded on the blockchain <br/>through a transparent smart contract. This creates an immutable <br/>
      ledger of financial transactions that is visible to authorized personnel.
      </div>
      <Footer/>
      
    </>
  )
}

export default AboutUs