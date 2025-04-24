import { useClerk, useUser } from '@clerk/clerk-react'; // Import Clerk hooks
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useUser();  // Fetch the current user
  const navigate = useNavigate();

  const handleReportClick = () => {
    if (user && user.publicMetadata?.role === 'admin') {
      navigate('/reports');
    } else {
      alert('You must be an admin to view reports!');
      // Optionally redirect to a login page
    //   <SignInButton />
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>Welcome to VNRVJIET Entrepreneurs</h1>
        <p>Empowering students to innovate, build, and lead the future of startups.</p>

        {/* Navigation Buttons */}
        <div className="buttons">
          <Link to="/form" className="cta-button">Join Us</Link>
          <button className="report-button" onClick={handleReportClick}>
            View Report
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
