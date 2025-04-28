import './Footer.css'
const Footer = () => {
    return (
        <footer className="footer">
            {/* <div className="footer-top">
                <div className="footer-curve"></div>
            </div> */}
            <div className="footer-main">
                <div className="footer-content">
                    <div className="footer-section about">
                        <h3>About Us</h3>
                        <p>VNRVJIET Entrepreneurs - Fostering innovation and leadership among students.</p>
                    </div>
                    <div className="footer-section links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="#resources">Resources</a></li>
                            <li><a href="#events">Events</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-section contact">
                        <h3>Contact Us</h3>
                        <p>Email: contact@vnrvjiet.in</p>
                        <p>VNRVJIET, Hyderabad</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 VNRVJIET Entrepreneurs</p>
            </div>
        </footer>
    );
};

export default Footer;