import { useState } from 'react';
import './HeadingSection.css';
import { MapPin, Search, ChevronDown } from 'lucide-react';
import FilterPanel from './FilterPanel';

export default function HeadingSection({ onSearch, isFiltered, submittedFilter, onReset }) {
    const [location, setLocation] = useState('');
    const [accordionOpen, setAccordionOpen] = useState(false);

    const handleSearch = async () => {
        const trimmed = location.trim();
        if (!trimmed) return;
        
        const payload = { country: trimmed };
        try {
            const res = await fetch('http://127.0.0.1:5000/filterProfiles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.matches) {
                onSearch(data.matches, payload);
            } else {
                onSearch([], payload);
            }
        } catch (err) {
            console.error('Location filter error:', err);
        }
    };

    return (
        <div className="heading-section">
            <h1 className="heading-title">Find Your Perfect Roommate</h1>
            <p className="heading-subtitle">
                Connect with compatible roommates based on lifestyle, preferences, and location.
            </p>
            
            <div className="content-container">
                <div className="heading-card">
                    <div className="heading-location-wrapper">
                        <MapPin className="location-icon" size={20} />
                        <input
                            className="heading-location-input"
                            type="text"
                            placeholder="Enter location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                    <button className="heading-search-button" onClick={handleSearch}>
                        <Search className="search-icon" size={18} />
                        <span>Find Roommates</span>
                    </button>
                </div>
                
                {/* Accordion */}
                <div className="accordion-container">
                    <div className="accordion-header" onClick={() => setAccordionOpen(!accordionOpen)}>
                        <h2 className="accordion-title">Advanced Filters</h2>
                        <ChevronDown className={`accordion-icon ${accordionOpen ? 'open' : ''}`} />
                    </div>
                    {accordionOpen && (
                        <div className="accordion-body">
                            <FilterPanel
                                onSubmit={onSearch}
                                formData={submittedFilter}
                                isFiltered={isFiltered}
                                onReset={onReset}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}