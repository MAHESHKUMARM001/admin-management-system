// src/UserManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        // Fetch users from API
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simulate adding a new user
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
            setUsers([...users, response.data]); // Add new user to the list
            setNewUser({ name: '', email: '', phone: '' }); // Reset form
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div>
            <h1>User Management</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={newUser.phone}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add User</button>
            </form>

            <h2>User Details</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <strong>{user.name}</strong> - {user.email} - {user.phone}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
