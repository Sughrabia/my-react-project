import React, { useEffect, useState } from 'react';
import './manageUser.css'

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        // Fetch users from the backend
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/user');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUsers();
    }, []);


    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`http://localhost:5000/user/${userId}`, {
                    method: 'DELETE',
                });
    
                if (response.ok) {
                    // Correctly filter out the deleted user by matching the userId
                    setUsers(users.filter((user) => user._id !== userId)); 
                } else {
                    console.error('Failed to delete user');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };


    return (
        <div>
            <h1>Manage Users</h1>
            {error && <p className="error-message">{error}</p>}
            {users.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                    
                </table>
            ) : (
                <p>No users found</p>
            )}
        </div>
    );
};

export default ManageUser;
