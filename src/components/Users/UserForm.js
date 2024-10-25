import React, { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser } from '../../utils/jsonUtils';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = ({ isEditMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    status: true
  });

  useEffect(() => {
    if (isEditMode) {
      const user = getUsers().find(user => user.id === parseInt(id));
      if (user) {
        setFormData(user);
      }
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      updateUser(formData);
    } else {
      addUser({ ...formData, id: getUsers().length + 1 });
    }
    navigate('/users');
  };

  return (
    <div>
      <h1>{isEditMode ? 'Edit User' : 'Create User'}</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </select>

        <button type="submit">{isEditMode ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default UserForm;
