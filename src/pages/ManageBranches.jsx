import React, { useState, useEffect } from 'react';
import TechnicianNaviBar from '../components/NaviBar/TechnicianNaviBar';
import Layout from '../layouts/Layout';

const styles = {
  container: {
    width: '90%',
    margin: '0 auto',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    marginTop: '20px',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
  },
  th: {
    padding: '12px',
    border: '1px solid #ddd',
    backgroundColor: '#1a2c63',
    color: 'white',
    fontWeight: 'bold',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '5px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '8px 15px',
    fontSize: '12px',
    fontWeight: 'bold',
    border: '1px solid #1a2c63',
    cursor: 'pointer',
    margin: '5px',
    borderRadius: '8px',
  },
  addButton: {
    padding: '8px 15px',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '15px',
    backgroundColor: '#1a2c63',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    float: 'right',
    marginBottom: '20px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    width: '300px',
  },
  modalButton: {
    padding: '8px 15px',
    margin: '10px',
    fontSize: '12px',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
  },
  confirmButton: {
    backgroundColor: '#28a745',
    color: 'white',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    color: 'white',
  },
};

const ManageBranches = () => {
<<<<<<< HEAD
  const styles = {
    dashboard: {
      fontFamily: 'Arial, sans-serif',
    },
    navbar: {
      backgroundColor: '#0A285F',
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      color: '#fff',
      fontWeight: 'bold',
    },
    navLinks: {
      display: 'flex',
      gap: '15px',
    },
    navLink: {
      color: '#fff',
      textDecoration: 'none',
    },
    activeLink: {
      color: '#FFA500', // Orange for active link
    },
    logoutLink: {
      color: 'red', // Red for logout
    },
    content: {
      backgroundColor: '#EAEAEA',
      padding: '20px',
    },
    heading: {
      color: '#0A285F',
    },
    addBranchBtn: {
      backgroundColor: '#0A285F',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      marginBottom: '20px',
      cursor: 'pointer',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    thTd: {
      border: '1px solid #ddd',
      padding: '12px',
      textAlign: 'left',
    },
    tableHeader: {
      backgroundColor: '#0A285F',
      color: 'white',
    },
    tableRow: {
      backgroundColor: '#fff',
    },
    actionBtn: {
      backgroundColor: '#FFA500',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      margin: '5px',
      cursor: 'pointer',
    },
    removeBtn: {
      backgroundColor: 'red',
    },
    updateBtn: {
      backgroundColor: 'green',
    }
=======
  const [branches, setBranches] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track editing row
  const [newBranch, setNewBranch] = useState(null); // Track new branch row
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [branchToRemove, setBranchToRemove] = useState(null); // Track branch to remove

  useEffect(() => {
    // Simulated fetch from API or database
    const fetchedBranches = [
      { id: 1, name: 'NYC Branch', address: '123 Street, NYC', manager: 'John Doe' },
      { id: 2, name: 'LA Branch', address: '456 Avenue, LA', manager: 'Jane Smith' },
    ];
    setBranches(fetchedBranches);
  }, []);

  const handleInputChange = (e, id, field) => {
    setBranches((prevBranches) =>
      prevBranches.map((branch) =>
        branch.id === id ? { ...branch, [field]: e.target.value } : branch
      )
    );
  };

  const handleAddBranch = () => {
    const newId = branches.length > 0 ? branches[branches.length - 1].id + 1 : 1;
    setNewBranch({
      id: newId,
      name: '',
      address: '',
      manager: '',
    });
  };

  const handleSaveNewBranch = () => {
    setBranches([...branches, newBranch]);
    setNewBranch(null);
  };

  const confirmRemoveBranch = (id) => {
    setShowModal(true);
    setBranchToRemove(id); // Set the branch to remove when the modal is shown
  };

  const handleRemoveBranch = () => {
    setBranches(branches.filter((branch) => branch.id !== branchToRemove));
    setShowModal(false);
    setBranchToRemove(null);
>>>>>>> sasmitha
  };

  return (
    <Layout NavigationBar={<TechnicianNaviBar />}>
<<<<<<< HEAD
      <div style={styles.dashboard}>
        <div style={styles.content}>
          <h1 style={styles.heading}>Manage the Branches</h1>
          <button style={styles.addBranchBtn}>Add New Branch</button>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.thTd, ...styles.tableHeader }}>Branch Name</th>
                <th style={{ ...styles.thTd, ...styles.tableHeader }}>Address</th>
                <th style={{ ...styles.thTd, ...styles.tableHeader }}>Contact Number</th>
                <th style={{ ...styles.thTd, ...styles.tableHeader }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr style={styles.tableRow}>
                <td style={styles.thTd}></td>
                <td style={styles.thTd}></td>
                <td style={styles.thTd}></td>
                <td style={styles.thTd}>
                  <button style={{ ...styles.actionBtn, ...styles.removeBtn }}>Remove Branch</button>
                  <button style={{ ...styles.actionBtn, ...styles.updateBtn }}>Update Branch Details</button>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
=======
      <div style={styles.container}>
        <button style={styles.addButton} onClick={handleAddBranch}>
          Add New Branch
        </button>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Branch Name</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Manager</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr key={branch.id}>
                {editingId === branch.id ? (
                  <>
                    <td style={styles.td}>
                      <input
                        type="text"
                        style={styles.input}
                        value={branch.name}
                        onChange={(e) => handleInputChange(e, branch.id, 'name')}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        style={styles.input}
                        value={branch.address}
                        onChange={(e) => handleInputChange(e, branch.id, 'address')}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        style={styles.input}
                        value={branch.manager}
                        onChange={(e) => handleInputChange(e, branch.id, 'manager')}
                      />
                    </td>
                    <td style={styles.td}>
                      <button style={styles.button} onClick={() => setEditingId(null)}>
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={styles.td}>{branch.name}</td>
                    <td style={styles.td}>{branch.address}</td>
                    <td style={styles.td}>{branch.manager}</td>
                    <td style={styles.td}>
                      <button style={styles.button} onClick={() => setEditingId(branch.id)}>
                        Update Branch
                      </button>
                      <button style={styles.button} onClick={() => confirmRemoveBranch(branch.id)}>
                        Remove Branch
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {newBranch && (
              <tr>
                <td style={styles.td}>
                  <input
                    type="text"
                    style={styles.input}
                    value={newBranch.name}
                    onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="text"
                    style={styles.input}
                    value={newBranch.address}
                    onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="text"
                    style={styles.input}
                    value={newBranch.manager}
                    onChange={(e) => setNewBranch({ ...newBranch, manager: e.target.value })}
                  />
                </td>
                <td style={styles.td}>
                  <button style={styles.button} onClick={handleSaveNewBranch}>
                    Save
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Custom Confirmation Modal */}
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h3>Are you sure you want to remove this branch?</h3>
              <button
                style={{ ...styles.modalButton, ...styles.confirmButton }}
                onClick={handleRemoveBranch}
              >
                Yes, Remove
              </button>
              <button
                style={{ ...styles.modalButton, ...styles.cancelButton }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
>>>>>>> sasmitha
      </div>
    </Layout>
  );
};

export default ManageBranches;
