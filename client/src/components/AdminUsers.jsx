import { useEffect, useState } from 'react';
import axios from 'axios';
import ManageUser from '../components/ManageUser';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUserUpdated, setIsUserUpdated] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_ROUTE}/user/all-profiles`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
        setUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    if(isUserUpdated){
      setIsUserUpdated(false);
    }
  }, [isUserUpdated]);

  const handleDeleteUser = async (user) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API_ROUTE}/user/delete-profile`,
        {
          data: { email: user.email },
            headers: {
              'Content-Type': 'application/json',
            },
        }
      );
      setIsUserUpdated(true); 
    } catch (err) {
      console.error(
        'Error deleting user:',
        err.response?.data?.message || err.message
      );
      setIsUserUpdated(false); 
    }
  };


  if (loading) return <div >Loading...</div>;
  if (error) return <div >Error: {error}</div>;

  return (
    <div className=" p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <ManageUser users={users} onDeleteUser={handleDeleteUser} />
    </div>
  );
};

export default AdminUsers;
