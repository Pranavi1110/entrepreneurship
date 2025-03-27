// Header.jsx
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="main-header">
            <div className="logo">🚀 VNRVJIET Entrepreneurs</div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/form">Registration Form</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;