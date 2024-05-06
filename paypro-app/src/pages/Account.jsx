import { Component } from "react";
import AccountNavbar from "../components/AccountNavbar";

class Account extends Component {
    render() {
        return (
            <>
            <br/>
            <AccountNavbar/>
            <div className="container">
                <h1>Account: {this.props.account}</h1>
            </div>
            
            </>
        );
    }
}

export default Account;