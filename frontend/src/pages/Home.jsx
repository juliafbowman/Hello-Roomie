import { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import HeadingSection from '../components/HeadingSection';
import './Home.css';
// import './FeaturesColumn.css';
import { Info, Star, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';


function Home() {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  // store form data 
  const [submittedFilter, setSubmittedFilter] = useState(null); 

  const isFiltered = submittedFilter !== null;

  useEffect(() => {
    fetch('http://127.0.0.1:5000/profiles')
      .then(res => res.json())
      .then(data => {
        console.log(".･☆.･｡ Profiles fetched:", data);
        const sorted = [...data].sort((a, b) => b.id - a.id);
        setProfiles(sorted);
        // show newest 3 profiles on front page 
        setFilteredProfiles(sorted.slice(0, 3));
      })
      .catch(err => console.error("╯•ᗣ•╰ ERROR fetching profiles:", err));
  }, []);
  

  const handleFilter = (matches, formData) => {
    setFilteredProfiles(matches);
    setSubmittedFilter(formData);
  };

  const handleReset = () => {
    setFilteredProfiles(profiles);
    setSubmittedFilter(null);
  };

  function formatProfileProps(p) {
    return {
      name: `${p.first_name} ${p.last_name}`,
      age: p.age,
      location: p.country,
      sex: p.sex,
      description: p.description,
      email: p.email,
      social: p.social_link,
      phone: p.phone_number,
      languages: [p.language, p.language_2].filter(Boolean).join(', '),
      smoking: !!p.smoking,
      drinking: !!p.drinking_socially,
      subleasing: !!p.subleasing
    };
  }

  return (
    <>
        {/* gradient header stuff */}
        <HeadingSection
        onSearch={handleFilter}
        isFiltered={isFiltered}
        submittedFilter={submittedFilter}
        onReset={handleReset}
        />
    
    {!isFiltered && (
    <div className="why-hello-roomie">
        <h2 className="feature-section-title">Why Choose HelloRoomie?</h2>
        <div className="feature-column">
        <div className="feature-item">
            <Globe className="feature-icon" />
            <h3>Global Network</h3>
            <p>Connect with potential roommates from around the world.</p>
        </div>
        <div className="feature-item">
            <Star className="feature-icon" />
            <h3>Compatibility Matching</h3>
            <p>Our algorithm finds roommates that match your lifestyle and preferences.</p>
        </div>
        <div className="feature-item">
            <Info className="feature-icon" />
            <h3>Detailed Filters</h3>
            <p>Narrow your search by age, habits, budget, language, and more — find exactly who you're looking for.</p>
        </div>
        </div>
    </div>
    )}


    {/* wrap layout to center the content */}
    <div className="page-wrapper">
        <div className="home-layout">
            <div className="profile-column">
            <h2 className="match-heading">
                {isFiltered ? 'Users For You' : 'Meet Our Newest Users'}
            </h2>
    
            <div className="profile-grid">
                {filteredProfiles.length === 0 ? (
                <p>No matches found.</p>
                ) : (
                filteredProfiles.map((p, index) => (
                    <ProfileCard key={index} {...formatProfileProps(p)} preview={!isFiltered} />
                    ))
                )}
            </div>
            {!isFiltered && (
                <div className="see-all-container">
                    <Link to="/all-profiles" className="browse-all-button">
                    Browse All Roomies
                    </Link>
                </div>
                )}
            </div>
        </div> 
    </div>

    {/* footer  */}
    {!isFiltered && (
        <div className="home-footer-section">
            <div className="content-container">
            <h2 className="heading-title">Ready to Find Your Perfect Roommate?</h2>
            <p className="heading-subtitle">Join thousands of users who have found their ideal living situation</p>
            <div className="footer-buttons">
                <Link to="/add-profile" className="footer-primary">Create Your Profile</Link>
                <Link to="/all-profiles" className="footer-secondary">Browse Roommates</Link>
            </div>
            </div>
        </div>
    )}

    </>
    );
}
      

export default Home;
