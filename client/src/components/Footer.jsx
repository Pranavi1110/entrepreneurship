const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h3>About Us</h3>
                    <p>VNRVJIET Entrepreneurs is a community fostering innovation, startups, and leadership among students.</p>
                </div>
                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Events</a></li>
                        <li><a href="#">Resources</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <p>Email: contact@vnrvjietentrepreneurs.com</p>
                    <p>Phone: +91 98765 43210</p>
                    <p>Location: VNRVJIET, Hyderabad, India</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 VNRVJIET Entrepreneurs | All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;