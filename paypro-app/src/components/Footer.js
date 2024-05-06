import React from "react";

const Footer = () => {
    const footerStyle = {
        backgroundImage: "url('building.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '200px',
        color: 'white',
        padding: '20px',
        position: 'fixed',
        bottom: '0',
        width: '100%',
      };

    return (
        <footer style={footerStyle}>
      </footer>
    );
  };
  
  export default Footer;