import React from 'react';
import ManagerNaviBar from '../components/NaviBar/ManagerNaviBar';
import { useState } from 'react';
import Layout from '../layouts/Layout';

const ManageBranch = () => {
  const [branchInfo, setBranchInfo] = useState({
    name: 'Victoria',
    address: 'A Bank Headquarters, 123 Avenue, Central Park City, Seychelles',
    contactNumber: '+248 11 444 4444',
  });

  const [editInfo, setEditInfo] = useState({
    name: '',
    address: '',
    contactNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSaveDetails = () => {
    // Validate inputs to make sure none of them are empty
    if (!editInfo.name || !editInfo.address || !editInfo.contactNumber) {
      alert('Please fill in all fields before saving.');
      return; // Stop the save process if any field is empty
    }

    // Save the new branch info if all inputs are filled
    setBranchInfo(editInfo);
  };

  return (
    <Layout NavigationBar={<ManagerNaviBar />}>
      <div style={styles.dashboard}>
        {/* Branch Information */}
        <div style={styles.infoBox}>
          <h3 style={styles.title}>Branch Information</h3>
          <p style={styles.detailItem}><strong>Name:</strong> {branchInfo.name}</p>
          <p style={styles.detailItem}><strong>Address:</strong> {branchInfo.address}</p>
          <p style={styles.detailItem}><strong>Contact Number:</strong> {branchInfo.contactNumber}</p>
          <button style={styles.button} onClick={() => setEditInfo(branchInfo)}>Change Details</button>
        </div>

        {/* Edit Branch Information */}
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
          <button style={styles.button} onClick={handleSaveDetails}>Save Details</button>
        </div>
      </div>
    </Layout>
  );
};

// Inline styles for the dashboard and form elements
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
    minHeight: '300px', // Ensure both boxes have a similar height
  },
  title: {
    fontSize: '1.8rem', // Increased font size for the titles
    marginBottom: '1.5rem',
    color: '#333',
  },
  detailItem: {
    fontSize: '1.2rem', // Increased font size for the branch details
    marginBottom: '1.2rem', // Add more spacing between the details
    color:"black",
    textAlign: 'left',
    lineHeight: '1.6rem', // Increase line spacing for better readability
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
