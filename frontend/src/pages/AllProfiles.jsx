import { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import './AllProfiles.css';

function AllProfiles() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/profiles')
      .then(res => res.json())
      .then(data => {
        const sorted = [...data].sort((a, b) => b.id - a.id);
        setProfiles(sorted);
      })
      .catch(err => console.error('Failed to fetch profiles', err));
  }, []);

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
    <div className="all-profiles-page">
      <h2>All Roommate Profiles</h2>
      <div className="profile-list">
        {profiles.map((p, idx) => (
          <ProfileCard key={idx} {...formatProfileProps(p)} preview={false} />
        ))}
      </div>
    </div>
  );
}

export default AllProfiles;
