import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserListPage from './pages/UserListPage';
import UserCreate from './pages/UserCreate';
import UserEdit from './pages/UserEdit';
import './App.css';
import Overview from './pages/Overview.js';
import SearchUserPage from './pages/SearchUserPage.js';
// import UserListPage from './pages/UserListPage';
// import UserCreate from './pages/UserCreate';
// import UserEdit from './pages/UserEdit';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/users/create" element={<UserCreate />} />
        <Route path="/search" element={<SearchUserPage />} />

         {/* <Route path="/users/edit/:id" element={<UserEdit />} /> */}
      </Routes>
    </Router>
  );
}

export default App;



// // src/App.js
// import React from 'react';
// import UserManagement from './UserManagement';


// function App() {
//     return (
//         <div className="App">
//             <UserManagement />
//         </div>
//     );
// }

// export default App;
