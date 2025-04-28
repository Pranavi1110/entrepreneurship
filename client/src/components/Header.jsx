import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import './Header.css'

const Header = () => {
    return (
        <header className="main-header">
            <div className="logo">🚀 VNRVJIET Entrepreneurs</div>
            <nav>
                <ul>
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/form" className="nav-link">Registration Form</Link></li>
                    <li><Link to="/students" className="nav-link">Student Details</Link></li>
                    <SignedOut>
                        <li>
                            <SignInButton className="signin-button" />
                        </li>
                    </SignedOut>
                    <SignedIn>
                        <li><UserButton /></li>
                    </SignedIn>
                </ul>
            </nav>
        </header>
    );
};

export default Header;