import users from '../data/users.json';

// Function to fetch all users
export const getUsers = () => {
  return users;
};

// Function to add a new user
export const addUser = (newUser) => {
  users.push(newUser);
};

// Function to update an existing user
export const updateUser = (updatedUser) => {
  const index = users.findIndex(user => user.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
  }
};

// Function to delete a user
export const deleteUser = (id) => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
  }
};
