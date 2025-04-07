import './ProfileCard.css';

function ProfileCard({
    name, age, location, sex, description, 
    email, social, phone, languages, 
    smoking, drinking, subleasing
})
{
    return (
        <div className = "profile-card">
            <h2>{name} ({sex}, {age})</h2>

            <p><strong>Location:</strong> {location}</p>
            <p><strong>Languages:</strong> {languages}</p>

            <p className = "description"><strong>Description:</strong> {description}</p>
            
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
                
            <div className = "contact-info">
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone}</p>
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