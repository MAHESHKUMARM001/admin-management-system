import React from 'react';
import UserForm from '../components/Users/UserForm';
// import './UserEdit.css';
//import UserForm from '../components/User/UserForm';

const UserEdit = () => {
  return (
    <div>
      <UserForm isEditMode={true} />
    </div>
  );
};

export default UserEdit;
