// Home.jsx
import { Link } from "react-router-dom";
const Home = () => {
    return (
        <section className="hero" id="home">
            <div className="hero-content">
                <h1>Welcome to VNRVJIET Entrepreneurs</h1>
                <p>Empowering students to innovate, build, and lead the future of startups.</p>
                <Link to="/form" className="cta-button">Join Us</Link>
            </div>
        </section>
    );
};

export default Home;

