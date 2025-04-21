import { useState } from 'react';
import './FilterPanel.css';

export default function FilterPanel({ onSubmit, formData, isFiltered, onReset }) {
    const [form, setForm] = useState({
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

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

    const payload = {
        age: parseInt(form.age),
        smoking: parseInt(form.smoking),
        drinking_socially: parseInt(form.drinking_socially),
        subleasing: parseInt(form.subleasing),
        country: form.country.trim(),
        language: form.language.trim(),
        language_2: form.language_2.trim() || null,
        sex: form.sex.trim().toUpperCase(),
        max_rent: parseInt(form.max_rent),
        description_tags: form.description_tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag)
    };

    try {
        const res = await fetch('http://127.0.0.1:5000/matchProfiles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (data.matches) {
            // also send the form data
            onSubmit(data.matches, payload);
        } 
        else {
            // no matches
            onSubmit([], payload); 
        }
    } 
    catch (err) {
        console.error('Match error:', err);
    }
    };

    // read only shown after the user has put in their filters
    if (isFiltered && formData) {
        return (
            <div className="filter-panel-container">
                <div className="filter-panel-wrapper">
                    <h2 className="filter-panel-title">Your Filters</h2>
                        <div className="readonly-summary">
                            <p><strong>Age:</strong> {formData.age}</p>
                            <p><strong>Sex:</strong> {formData.sex}</p>
                            <p><strong>Country:</strong> {formData.country}</p>
                            <p><strong>Languages:</strong> {formData.language}{formData.language_2 ? `, ${formData.language_2}` : ''}</p>
                            <p><strong>Max Rent:</strong> ${formData.max_rent}</p>
                            <p><strong>Smoking:</strong> {formData.smoking === 1 ? 'Yes' : 'No'}</p>
                            <p><strong>Drinking Socially:</strong> {formData.drinking_socially === 1 ? 'Yes' : 'No'}</p>
                            <p><strong>Subleasing:</strong> {formData.subleasing === 1 ? 'Yes' : 'No'}</p>
                            <p><strong>Tags:</strong> {formData.description_tags.join(', ')}</p>
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
        <div className="filter-panel-container">
            <div className="filter-panel-wrapper">
            {/* <h2 className="filter-panel-title">Find Your Match</h2> */}

            <form className="filter-form" onSubmit={handleSubmit}>
                <div className="filter-grid">
                    <div className="filter-section">
                        <h3 className="section-title">Personal Information</h3>
                            <div className="input-grid">
                                <div className="input-wrapper">
                                    <input
                                        id="age"
                                        type="number"
                                        placeholder="Your Age"
                                        value={form.age}
                                        onChange={handleChange}
                                        required
                                        className="filter-input"
                                    />
                                </div>
                                <div className="input-wrapper">
                                    <input
                                        id="sex"
                                        type="text"
                                        placeholder="Sex (M/F)"
                                        value={form.sex}
                                        onChange={handleChange}
                                        maxLength="1"
                                        required
                                        className="filter-input"
                                    />
                                </div>
                                <div className="input-wrapper">
                                    <input
                                        id="country"
                                        type="text"
                                        placeholder="Country"
                                        value={form.country}
                                        onChange={handleChange}
                                        required
                                        className="filter-input"
                                    />
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
                                required
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
                                required
                                className="filter-input"
                            />
                        </div>
                    </div>
                </div>

                <div className="filter-section">
                    <h3 className="section-title">Lifestyle Preferences</h3>
                    <div className="preferences-section">
                        <div className="preference-item">
                            <label className="preference-label">Do you smoke?</label>
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
                            <label className="preference-label">Do you drink socially?</label>
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
                            <label className="preference-label">Open to subleasing?</label>
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

                <div className="filter-section">
                    <h3 className="section-title">About You</h3>
                    <div className="input-wrapper full-width">
                    <textarea
                        id="description_tags"
                        placeholder="Tags (comma-separated)"
                        value={form.description_tags}
                        onChange={handleChange}
                        className="filter-textarea"
                    ></textarea>
                    <p className="helper-text">
                        e.g. tidy, quiet, early-riser, pet-friendly, vegan
                    </p>
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
