import { useState } from 'react';
import './FilterPanel.css';
import { countries } from './Dropdown.js'

export default function FilterPanel({ onSubmit, formData, isFiltered, onReset }) {
    const [form, setForm] = useState({
        age_min: '25',
        age_max: '35', 
        smoking: '0',
        drinking_socially: '0',
        subleasing: '0',
        country: '',
        language: '',
        language_2: '',
        sex: '',
        max_rent: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const payload = {};
    
        if (form.age_min) payload.age = [[">=", parseInt(form.age_min)]];
        if (form.age_max) {
            if (!payload.age) payload.age = [];
            payload.age.push(["<=", parseInt(form.age_max)]);
        }
    
        if (form.smoking !== '') payload.smoking = parseInt(form.smoking);
        if (form.drinking_socially !== '') payload.drinking_socially = parseInt(form.drinking_socially);
        if (form.subleasing !== '') payload.subleasing = parseInt(form.subleasing);
    
        if (form.country.trim()) payload.country = form.country.trim();
        if (form.language.trim()) payload.language = form.language.trim();
        if (form.language_2.trim()) payload.language_2 = form.language_2.trim();
        if (form.sex.trim()) payload.sex = form.sex.trim().toUpperCase();
        if (form.max_rent) payload.max_rent = parseInt(form.max_rent);
    
        try {
            const res = await fetch('http://127.0.0.1:5000/filterProfile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
    
            const data = await res.json();
            if (data.matches) {
                onSubmit(data.matches, payload);
            } else {
                onSubmit([], payload); 
            }
        } catch (err) {
            console.error('Match error:', err);
        }
    };    

    // read only shown after the user has put in their filters
    if (isFiltered && formData) {
        return (
            <div className="filter-panel-fixed-width">
                <div className="filter-panel-wrapper">
                    <h2 className="filter-panel-title">Your Filters</h2>
                    <div className="readonly-summary">
                        <p><strong>Age:</strong> {formData.age?.map(([op, val]) => `${op} ${val}`).join(', ')}</p>
                        <p><strong>Sex:</strong> {formData.sex}</p>
                        <p><strong>Country:</strong> {formData.country}</p>
                        <p><strong>Languages:</strong> {formData.language}{formData.language_2 ? `, ${formData.language_2}` : ''}</p>
                        <p><strong>Max Rent:</strong> ${formData.max_rent}</p>
                        <p><strong>Smoking:</strong> {formData.smoking === 1 ? 'Yes' : 'No'}</p>
                        <p><strong>Drinking Socially:</strong> {formData.drinking_socially === 1 ? 'Yes' : 'No'}</p>
                        <p><strong>Subleasing:</strong> {formData.subleasing === 1 ? 'Yes' : 'No'}</p>
                    </div>
                    <button onClick={onReset} className="reset-button">
                        Reset Filters
                    </button>
                </div>
            </div>
        );
    }
    

    // show the one you can input into if not filtered already 
    return (
        <div className="filter-panel-fixed-width">
        <div className="filter-panel-wrapper">
            {/* <h2 className="filter-panel-title">Find Your Match</h2> */}

            <form className="filter-form" onSubmit={handleSubmit}>
                <div className="filter-grid">
                    <div className="filter-section">
                        <h3 className="section-title">General</h3>
                            <div className="input-grid">
                            <div className="input-wrapper full-width">
                                {/* for the slider */}
                                <label className="preference-label">Preferred Age Range: {form.age_min} to {form.age_max}</label>
                                <div className="dual-slider-track">
                                    <input
                                    type="range"
                                    min="18"
                                    max="100"
                                    step="1"
                                    value={form.age_min}
                                    onChange={(e) => {
                                        const newMin = Math.min(Number(e.target.value), form.age_max - 1);
                                        setForm(prev => ({
                                          ...prev,
                                          age_min: newMin
                                        }));
                                      }}
                                    className="range-thumb"
                                    />
                                    <input
                                    type="range"
                                    min="18"
                                    max="100"
                                    step="1"
                                    value={form.age_max}
                                    onChange={(e) => {
                                        const minVal = Number(form.age_min);
                                        const rawVal = Number(e.target.value);
                                        const newMax = Math.max(rawVal, minVal + 1);
                                        setForm(prev => ({
                                          ...prev,
                                          age_max: newMax
                                        }));
                                      }}
                                    className="range-thumb"
                                    />
                                </div>
                                </div>

                                <div className="input-wrapper">
                                    <label className="preference-label">Gender</label>
                                    <div className="sex-button-group">
                                        {["M", "F", "O"].map((value) => (
                                        <button
                                            key={value}
                                            type="button"
                                            className={`sex-button ${form.sex === value ? "active" : ""}`}
                                            onClick={() => setForm((prev) => ({ ...prev, sex: value }))}
                                        >
                                            {value === "M" ? "Male" : value === "F" ? "Female" : "Other"}
                                        </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="input-wrapper">
                                <label className="preference-label">Country</label>
                                    <select
                                    id="country"
                                    value={form.country}
                                    onChange={handleChange}
                                    className="preference-select"
                                    >
                                    <option value="">Select a country</option>
                                    {countries.map((country) => (
                                        <option key={country} value={country}>
                                        {country}
                                        </option>
                                    ))}
                                    </select>

                                </div>
                            </div>
                    </div>

                <div className="filter-section">
                    <h3 className="section-title">Languages</h3>
                    <div className="input-grid">
                        <div className="input-wrapper">
                            <input
                                id="language"
                                type="text"
                                placeholder="Primary Language"
                                value={form.language}
                                onChange={handleChange}
                                className="filter-input"
                            />
                        </div>
                        <div className="input-wrapper">
                            <input
                                id="language_2"
                                type="text"
                                placeholder="Secondary Language (optional)"
                                value={form.language_2}
                                onChange={handleChange}
                                className="filter-input"
                            />
                        </div>
                        <div className="input-wrapper">
                            <input
                                id="max_rent"
                                type="number"
                                placeholder="Max Rent (300–10000)"
                                value={form.max_rent}
                                onChange={handleChange}
                                min="300"
                                max="10000"
                                className="filter-input"
                            />
                        </div>
                    </div>
                </div>

                <div className="filter-section">
                    <h3 className="section-title">Lifestyle Preferences</h3>
                    <div className="preferences-section">
                        <div className="preference-item">
                            <label className="preference-label">Smoking</label>
                            <select
                                id="smoking"
                                value={form.smoking}
                                onChange={handleChange}
                                className="preference-select"
                                >
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                        </div>
                        <div className="preference-item">
                            <label className="preference-label">Social Drinking</label>
                            <select
                                id="drinking_socially"
                                value={form.drinking_socially}
                                onChange={handleChange}
                                className="preference-select"
                                >
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                        </div>
                        <div className="preference-item">
                            <label className="preference-label">Subleasing</label>
                            <select
                                id="subleasing"
                                value={form.subleasing}
                                onChange={handleChange}
                                className="preference-select"
                                >
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button type="submit" className="filter-submit-button">
                    <span className="search-icon">🔍</span>
                    <span>Find Matches</span>
                </button>

                </div>
            </form>
            </div>
        </div>
        );
    }
