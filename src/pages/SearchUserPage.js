import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import './SearchUserPage.css'; // Optional: Create a CSS file for styling

const SearchUserPage = () => {
    const [users, setUsers] = useState([]); // State to store all users
    const [searchTerm, setSearchTerm] = useState(''); // State to store the search input
    const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
    const [currentPage, setCurrentPage] = useState(0); // State for the current page
    const usersPerPage = 10; // Users per page

    useEffect(() => {
        // Fetch users data (replace with your actual API endpoint)
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setFilteredUsers(data); // Set initial users as filtered users
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    // Handle search input change
    const handleSearchChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        // Filter users based on search term (name or email)
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)
        );
        setFilteredUsers(filtered);
        setCurrentPage(0); // Reset to first page on search
    };

    // Calculate current users to display
    const indexOfLastUser = (currentPage + 1) * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Handle page change
    const handlePageChange = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
    };

    return (
        <div className="search-page-container">
            <h1>Search Users</h1>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />

            {/* Table to display user information */}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Website</th>
                        <th>Company</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.length > 0 ? (
                        currentUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.website}</td>
                                <td>{user.company.name}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls using react-paginate */}
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName={'pagination-page'}
                previousClassName={'pagination-previous'}
                nextClassName={'pagination-next'}
                disabledClassName={'disabled'}
            />
        </div>
    );
};

export default SearchUserPage;
