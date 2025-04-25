import { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { countries } from '../components/Dropdown';
import './AddProfilePage.css';

function BestMatch() {
  const [formData, setFormData] = useState({
    age: '',
    smoking: 0,
    drinking_socially: 0,
    subleasing: 0,
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
        smoking: formData.smoking,
        drinking_socially: formData.drinking_socially,
        subleasing: formData.subleasing,
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
    <div className="add-profile-container">
      <h2 className="add-profile-title">Find Your Ideal Roommate</h2>

      <div className="add-profile-form">
        <input
          className="add-profile-input"
          type="number"
          id="age"
          placeholder="Your Age"
          value={formData.age}
          onChange={handleChange}
        />

        <select
          id="country"
          value={formData.country}
          onChange={handleChange}
          className="add-profile-select"
        >
          <option value="">Select Country</option>
          {countries.map((country, idx) => (
            <option key={idx} value={country}>{country}</option>
          ))}
        </select>

        <input
          className="add-profile-input"
          type="text"
          id="language"
          placeholder="Primary Language"
          value={formData.language}
          onChange={handleChange}
        />

        <input
          className="add-profile-input"
          type="text"
          id="language_2"
          placeholder="Secondary Language (optional)"
          value={formData.language_2}
          onChange={handleChange}
        />

        {/* Sex Toggle Buttons */}
    <div className="preferences-section">
    <div className="preference-item">
        <div
        className={`toggle-bubble gender-toggle ${formData.sex === "M" ? "male-state" : ""}`}
        onClick={() => setFormData((prev) => ({ ...prev, sex: "M" }))}
        >
        Male
        </div>
    </div>

    <div className="preference-item">
        <div
        className={`toggle-bubble gender-toggle ${formData.sex === "F" ? "female-state" : ""}`}
        onClick={() => setFormData((prev) => ({ ...prev, sex: "F" }))}
        >
        Female
        </div>
    </div>

    <div className="preference-item">
        <div
        className={`toggle-bubble gender-toggle ${formData.sex === "O" ? "other-state" : ""}`}
        onClick={() => setFormData((prev) => ({ ...prev, sex: "O" }))}
        >
        Other
        </div>
    </div>
    </div>

        <input
          className="add-profile-input"
          type="number"
          id="max_rent"
          placeholder="Max Rent ($300–$10,000)"
          value={formData.max_rent}
          onChange={handleChange}
        />

        {/* Lifestyle Preferences */}
        <div className="preferences-section">
          <div className="preference-item">
            <div
              className={`toggle-bubble ${formData.smoking === 1 ? 'yes-state' : 'no-state'}`}
              onClick={() =>
                setFormData(prev => ({ ...prev, smoking: prev.smoking === 1 ? 0 : 1 }))
              }
            >
              Smoking: {formData.smoking === 1 ? 'Yes' : 'No'}
            </div>
          </div>

          <div className="preference-item">
            <div
              className={`toggle-bubble ${formData.drinking_socially === 1 ? 'yes-state' : 'no-state'}`}
              onClick={() =>
                setFormData(prev => ({ ...prev, drinking_socially: prev.drinking_socially === 1 ? 0 : 1 }))
              }
            >
              Drinking: {formData.drinking_socially === 1 ? 'Yes' : 'No'}
            </div>
          </div>

          <div className="preference-item">
            <div
              className={`toggle-bubble ${formData.subleasing === 1 ? 'yes-state' : 'no-state'}`}
              onClick={() =>
                setFormData(prev => ({ ...prev, subleasing: prev.subleasing === 1 ? 0 : 1 }))
              }
            >
              Subleasing: {formData.subleasing === 1 ? 'Yes' : 'No'}
            </div>
          </div>
        </div>

        <textarea
          className="add-profile-textarea"
          id="description_tags"
          placeholder="Description Tags (comma-separated)"
          value={formData.description_tags}
          onChange={handleChange}
        />

        <button className="add-profile-button" onClick={handleSubmit}>
          🔍 Find Matches
        </button>
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
