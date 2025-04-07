import React, { useState } from 'react';
// i havent used axios much but i read online that its really good at simplifying stuff with the json 
// so im trying it 
import axios from 'axios';

// fixed the errors i was getting - had the wrong url 

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
        setMessage("✅ Profile added!");
      } else {
        setMessage(`⚠️ Error: ${JSON.stringify(response.data)}`);
      }
    } catch (err) {
      setMessage(`❌ Server Error: ${err.message}`);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Roommate Profile</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="first_name" placeholder="First Name" required onChange={handleChange} />
        <input name="last_name" placeholder="Last Name" required onChange={handleChange} />
        <input name="age" type="number" placeholder="Age" required onChange={handleChange} />
        <select name="sex" required onChange={handleChange}>
          <option value="">Select Sex</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
        <input name="country" placeholder="Country" required onChange={handleChange} />
        <input name="language" placeholder="Primary Language" required onChange={handleChange} />
        <input name="language_2" placeholder="Secondary Language (Optional)" onChange={handleChange} />
        <input name="social_link" placeholder="Social Link (Optional)" onChange={handleChange} />
        <input name="phone_number" placeholder="Phone Number (Optional)" onChange={handleChange} />
        <textarea name="description" placeholder="Description (Optional)" onChange={handleChange}></textarea>

        <label>Smoking:
          <select name="smoking" onChange={handleChange}>
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </label>

        <label>Drinking Socially:
          <select name="drinking_socially" onChange={handleChange}>
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </label>

        <label>Subleasing:
          <select name="subleasing" onChange={handleChange}>
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </label>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Profile</button>
      </form>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default AddProfilePage;
