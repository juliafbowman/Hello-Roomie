import { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import './BestMatch.css';

function BestMatch() {
  const [formData, setFormData] = useState({
    age: '',
    smoking: '0',
    drinking_socially: '0',
    subleasing: '0',
    country: '',
    language: '',
    language_2: '',
    sex: '',
    max_rent: '',
    description_tags: ''
  });

  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    setError(null);
    try {
      const payload = {
        age: parseInt(formData.age),
        smoking: parseInt(formData.smoking),
        drinking_socially: parseInt(formData.drinking_socially),
        subleasing: parseInt(formData.subleasing),
        country: formData.country.trim(),
        language: formData.language.trim(),
        language_2: formData.language_2.trim() || null,
        sex: formData.sex.trim().toUpperCase(),
        max_rent: parseInt(formData.max_rent),
        description_tags: formData.description_tags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag)
      };

      const res = await fetch('http://127.0.0.1:5000/matchProfiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Server error');

      const data = await res.json();
      setMatches(data.matches || []);
    } catch (err) {
      setError(err.message || 'Unknown error');
    }
  };

  return (
    <div className="best-match-page" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="best-match-title">Find Your Ideal Roommate</h2>

<div className="best-match-form">
  <input className="best-match-input" type="number" id="age" placeholder="Your Age" value={formData.age} onChange={handleChange} />

  <label>Do you smoke?
    <select className="best-match-select" id="smoking" value={formData.smoking} onChange={handleChange}>
      <option value="0">No</option>
      <option value="1">Yes</option>
    </select>
  </label>

  <label>Do you drink socially?
    <select className="best-match-select" id="drinking_socially" value={formData.drinking_socially} onChange={handleChange}>
      <option value="0">No</option>
      <option value="1">Yes</option>
    </select>
  </label>

  <label>Open to subleasing?
    <select className="best-match-select" id="subleasing" value={formData.subleasing} onChange={handleChange}>
      <option value="0">No</option>
      <option value="1">Yes</option>
    </select>
  </label>

  <input className="best-match-input" type="text" id="country" placeholder="Country" value={formData.country} onChange={handleChange} />
  <input className="best-match-input" type="text" id="language" placeholder="Primary Language" value={formData.language} onChange={handleChange} />
  <input className="best-match-input" type="text" id="language_2" placeholder="Secondary Language (optional)" value={formData.language_2} onChange={handleChange} />
  <input className="best-match-input" type="text" id="sex" placeholder="Sex (M/F)" maxLength="1" value={formData.sex} onChange={handleChange} />
  <input className="best-match-input" type="number" id="max_rent" placeholder="Max Rent ($300–$10,000)" value={formData.max_rent} onChange={handleChange} />
  <textarea className="best-match-textarea" id="description_tags" placeholder="Description Tags (comma-separated)" value={formData.description_tags} onChange={handleChange} />

  <button className="best-match-button" onClick={handleSubmit}>🔍 Find Matches</button>
</div>


      {error && <p style={{ color: 'red' }}>❌ {error}</p>}

      <h3 style={{ marginTop: '2rem' }}>Top Matches</h3>
      <div className="matches">
        {matches.length === 0 && <p>No matches yet.</p>}
        {matches.map((match, idx) => (
          <ProfileCard
            key={idx}
            name={`${match.first_name} ${match.last_name}`}
            age={match.age}
            location={match.country}
            sex={match.sex}
            description={match.description}
            email={match.email}
            phone={match.phone_number}
            social={match.social_link}
            languages={[match.language, match.language_2].filter(Boolean).join(', ')}
            smoking={!!match.smoking}
            drinking={!!match.drinking_socially}
            subleasing={!!match.subleasing}
          />
        ))}
      </div>
    </div>
  );
}

export default BestMatch;