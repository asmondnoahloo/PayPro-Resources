import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const Homepage = () => {
 
    const centeredTextStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      fontSize: '40px',
      fontFamily: 'Arial, Helvetica, sans-serif',
      color: ' #3A855D',
      fontWeight: 'bolder',
      fontStyle: 'italic',
    };
  
  return (
    <>
      <Navbar />
      <div style={{ marginTop : "140px" }}>
        <div style={centeredTextStyle}>Empowering Workplaces, Securing Futures: BlockHR PayPro</div>
        <div style={centeredTextStyle}>- Where Innovation Meets Payroll Perfection.</div>
          <br/>
        <div style={centeredTextStyle}>- A platform for all your employee </div>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
