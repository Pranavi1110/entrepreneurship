import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <section className="hero" id="home">
            <div className="hero-content">
                <h1>Welcome to VNRVJIET Entrepreneurs</h1>
                <p>Empowering students to innovate, build, and lead the future of startups.</p>

                {/* Navigation Buttons */}
                <div className="buttons">
                    <Link to="/form" className="cta-button">Join Us</Link>
                    <button className="report-button" onClick={() => navigate('/reports')}>
                        View Report
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Home;