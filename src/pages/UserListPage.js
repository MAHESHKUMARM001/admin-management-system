import React, { useState, useEffect } from 'react';
// import UserList from '../components/User/UserList';
// import UserEditForm from '../components/User/UserEditForm';
import './UserList.css';
import UserEditForm from '../components/Users/UserEditForm';
import UserList from '../components/Users/UserList';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        const usersWithStatus = data.map(user => ({
          ...user,
          status: true, // Set the initial status as needed
        }));
        setUsers(usersWithStatus);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    const userToEdit = users.find(user => user.id === id);
    setEditingUser(userToEdit);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    }
  };

  const handleSave = (updatedUser) => {
    setUsers(prevUsers =>
      prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null); // Close the edit form
  };

  const handleCancel = () => {
    setEditingUser(null); // Close the edit form
  };

  return (
    <div className="user-list-container">
      {editingUser ? (
        <>
          <h1>Edit User</h1>
          <UserEditForm user={editingUser} onSave={handleSave} onCancel={handleCancel} />
        </>
      ) : (
        <>

            <h1>User List</h1>
            <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />

        </>
      )}
    </div>
  );
};

export default UserListPage;
