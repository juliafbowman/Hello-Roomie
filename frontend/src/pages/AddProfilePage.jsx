import React, { useState } from 'react';
// i havent used axios much but i read online that its really good at simplifying stuff with the json 
// so im trying it 
import axios from 'axios';
import './AddProfilePage.css';

const AddProfilePage = () => {
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
            
            if (response.data["200"]) {
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

        <input name="first_name" placeholder="First Name" required onChange={handleChange} className="add-profile-input" />
        <input name="last_name" placeholder="Last Name" required onChange={handleChange} className="add-profile-input" />
        <input name="age" type="number" placeholder="Age" required onChange={handleChange} className="add-profile-input" />

        <select name="sex" required onChange={handleChange} className="add-profile-select">
            <option value="">Select Sex</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
        </select>

        <input name="email" type="email" placeholder="Email" required onChange={handleChange} className="add-profile-input" />
        <input name="country" placeholder="Country" required onChange={handleChange} className="add-profile-input" />
        <input name="language" placeholder="Primary Language" required onChange={handleChange} className="add-profile-input" />
        <input name="language_2" placeholder="Secondary Language (Optional)" onChange={handleChange} className="add-profile-input" />
        <input name="social_link" placeholder="Social Link (Optional)" onChange={handleChange} className="add-profile-input" />
        <input name="phone_number" placeholder="Phone Number (Optional)" onChange={handleChange} className="add-profile-input" />

        <textarea name="description" placeholder="Description (Optional)" onChange={handleChange} className="add-profile-textarea" />

        <label>
            Smoking:
            <select name="smoking" onChange={handleChange} className="add-profile-select">
            <option value={0}>No</option>
            <option value={1}>Yes</option>
            </select>
        </label>

        <label>
            Drinking Socially:
            <select name="drinking_socially" onChange={handleChange} className="add-profile-select">
            <option value={0}>No</option>
            <option value={1}>Yes</option>
            </select>
        </label>

        <label>
            Subleasing:
            <select name="subleasing" onChange={handleChange} className="add-profile-select">
            <option value={0}>No</option>
            <option value={1}>Yes</option>
            </select>
        </label>

        <button type="submit" className="add-profile-button">Add Profile</button>
        </form>

        {message && <p className="add-profile-message">{message}</p>}
    </div>
    );
};

export default AddProfilePage;
