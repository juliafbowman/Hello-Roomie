function ProfileCard({
    name, age, location, sex, description, 
    email, social, phone, languages, 
    smoking, drinking, subleasing
})
{
    return (
        <div style = {styles.card}>
            <h2>{name} ({sex}, {age})</h2>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Languages:</strong> {languages}</p>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Smokes?</strong> {smoking ? "Yes" : "No"}</p>
            <p><strong>Drinks Socially?</strong> {drinking ? "Yes" : "No"}</p>
            <p><strong>Subleasing?</strong> {subleasing ? "Yes" : "No"}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>
            {/* socials wont show if null  */}
            {social ? (
            <p>
                <strong>Social:</strong>{' '}
                <a href={"https://" + social} target="_blank" rel="noreferrer">
                {social}
                </a>
            </p>
            ) : null}
        </div>
    );
}

// might add a separate css for this but not yet
const styles = {
    card: {
      border: '1px solid #ccc',
      padding: '1.5rem',
      borderRadius: '10px',
      marginBottom: '2rem',
      backgroundColor: '#fff',
      color: 'black',
    }
  };

export default ProfileCard; 