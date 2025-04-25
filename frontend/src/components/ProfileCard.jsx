import './ProfileCard.css';

/* Random animal images */
const profileImages = [
    '/images/bear.jpg',
    '/images/bunny.jpg',
    '/images/dog.jpg',
    '/images/fox.jpg',
    '/images/goat.jpg',
    '/images/monkey.jpg',
    '/images/mouse.jpg',
    '/images/pig.jpg',
    '/images/sheep.jpg'
];

const getStableRandomImage = (key) => {
    const sum = key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = sum % profileImages.length;
    return profileImages[index];
};

function ProfileCard({
    name, age, location, sex, description,
    email, social, phone, languages,
    smoking, drinking, subleasing,
    max_rent,
    preview = false
}) {
    const imageSrc = getStableRandomImage(email || name);

    // debug 
    console.log("ProfileCard received max_rent:", max_rent);

    return (
        <div className={`profile-card ${preview ? 'preview-card' : ''}`}>
            {/* previews */}
            <div className="profile-header">
                <div className="profile-img-wrapper">
                    <img src={imageSrc} alt="Profile" className="profile-img" />
                </div>
                <div className="header-text">
                    <h2>{name}</h2>
                    <p className="age-sex">({sex}, {age})</p>
                </div>
            </div>

            <p><strong>Location:</strong> {location}</p>
            <p><strong>Languages:</strong> {languages.split(',')[0]}</p>
            {max_rent !== undefined && (
                <p><strong>Max Rent:</strong> ${max_rent.toLocaleString()}</p>
            )}

            {/* add description to the previews */}
            {description && (
            <>
                <p className="section-title">About</p>
                <p className="description">
                {preview ? description.split('. ')[0] + '.' : description}
                </p>
            </>
            )}

            {!preview && (
                <>
                    <p className="section-title">Preferences</p>
                    <div className="preferences-section">
                        <div className="preference-item">
                            <div className={smoking ? "preference-toggle preference-toggle-yes" : "preference-toggle preference-toggle-no"}>
                                {smoking ? "Smokes" : "Doesn't Smoke"}
                            </div>
                        </div>

                        <div className="preference-item">
                            <div className={drinking ? "preference-toggle preference-toggle-yes" : "preference-toggle preference-toggle-no"}>
                                {drinking ? "Drinks" : "Doesn't Drink"}
                            </div>
                        </div>

                        <div className="preference-item">
                            <div className={subleasing ? "preference-toggle preference-toggle-yes" : "preference-toggle preference-toggle-no"}>
                                {subleasing ? "Subleases" : "Doesn't Sublease"}
                            </div>
                        </div>
                    </div>

                    <p className="section-title">Contact</p>
                    <div className="contact-info">
                        <p><strong>Email:</strong> {email}</p>
                        {phone && <p><strong>Phone:</strong> {phone}</p>}
                        {social && (
                            <p>
                                <strong>Social:</strong>{' '}
                                <a href={"https://" + social} target="_blank" rel="noreferrer">
                                    {social}
                                </a>
                            </p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default ProfileCard;
