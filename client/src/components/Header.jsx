import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Header = () => {
    return (
        <header className="main-header">
            <div className="logo">🚀 VNRVJIET Entrepreneurs</div>
            <nav>
                <ul>
                    <li style={{marginTop:"10px"}}><Link to="/">Home</Link></li>
                    <li style={{marginTop:"10px"}}><Link to="/form">Registration Form</Link></li>
                    <li style={{marginTop:"10px"}}><Link to="/students">Student Details</Link></li>
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
