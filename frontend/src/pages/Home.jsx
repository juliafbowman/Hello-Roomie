import { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import FilterPanel from '../components/FilterPanel'; 
import './Home.css'; 

function Home() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/profiles') // this is the url for my local host backend idk if it will be the same for u guys 
      .then(res => res.json())
      .then(data => {
        // this is a debug 
        console.log(".･☆.･｡ Profiles fetched:", data); 
        setProfiles(data);
      })
      .catch(err => console.error("╯•ᗣ•╰ ERROR fetching profiles:", err));
  }, []);

  return (
    <div className = "home-layout">
        <div className = "profile-column">
            <h1>Find Yourself a Roommate</h1>

            {/* <button
                className="filter-toggle-button"
                onClick={() => setShowFilters(prev => !prev)}
                >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button> */}

            {profiles.map((p, index) => (
                <ProfileCard
                key={index}
                name={`${p.first_name} ${p.last_name}`}
                age={p.age}
                location={p.country}
                sex={p.sex}
                description={p.description}
                email={p.email}
                social={p.social_link}
                phone={p.phone_number}
                // handle nulls hopefully 
                languages={[p.language, p.language_2].filter(Boolean).join(', ')}
                // the !! makes it a true false - i think text should go true so we might have to limit inputs 
                smoking={!!p.smoking}
                drinking={!!p.drinking_socially}
                subleasing={!!p.subleasing}
                />
            ))}
        </div>
        <div className = "filter-column">
            <FilterPanel />
        </div>
    </div>
  );
}

export default Home;
