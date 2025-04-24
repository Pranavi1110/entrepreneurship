// client/src/components/EntrepreneurForm.js
import React, { useState } from 'react';
// import axios from 'axios';
import FormInput from './FormInput';
import { GoogleGenerativeAI } from "@google/generative-ai";
import '../styles/App.css';
import * as pdfjsLib from "pdfjs-dist";
import './pdfWorker';
// import { set } from 'mongoose';

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const EntrepreneurForm = () => {
    const [formData, setFormData] = useState({
        candidateName: '',
        enterpriseName: '',
        rollno: '',
        address: '',
        email: '',
        phone: '',
        dinPan: '',
        establishmentPeriod: '',
        websiteUrl: '',
        certificate: null // Holds the uploaded File object
    });
    const [loading, setLoading] = useState(false);
    const [uploadError, setUploadError] = useState(null); // State for upload errors

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            certificate: file
        }));
        setUploadError(null); // Clear any previous upload error
    };

    async function extractTextFromPdf(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const typedarray = new Uint8Array(reader.result);
                    const pdf = await pdfjsLib.getDocument(typedarray).promise;
                    let text = '';
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const content = await page.getTextContent();
                        text += content.items.map(s => s.str).join(' ') + '\n';
                    }
                    resolve(text);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => {
                reject(new Error('FileReader error: Failed to read the PDF file.'));
            };
            reader.readAsArrayBuffer(file);
        });
    }

    async function certify(data) {
        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            if (!data.certificate) {
                throw new Error("No certificate file uploaded.");
            }
            const pdfText = await extractTextFromPdf(data.certificate);
            console.log 
            const prompt = 
            `You are given the text content of a GST registration certificate. Analyze it and verify the following:

        1. Is the name "${data.candidateName}" mentioned as a "Director" or a "Key Managerial Person" within the details of the enterprise "${data.enterpriseName}"?
        2. Does the legal name or trade name on the certificate match "${data.enterpriseName}"?

        If *both conditions are true*, respond with:
        {
            "valid": true
        }

        If *any one of the conditions is false*, respond with:
        {
            "valid": false
        }

        Respond only in raw JSON. Do not include any formatting like triple backticks or markdown.`;


            const result = await model.generateContent([prompt, { text: pdfText }]);
            const text = await result.response.text();
            let jsonStr = text
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();
          
          try {
              return JSON.parse(jsonStr);
          } catch (parseError) {
              console.error("Gemini API Error: Invalid JSON response", parseError);
              console.error("Received text:", text); // helpful for debugging
              throw new Error("Gemini API Error: Invalid response format");
          }
          
        } catch (error) {
            console.error("Certificate Validation Error:", error.message);
            // throw new Error("Certificate validation failed.");
        }
    }
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setUploadError(null);
    
            const validationResult = await certify(formData);
    
            if (validationResult && validationResult.valid === true) {
                console.log("formData before sending:", formData); // Add this line
                const formDataToSend = new FormData();
                for (const key in formData) {
                    formDataToSend.append(key, formData[key]);
                }
                console.log(formDataToSend)
                const response= await fetch('http://localhost:5000/api/entrepreneurs', {
                    method: 'POST',
                    body: formDataToSend // don't set Content-Type!
                  });
                  
                alert('Entrepreneur registered successfully!');
                setFormData(
                    {
                        candidateName: '',
                        enterpriseName: '',
                        rollno: '',
                        address: '',
                        email: '',
                        phone: '',
                        dinPan: '',
                        establishmentPeriod: '',
                        websiteUrl: '',
                        certificate: null   
                    }
                )
            } else {
                alert("Invalid certificate. Please verify and try again.");
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setUploadError(error.message || 'Registration failed. Please try again.');
            alert('Registration failed. Please try again.');
        } finally {
            setLoading(false);
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
                    label="Roll No"
                    name="rollno"
                    value={formData.rollno}
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
                <div className="form-group">
                    <label htmlFor="certificate">Certificate Upload</label>
                    <input
                        type="file"
                        id="certificate"
                        name="certificate"
                        accept=".pdf"
                        onChange={handleFileChange}
                        required
                    />
                    {uploadError && <p className="error-message">{uploadError}</p>}
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Registering..." : "Register Entrepreneur"}
                </button>
            </form>
        </div>
    );
};

export default EntrepreneurForm;