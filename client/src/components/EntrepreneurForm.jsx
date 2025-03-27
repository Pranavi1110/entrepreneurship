// client/src/components/EntrepreneurForm.js
import React, { useState } from 'react';
import axios from 'axios';
import FormInput from './FormInput';
import '../styles/App.css';

const EntrepreneurForm = () => {
  const [formData, setFormData] = useState({
    candidateName: '',
    enterpriseName: '',
    address: '',
    email: '',
    phone: '',
    dinPan: '',
    establishmentPeriod: '',
    websiteUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/entrepreneurs', 
        formData
      );
      alert('Entrepreneur registered successfully!');
      // Reset form after successful submission
      setFormData({
        candidateName: '',
        enterpriseName: '',
        address: '',
        email: '',
        phone: '',
        dinPan: '',
        establishmentPeriod: '',
        websiteUrl: '',
      });
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2 className="form-title">Entrepreneur Registration</h2>
        <FormInput
          label="Candidate Name"
          name="candidateName"
          value={formData.candidateName}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Enterprise Name"
          name="enterpriseName"
          value={formData.enterpriseName}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          
        />
        <FormInput
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <FormInput
          label="DIN/PAN"
          name="dinPan"
          value={formData.dinPan}
          onChange={handleChange}
        />
        <FormInput
          label="Establishment Period"
          name="establishmentPeriod"
          value={formData.establishmentPeriod}
          onChange={handleChange}
        />
        <FormInput
          label="Website URL"
          type="url"
          name="websiteUrl"
          value={formData.websiteUrl}
          onChange={handleChange}
        />
        <button type="submit" className="submit-btn">
          Register Entrepreneur
        </button>
      </form>
    </div>
  );
};

export default EntrepreneurForm;