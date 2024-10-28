import React, { useState, useEffect } from 'react';
import ManagerNaviBar from '../components/NaviBar/ManagerNaviBar';
import Layout from '../layouts/Layout';
import axios from 'axios';
import useAuth from '../utils/useAuth';
import { useSpinner } from '../utils/SpinnerContext';

const ManageBranch = () => {
  useAuth(); // Redirect to login if token is invalid
  const [branchInfo, setBranchInfo] = useState({
    id: null,
    name: '',
    address: '',
    contactNumber: '',
  });

  const [editInfo, setEditInfo] = useState({
    name: '',
    address: '',
    contactNumber: '',
  });

  const [showEditBox, setShowEditBox] = useState(false); // New state for toggling edit box visibility
  const { setWaiting } = useSpinner();

  const token = localStorage.getItem('token'); // Get JWT token from localStorage

  // Fetch branch information for the logged-in manager
  const fetchBranchInfo = async () => {
    try {
      setWaiting(true); // Set waiting state to show spinner
      const response = await axios.get(
        'http://localhost:5000/branch-manager/get-branch-details',
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add JWT token to request headers
          },
        }
      );

      const { id, name, branch_address, contact_number } = response.data;

      console.log('Fetched Branch Info:', { id, name, branch_address, contact_number });

      setBranchInfo({
        id,
        name,
        address: branch_address,
        contactNumber: contact_number,
      });

      setEditInfo({
        name,
        address: branch_address,
        contactNumber: contact_number,
      });
    } catch (error) {
      console.error('Error fetching branch information:', error);
    } finally {
      setWaiting(false); // Hide spinner
    }
  };

  // Update branch details
  const handleSaveDetails = async () => {
    if (!editInfo.name || !editInfo.address || !editInfo.contactNumber) {
      alert('Please fill in all fields before saving.');
      return;
    }

    console.log('Branch Info before Update:', branchInfo); // Debug log

    try {
      setWaiting(true); // Set waiting state to show spinner
      await axios.put(
        `http://localhost:5000/branch-manager/update-branch-details/${branchInfo.id}`,
        {
          name: editInfo.name,
          branch_address: editInfo.address,
          contact_number: editInfo.contactNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request
          },
        }
      );

      setBranchInfo((prev) => ({
        ...prev,
        name: editInfo.name,
        address: editInfo.address,
        contactNumber: editInfo.contactNumber,
      }));

      alert('Branch details updated successfully!');
      setShowEditBox(false); // Hide edit box after saving
    } catch (error) {
      console.error('Error updating branch details:', error);
      alert('Failed to update branch details. Please try again.');
    } finally {
      setWaiting(false); // Hide spinner
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchBranchInfo(); // Fetch branch info when the component mounts
  }, []);

  return (
    <Layout NavigationBar={<ManagerNaviBar />}>
      <div style={styles.dashboard}>
        <div style={styles.infoBox}>
          <h3 style={styles.title}>Branch Information</h3>
          <p style={styles.detailItem}><strong>Name:</strong> {branchInfo.name}</p>
          <p style={styles.detailItem}><strong>Address:</strong> {branchInfo.address}</p>
          <p style={styles.detailItem}><strong>Contact Number:</strong> {branchInfo.contactNumber}</p>
          <button
            style={styles.button}
            onClick={() => setShowEditBox(true)} // Show edit box when clicked
          >
            Change Details
          </button>
        </div>

        {showEditBox && ( // Conditionally render edit box
          <div style={styles.infoBox}>
            <h3 style={styles.title}>Edit Branch Information</h3>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={editInfo.name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Address</label>
              <input
                type="text"
                name="address"
                value={editInfo.address}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={editInfo.contactNumber}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <button style={styles.button} onClick={handleSaveDetails}>
              Save Details
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

const styles = {
  dashboard: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    padding: '2rem',
    gap: '2rem',
  },
  infoBox: {
    backgroundColor: '#f4f4f4',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    width: '40%',
    textAlign: 'left',
    minHeight: '300px',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    color: '#333',
  },
  detailItem: {
    fontSize: '1.2rem',
    marginBottom: '1.2rem',
    color: 'black',
    textAlign: 'left',
    lineHeight: '1.6rem',
  },
  inputGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '1rem',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#F49867',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default ManageBranch;
