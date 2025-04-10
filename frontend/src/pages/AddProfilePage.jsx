import React, { useState } from 'react';
// i havent used axios much but i read online that its really good at simplifying stuff with the json 
// so im trying it 
import axios from 'axios';
import './AddProfilePage.css';

const AddProfilePage = () => {
    // formData stores all input variables for profile form
    // using react useState hook 
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        age: '',
        smoking: 0,
        drinking_socially: 0,
        subleasing: 0,
        country: '',
        language: '',
        language_2: '',
        sex: '',
        email: '',
        social_link: '',
        phone_number: '',
        description: ''
    });

    const [message, setMessage] = useState('');

    // update only the variable handleChanged, leaving all others 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedData = {
            ...formData,
            age: parseInt(formData.age),
            smoking: parseInt(formData.smoking),
            drinking_socially: parseInt(formData.drinking_socially),
            subleasing: parseInt(formData.subleasing),
            language_2: formData.language_2 || null,
            social_link: formData.social_link || null,
            phone_number: formData.phone_number || null,
            description: formData.description || null
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/insertProfile', formattedData);
            console.log(response.data)
            if (response.status === 200) {
                setMessage("٩(＾◡＾)۶ Profile Added!");
            } 
            else {
                setMessage(`┐(´～｀)┌ Error: ${JSON.stringify(response.data)}`);
            }
        } 
        catch (err) {
            setMessage(`❌ Server Error: ${err.message}`);
        }
    };

    // for the dropdown selection
    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", 
        "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", 
        "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", 
        "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", 
        "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", 
        "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", 
        "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", 
        "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", 
        "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", 
        "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", 
        "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", 
        "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", 
        "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", 
        "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", 
        "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", 
        "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", 
        "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", 
        "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", 
        "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", 
        "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", 
        "Zambia", "Zimbabwe"
    ];

    return (
    <div className="add-profile-container">
        <h1 className="add-profile-title">Add New Roommate Profile</h1>
        <form onSubmit={handleSubmit} className="add-profile-form">

        <input 
            name="first_name" 
            placeholder="First Name"
            value={formData.first_name} 
            required 
            onChange={handleChange} 
            className="add-profile-input" 
        />
        
        <input 
            name="last_name" 
            placeholder="Last Name" 
            value={formData.last_name}
            required 
            onChange={handleChange} 
            className="add-profile-input" 
        />

        <input 
            name="age" 
            type="number" 
            placeholder="Age" 
            value={formData.age}
            required 
            onChange={handleChange} 
            className="add-profile-input" 
        />

        <select 
            name="sex" 
            value={formData.sex}
            required
            onChange={handleChange} 
            className="add-profile-select"
        >
            <option value="">Select Sex</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
        </select>

        <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            value={formData.email}
            required 
            onChange={handleChange}
            className="add-profile-input" 
        />

        <select 
            name="country" 
            value={formData.country}
            required 
            onChange={handleChange} 
            className="add-profile-select country-select"
        >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
                <option key={index} value={country}>
                    {country}
                </option>
            ))}
        </select>

        <input 
            name="language" 
            placeholder="Primary Language" 
            value={formData.language}
            required
            onChange={handleChange} 
            className="add-profile-input" 
        />

        <input 
            name="language_2" 
            placeholder="Secondary Language (Optional)" 
            value={formData.language_2}
            onChange={handleChange} 
            className="add-profile-input" 
        />

        <input 
            name="social_link" 
            placeholder="Social Link (Optional)" 
            value={formData.social_link}
            onChange={handleChange} 
            className="add-profile-input" 
        />

        <input 
            name="phone_number" 
            placeholder="Phone Number (Optional)" 
            value={formData.phone_number}
            onChange={handleChange} 
            className="add-profile-input" 
        />

        <textarea 
            name="description" 
            placeholder="Description (Optional)" 
            value={formData.description}
            onChange={handleChange} 
            className="add-profile-textarea" 
        />

        <div className="preferences-section">
            <div className="preference-item">
                <span className="preference-label">Smoking</span>
                <select 
                    name="smoking" 
                    value={formData.smoking}
                    onChange={handleChange} 
                    className="add-profile-select"
                >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                </select>
            </div>

            <div className="preference-item">
                <span className="preference-label">Drinking Socially</span>
                <select 
                    name="drinking_socially" 
                    value={formData.drinking_socially}
                    onChange={handleChange} 
                    className="add-profile-select"
                >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                </select>
            </div>

            <div className="preference-item">
                <span className="preference-label">Subleasing</span>
                <select 
                    name="subleasing" 
                    value={formData.subleasing}
                    onChange={handleChange} 
                    className="add-profile-select"
                >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                </select>
            </div>
        </div>

        <button type="submit" className="add-profile-button">Add Profile</button>
        </form>

        {message && <p className="add-profile-message">{message}</p>}
    </div>
    );
};

export default AddProfilePage;
