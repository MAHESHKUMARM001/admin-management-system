import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = ({ user, onDelete }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.status ? 'Active' : 'Inactive'}</td>
      <td>
        <Link to={`/users/edit/${user.id}`}>Edit</Link>
        <button onClick={() => onDelete(user.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default UserItem;
