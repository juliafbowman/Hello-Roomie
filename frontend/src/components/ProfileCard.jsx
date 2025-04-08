import './ProfileCard.css';

/* this will assign a random image (tied to name/email) for each post - like our reddit idea */ 
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
  
// the info that will fill each profile card 
function ProfileCard({
    name, age, location, sex, description, 
    email, social, phone, languages, 
    smoking, drinking, subleasing
})
{
    // the image will be based on email or name 
    const imageSrc = getStableRandomImage(email || name); 
    return (
        <div className = "profile-card">
            {/* profile photo at the top */}
            <div className="profile-header">
                <div className="profile-img-wrapper">
                    <img src={imageSrc} alt="Profile" className="profile-img" />
                </div>
            <div className="header-text">
                <h2>{name}</h2>
                <p className="age-sex">({sex}, {age})</p>
            </div>
        </div> {/* end of profile header */}

        <p><strong>Location:</strong> {location}</p>
        <p><strong>Languages:</strong> {languages}</p>

        {/* just display description if there is one */}
        {description && (
            <>
            <p className="section-title">About</p>
            <p className="description">{description}</p>
            </>
        )}
      
        <p className = "section-title">Preferences</p>
        <div className = "preferences-section">
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
        </div> {/* preferences section end */}
        
        <p className = "section-title">Contact</p>
            <div className = "contact-info">
                <p><strong>Email:</strong> {email}</p>
                {/* phone wont display if they dont put one in */}
                {phone && <p><strong>Phone:</strong> {phone}</p>}

                {/* socials wont show if null */}
                {social ? (
                    <p>
                        <strong>Social:</strong>{' '}
                        <a href={"https://" + social} target="_blank" rel="noreferrer">
                            {social}
                        </a>
                    </p>
                ) : null}
            </div>
        </div>
    );
}

export default ProfileCard; 