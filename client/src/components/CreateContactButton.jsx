import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CreateContactButton = ({ onRefreshTable }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formcontact, setFormcontact] = useState({ name: '', number: '', email: '' });
  const [error, setError] = useState('');
  const accessToken = Cookies.get('accessToken');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormcontact({ name: '', number: '', email: '' });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormcontact((prev) => ({ ...prev, [name]: value }));
  };

  const validatePhoneNumber = (number) => /^[0-9]{10}$/.test(number);

  const handleCreateContact = async () => {
    const { name, number, email } = formcontact;

    if (!name || !number || !email) {
      setError('All fields are required.');
      return;
    }

    if (!validatePhoneNumber(number)) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_ROUTE}/contact`,
        { name, number, email },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        }
      );

      alert('Contact created successfully!');
      onRefreshTable();
      handleCloseModal();
    } catch (error) {
      console.error('Error creating Contact:', error);
      setError('Failed to create contact. Please try again.');
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 transition-all"
      >
        Create New contact
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Create New Contact</h2>
            {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formcontact.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-300"
                  placeholder='Enter name'
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="number" className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={formcontact.number}
                  maxLength={10}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-300"
                  placeholder="Phone number without country code"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formcontact.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-300"
                  placeholder="Enter email"
                  required
                />
              </div>
              <button
                type="button"
                onClick={handleCreateContact}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 transition-all w-full"
              >
                Create contact
              </button>
            </form>
            <button
              onClick={handleCloseModal}
              className="text-gray-500 mt-4 hover:text-gray-700 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateContactButton;
