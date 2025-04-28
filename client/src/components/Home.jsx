import { useUser } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // Keeping original logic exactly as it was
  const handleReportClick = () => {
    if (user && user.publicMetadata?.role === 'admin') {
      navigate('/reports');
    } else {
      alert('You must be an admin to view reports!');
    }
  };

  return (
    <section className="hero" id="home">
      <div className="bubbles">
        {Array.from({ length: 15 }).map((_, index) => (
          <div key={index} className="bubble"></div>
        ))}
      </div>
      
      <div className="hero-content">
        <div className="title-container">
          <h1>
            <span className="welcome-text">Welcome to </span>
            <span className="highlight">VNRVJIET</span><br/>
            <span className="highlight">Entrepreneurs</span>
          </h1>
        </div>
        
        <p>Empowering students to innovate, build, and lead the future of startups.</p>

        <div className="buttons">
          <Link to="/form" className="cta-button">Join Us</Link>
          <button className="report-button" onClick={handleReportClick}>
            View Report
          </button>
          <Link to="#learn-more" className="learn-button">Learn More</Link>
        </div>
        
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">STARTUPS</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">200+</div>
            <div className="stat-label">MEMBERS</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">₹10M+</div>
            <div className="stat-label">FUNDING</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;