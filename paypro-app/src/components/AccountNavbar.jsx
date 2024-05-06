import { Link } from "react-router-dom";
import "../AccNavBar.css";

const AccountNavbar = () => {
    return (
        <>

            <nav className='account-navbar'>
            <div className="navbar-buttons">
                <Link to="/" className="navbar-button">
                    <button>Log Out</button>
                </Link>
                <Link to="/account" className="navbar-button">
                    <button>Account</button>
                </Link>
                <Link to="/addEmployee" className="navbar-button">
                    <button>Add Employee</button>
                </Link>
                <Link to="/viewEmployee" className="navbar-button">
                    <button>View All Employee</button>
                </Link>
            </div>
        </nav>

        </>
    )
};

export default AccountNavbar;
