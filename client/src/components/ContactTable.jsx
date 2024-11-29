import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ContactTable = ({ refreshTable }) => {
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_ROUTE}/contact/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        });
        setContact(response.data.contact || []); 
      } catch (err) {
        console.error("Error fetching contact:", err);
        setError("Failed to fetch contact. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [refreshTable, isDeleteModalOpen, isEditModalOpen]);

  const handleEdit = (row) => {
    setSelectedRow(row);
    setIsEditModalOpen(true);
  };

  const handleDelete = (row) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const filteredContact = Array.isArray(contact)
  ? contact.filter((entry) =>
      Object.values(entry)
        .filter((value) => typeof value === "string" || typeof value === "number") 
        .some((value) =>
          value.toString().toLowerCase().includes(filter.toLowerCase())
        )
    )
  : [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const tableKeys = contact.length > 0 ? Object.keys(contact[0]).filter(key => key !== '_id' && key !== '__v' && key !== 'createdBy') : [];

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search contact by any field"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/3"
        />
      </div>

      <div className="overflow-x-auto">
        {filteredContact.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                {tableKeys.map((key) => (
                  <th key={key} className="px-4 py-2 border-b capitalize text-left">
                    {key}
                  </th>
                ))}
                <th className="px-4 py-2 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContact.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  {tableKeys.map((key) => (
                    <td key={key} className="px-4 py-2 border-b text-left">
                      {row[key]}
                    </td>
                  ))}
                  <td className="px-4 py-2 border-b text-left">
                    <button
                      className="text-blue-500 hover:underline mr-2"
                      onClick={() => handleEdit(row)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(row)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-4 text-gray-500">No contact Available</div>
        )}
      </div>

      {isDeleteModalOpen && (
        <DeleteModal row={selectedRow} onClose={() => setIsDeleteModalOpen(false)} />
      )}
      {isEditModalOpen && (
        <EditModal row={selectedRow} onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  );
};

const DeleteModal = ({ row, onClose }) => {
  const handleDelete = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API_ROUTE}/contact/${row._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      });
      onClose();
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <p>Are you sure you want to delete this contact?</p>
        <div className="mt-4 flex justify-end">
          <button className="mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const EditModal = ({ row, onClose }) => {
  const [formcontact, setFormcontact] = useState({ ...row });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormcontact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const accessToken = Cookies.get("accessToken");
      await axios.put(`${import.meta.env.VITE_REACT_APP_API_ROUTE}/contact/${row._id}`, formcontact, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      });
      onClose();
    } catch (err) {
      console.error("Error updating contact:", err);
      setError("Failed to update contact. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit contact</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {Object.keys(row).map((key) => (
          key !== "_id" && key !== '__v' && key !== 'createdBy' && (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium capitalize">{key}</label>
              <input
                type="text"
                name={key}
                value={formcontact[key]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
          )
        ))}
        <div className="flex justify-end">
          <button className="mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactTable;
