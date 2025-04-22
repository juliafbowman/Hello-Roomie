import { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import HeadingSection from '../components/HeadingSection';
import './Home.css';

function Home() {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  // store form data 
  const [submittedFilter, setSubmittedFilter] = useState(null); 

  const isFiltered = filteredProfiles.length !== profiles.length;

  useEffect(() => {
    fetch('http://127.0.0.1:5000/profiles')
      .then(res => res.json())
      .then(data => {
        console.log(".･☆.･｡ Profiles fetched:", data);
        setProfiles(data);
        setFilteredProfiles(data);
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
    
        {/* wrap layout to center the content */}
        <div className="page-wrapper">
        <div className="home-layout">
            <div className="profile-column">
            <h2 className="match-heading">
                {isFiltered ? 'Best Matches for You' : 'Meet Our Newest Users'}
            </h2>
    
            <div className="profile-grid">
                {filteredProfiles.length === 0 ? (
                <p>No matches found.</p>
                ) : (
                filteredProfiles.map((p, index) => (
                    <ProfileCard key={index} {...formatProfileProps(p)} />
                ))
                )}
            </div>
            </div>
        </div>
        </div>
    </>
    );
}
      

export default Home;
