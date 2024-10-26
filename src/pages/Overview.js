
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import './Overview.css';
import UserBarChart from '../components/UserBarChart';
import UserLineGraph from '../components/UserLineGraph';

import ReactPaginate from 'react-paginate';

// Register the necessary chart components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

const Overview = () => {
    const [userCount, setUserCount] = useState(0); // State to store the number of users
    const [loading, setLoading] = useState(true);  // Loading state for data fetch
    const [error, setError] = useState(null);      // Error state

    const navigate = useNavigate();  // Initialize useNavigate for routing

    useEffect(() => {
        // Fetch user data from the API
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return response.json();
            })
            .then(data => {
                // Update the user count
                setUserCount(data.length);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // Function to handle navigation to the Users Search Page
    const goToSearchPage = () => {
        navigate('/search'); // Navigate to the Users Search Page
    };

    // Function to handle navigation to the Create User Page
    const goToCreateUserPage = () => {
        navigate('/users/create'); // Navigate to the Create User Page
    };

    // Function to handle navigation to the Edit User Page
    const goToEditUserPage = () => {
        navigate('/users'); // Navigate to the Edit User Page
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 5; // Set the number of users per page
    const [users, setUsers] = useState([]);

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
        setCurrentPage(event.selected); // Update current page when pagination is clicked
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-heading">Dashboard</h1>
            <div className="tag">
                <p style={{ padding: 7, fontSize: 13, color: 'rgb(135, 134, 134)' }}>Dashboards</p>
            </div>

            {/* Cards Section */}
            <div className="cards-container">
                {/* Primary Card showing the number of users */}
                <div className="card primary-card">
                    <h5>Total Users</h5>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <p>{userCount} Users</p>
                    )}
                </div>

                {/* Second card (Warning Card) with click handler for navigation */}
                <div className="card warning-card" onClick={goToSearchPage}>
                    <h5>Search Users</h5>
                    <p>View Details</p>
                </div>

                {/* Third card (Success Card) with click handler for Create User Page */}
                <div className="card success-card" onClick={goToCreateUserPage}>
                    <h5>Create User</h5>
                    <p>View Details</p>
                </div>

                {/* Fourth card (Danger Card) with click handler for Edit User Page */}
                <div className="card danger-card" onClick={goToEditUserPage}>
                    <h5>Edit User</h5>
                    <p>View Details</p>
                </div>
            </div>
            <br />
            <br />
            {/* Charts Section */}
            <div className="charts-container">
                {/* Area Chart Example */}
                <div className="chart-area">
                    <h5 style={{ color: '#939191' }}>Bar Chart</h5>
                    <div className='chartpadding'>
                        <UserBarChart />
                    </div>
                </div>

                {/* Bar Chart Example */}
                <div className="chart-bar">
                    <h5 style={{ color: '#939191' }}>Linear Graph</h5>
                    <div className='chartpadding'>
                        <UserLineGraph />
                    </div>
                </div>
            </div>
            <div>
                {/* Table to display user information */}
                <p style={{ color: '#656565',paddingTop:20 }}>User Details</p>
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
                {filteredUsers.length > 0 && (
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
                        pageClassName={'pagination-page'}
                        previousClassName={'pagination-previous'}
                        nextClassName={'pagination-next'}
                        disabledClassName={'disabled'}
                    />
                )}
            </div>
        </div>
    );
};

export default Overview;



