import React, { useState } from 'react';
// i havent used axios much but i read online that its really good at simplifying stuff with the json 
// so im trying it 
import axios from 'axios';
import { countries } from '../components/Dropdown';
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
        max_rent: '',
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
            max_rent: parseInt(formData.max_rent),
            social_link: formData.social_link || null,
            phone_number: formData.phone_number || null,
            description: formData.description || null
        };

        // debug max rent stuff 
        console.log("Submitting profile:");
        console.log("Payload being sent:", formattedData);

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
            name="max_rent" 
            type="number" 
            placeholder="Max Rent" 
            value={formData.max_rent}
            required
            onChange={handleChange}
            className="add-profile-input"
        />

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
                {/* <span className="preference-label">Smoking</span> */}
                <div
                    className={`toggle-bubble ${formData.smoking === 1 ? 'yes-state' : 'no-state'}`}
                    onClick={() =>
                    setFormData((prev) => ({ ...prev, smoking: prev.smoking === 1 ? 0 : 1 }))
                    }
                >
                    Smoking: {formData.smoking === 1 ? 'Yes' : 'No'}
                </div>
            </div>

            <div className="preference-item">
                {/* <span className="preference-label">Drinking Socially</span> */}
                <div
                    className={`toggle-bubble ${formData.drinking_socially === 1 ? 'yes-state' : 'no-state'}`}
                    onClick={() =>
                    setFormData((prev) => ({ ...prev, drinking_socially: prev.drinking_socially === 1 ? 0 : 1 }))
                    }
                >
                    Drinking Socially: {formData.drinking_socially === 1 ? 'Yes' : 'No'}
                </div>
            </div>

            <div className="preference-item">
                {/* <span className="preference-label">Subleasing</span> */}
                <div
                    className={`toggle-bubble ${formData.subleasing === 1 ? 'yes-state' : 'no-state'}`}
                    onClick={() =>
                    setFormData((prev) => ({ ...prev, subleasing: prev.subleasing === 1 ? 0 : 1 }))
                    }
                >
                    Subleasing: {formData.subleasing === 1 ? 'Yes' : 'No'}
                </div>
            </div>
        </div>

        <button type="submit" className="add-profile-button">Add Profile</button>
        </form>

        {message && <p className="add-profile-message">{message}</p>}
    </div>
    );
};

export default AddProfilePage;
