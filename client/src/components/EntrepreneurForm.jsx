import React, { useState } from 'react';
import axios from 'axios';
import FormInput from './FormInput';
import '../styles/App.css';

const EntrepreneurForm = () => {
  const [formData, setFormData] = useState({
    rollNo: '',
    candidateName: '',
    academicYear: '',
    enterpriseName: '',
    address: '',
    email: '',
    phone: '',
    dinPan: '',
    establishmentPeriod: '',
    websiteUrl: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    // Validate Roll Number
    if (!formData.rollNo) {
      newErrors.rollNo = 'Roll Number is required';
    }

    // Validate Academic Year (in the format YYYY-YYYY)
    if (!formData.academicYear || !/^\d{4}-\d{4}$/.test(formData.academicYear)) {
      newErrors.academicYear = 'Please enter a valid academic year (e.g., 2020-2024).';
    } else {
      const [startYear, endYear] = formData.academicYear.split('-');
      if (parseInt(startYear) >= parseInt(endYear)) {
        newErrors.academicYear = 'Start year must be earlier than end year.';
      }
    }

    // Validate Website URL
    if (formData.websiteUrl && !/^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/.*)?$/.test(formData.websiteUrl)) {
      newErrors.websiteUrl = 'Enter a valid URL!';
    }

    // Validate Email
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email!';
    }

    // Validate Phone Number
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/api/entrepreneurs', formData);
        alert('Entrepreneur registered successfully!');
        setFormData({
          rollNo: '',
          candidateName: '',
          academicYear: '',
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
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2 className="form-title">Entrepreneur Registration</h2>
        
        <div className="form-group">
          <FormInput
            label="Roll Number"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            required
          />
          {errors.rollNo && <p className="error">{errors.rollNo}</p>}
        </div>

        <div className="form-group">
          <FormInput
            label="Candidate Name"
            name="candidateName"
            value={formData.candidateName}
            onChange={handleChange}
            required
          />
          {errors.candidateName && <p className="error">{errors.candidateName}</p>}
        </div>

        <div className="form-group">
          <FormInput
            label="Academic Year"
            name="academicYear"
            value={formData.academicYear}
            onChange={handleChange}
            required
          />
          {errors.academicYear && <p className="error">{errors.academicYear}</p>}
        </div>

        <div className="form-group">
          <FormInput
            label="Enterprise Name"
            name="enterpriseName"
            value={formData.enterpriseName}
            onChange={handleChange}
            required
          />
          {errors.enterpriseName && <p className="error">{errors.enterpriseName}</p>}
        </div>

        <div className="form-group">
          <FormInput
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>

        <div className="form-group">
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <FormInput
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div className="form-group">
          <FormInput
            label="DIN/PAN"
            name="dinPan"
            value={formData.dinPan}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <FormInput
            label="Establishment Period"
            name="establishmentPeriod"
            value={formData.establishmentPeriod}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <FormInput
            label="Website URL"
            type="url"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
          />
          {errors.websiteUrl && <p className="error">{errors.websiteUrl}</p>}
        </div>

        <button type="submit" className="submit-btn">
          Register Entrepreneur
        </button>
      </form>
    </div>
  );
};

export default EntrepreneurForm;
