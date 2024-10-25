import React, { useState, useEffect } from 'react';
import './UserEditForm.css'; // Add styles for the edit form

const UserEditForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    website: user.website,
    company: user.company,
    status: user.status ? 'active' : 'inactive', // Set initial status as 'active' or 'inactive'
  });

  useEffect(() => {
    setFormData(user); // Set initial form data from the user prop
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      status: formData.status === 'active', // Convert status back to boolean for saving
    }); // Call the save function passed from parent
  };

  return (
    <div className="user-edit-container">
      <form className="user-edit-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Website:</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={formData.company.name}
              onChange={(e) => setFormData({ ...formData, company: { ...formData.company, name: e.target.value } })}
              required
            />
          </div>
        </div>
        {/* <div className="form-group">
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div> */}
        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UserEditForm;
