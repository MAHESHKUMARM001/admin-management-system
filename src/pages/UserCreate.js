// src/components/Users/UserCreate.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Update import to useNavigate
import './UserCreate.css'; // Link to the CSS file

const UserCreate = ({ onAddUser }) => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [suite, setSuite] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyCatchPhrase, setCompanyCatchPhrase] = useState('');
    const [status, setStatus] = useState('active');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation logic
        if (!name || !username || !email || !phone || !street || !city || !zipcode || !companyName) {
            setError('All fields are required.');
            return;
        }

        const newUser = {
            id: Date.now(), // Generate a unique ID (for demo purposes)
            name,
            username,
            email,
            phone,
            address: {
                street,
                suite,
                city,
                zipcode,
            },
            company: {
                name: companyName,
                catchPhrase: companyCatchPhrase,
            },
            status,
        };
        setName('');
        setUsername('');
        setEmail('');
        setPhone('');
        setStreet('');
        setSuite('');
        setCity('');
        setZipcode('');
        setCompanyName('');
        setCompanyCatchPhrase('');
        setStatus('active');
        setError('');
    };

    return (
        <div className="user-create-container">
            <h1>Create User</h1>
            {error && <div className="error-message">{error}</div>}
            <form className="user-create-form" onSubmit={handleSubmit}>
                {/* Form fields */}
                <div className="form-row">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Street</label>
                        <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Suite</label>
                        <input type="text" value={suite} onChange={(e) => setSuite(e.target.value)} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Zipcode</label>
                        <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Company Name</label>
                        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Company Catch Phrase</label>
                        <input type="text" value={companyCatchPhrase} onChange={(e) => setCompanyCatchPhrase(e.target.value)} />
                    </div>
                    {/* <div className="form-group">
                        <label>Status</label><br/>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div> */}
                </div>
                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default UserCreate;
