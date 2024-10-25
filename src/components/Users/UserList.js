// src/components/Users/UserList.js
// import React from 'react';
// // import './UserList.css';

// const UserList = ({ users, onEdit, onDelete }) => {
//   return (
//     <table className="user-list-table">
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Name</th>
//           <th>Email</th>
//           <th>Phone</th>
//           {/* <th>Status</th> */}
//           <th>Website</th>
//           <th>Actions</th>
//           <th>Company</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map(user => (
//           <tr key={user.id}>
//             <td>{user.id}</td>
//             <td>{user.name}</td>
//             <td>{user.email}</td>
//             <td>{user.phone}</td>
//             {/* <td>{user.status ? 'Active' : 'Inactive'}</td> */}
//             <td>{user.website}</td>
//             <td>{user.company.name}</td>
//             <td className="user-list-actions">
//               <button onClick={() => onEdit(user.id)} style={{backgroundColor:'blue'}}>Edit</button>
//               <button className="delete-btn" onClick={() => onDelete(user.id)}>Delete</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default UserList;

import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './UserListNew.css';

const UserList = ({ users, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 7; // Set the number of users per page

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the current users to display on the current page
  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page change
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name, email, phone, website, or company"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
      />

      <table className="user-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>{user.company.name}</td>
              <td className="user-list-actions">
                <button onClick={() => onEdit(user.id)} style={{backgroundColor:'blue'}}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
      />
    </div>
  );
};

export default UserList;

