import { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import FilterPanel from '../components/FilterPanel';
import './Home.css';

function Home() {
    const [profiles, setProfiles] = useState([]);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [submittedFilter, setSubmittedFilter] = useState(null); // stores form data
    const [accordionOpen, setAccordionOpen] = useState(false);

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
        // close accordion when reset
        setAccordionOpen(false);
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
    <div className={`home-layout ${isFiltered ? 'filtered-mode' : 'browse-mode'}`}>
        {isFiltered ? (
        <>
            <div className="filter-column">
                <FilterPanel
                    onSubmit={handleFilter}
                    formData={submittedFilter}
                    isFiltered={true}
                    onReset={handleReset}
                />
            </div>
            <div className="profile-column">

                {filteredProfiles.length === 0 ? (
                    <p>No matches found.</p>
                ) : (
                    <>
                    <h2 className="match-heading">Best Matches for You</h2>
                    {filteredProfiles.map((p, index) => (
                        <ProfileCard key={index} {...formatProfileProps(p)} />
                    ))}
                    </>
                )}

            </div>
        </>
        ) : (
        <>
            <div className="accordion-container">
            <div
                className="accordion-header"
                onClick={() => setAccordionOpen(!accordionOpen)}
            >
                <h2 className="accordion-title">Find A Roomie</h2>
                <span className={`accordion-icon ${accordionOpen ? 'open' : ''}`}>▾</span>
            </div>
            {accordionOpen && (
                <div className="accordion-body">
                <FilterPanel onSubmit={handleFilter} isFiltered={false} />
                </div>
            )}
            </div>
            <h2 className="meet-users">Meet Our Newest Users</h2>
            <div className="profile-column">
                <div className="profile-grid">
            {filteredProfiles.map((p, index) => (
                <ProfileCard key={index} {...formatProfileProps(p)} />
            ))}
            </div>
            </div>
        </>
        )}
    </div>
    );
}

export default Home;
