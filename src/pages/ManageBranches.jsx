import React, { useState, useEffect } from 'react';
import TechnicianNaviBar from '../components/NaviBar/TechnicianNaviBar';
import Layout from '../layouts/Layout';
import axios from 'axios';
import useAuth from '../utils/useAuth';
import { useSpinner } from '../utils/SpinnerContext';


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
  ContentBox: {
    background: 'linear-gradient(90deg, #003366 0%, #005b99 100%)',
    padding: '10px 20px',
    borderRadius: '20px',
    marginBottom: '20px',
    display: 'inline-block',
    textAlign: 'center',
  },
  ContentTitle: {
    fontSize: '1.8rem',
    color: '#fff',
    margin: '0',
  },
  dashboardbox: {
    background: 'linear-gradient(90deg, #003366 0%, #005b99 100%)',
    padding: '10px 20px',
    borderRadius: '20px',
    marginBottom: '20px',
    display: 'inline-block',
  },
  dashboardTitle: {
    fontSize: '1.8rem',
    color: '#fff',
    margin: '0',
  },
};

const ManageBranches = () => {
  useAuth(); 
  const [branches, setBranches] = useState([]);
  const [editingId, setEditingId] = useState(null); 
  const [newBranch, setNewBranch] = useState(null); 
  const [showModal, setShowModal] = useState(false); 
  const [branchToRemove, setBranchToRemove] = useState(null); 
  const [originalBranchData, setOriginalBranchData] = useState({}); 
  const { setWaiting } = useSpinner();

  const fetchBranches = async () => {
    try {
      setWaiting(true);
      const backend_port = process.env.REACT_APP_BACKEND_PORT;
      const response = await axios.get(`http://localhost:${backend_port}/branch-management/branches`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBranches(response.data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    } finally {
      setWaiting(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleEditBranch = (id) => {
    const branchToEdit = branches.find(branch => branch.id === id);
    if (branchToEdit) {
      setOriginalBranchData({ ...branchToEdit }); 
    }
  };

  const handleInputChange = (e, id, field) => {
    setBranches((prev) =>
      prev.map((branch) =>
        branch.id === id ? { ...branch, [field]: e.target.value } : branch
      )
    );
  };

  const handleCancelEdit = () => {
    setBranches((prevBranches) =>
      prevBranches.map((branch) =>
        branch.id === editingId ? { ...originalBranchData } : branch
      )
    );
    setEditingId(null);
    setOriginalBranchData({});
  };

  const handleAddBranch = () => {
    setNewBranch({ name: '', branch_address: '', contact_number: '' });
  };

  const handleSaveNewBranch = async () => {
    try {
      setWaiting(true);
      const backend_port = process.env.REACT_APP_BACKEND_PORT;
      await axios.post(`http://localhost:${backend_port}/branch-management/add-branch`, newBranch, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setNewBranch(null);
      fetchBranches();
    } catch (error) {
      console.error('Error adding branch:', error);
    } finally {
      setWaiting(false);
    }
  };

  const handleUpdateBranch = async (id) => {
    const branchToUpdate = branches.find((branch) => branch.id === id);
    try {
      setWaiting(true);
      const backend_port = process.env.REACT_APP_BACKEND_PORT;
      await axios.put(`http://localhost:${backend_port}/branch-management/update-branch`, {
        currentName: originalBranchData.name, 
        newName: branchToUpdate.name, 
        branch_address: branchToUpdate.branch_address,
        contact_number: branchToUpdate.contact_number,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEditingId(null); 
      setOriginalBranchData({});
      fetchBranches(); 
    } catch (error) {
      console.error('Error updating branch:', error);
    } finally {
      setWaiting(false);
    }
  };

  const handleCancelNewBranch = () => {
    setNewBranch(null);
  };

  const confirmRemoveBranch = (id) => {
    setShowModal(true);
    setBranchToRemove(id); 
  };

  const handleRemoveBranch = async () => {
    try {
      setWaiting(true);
      const backend_port = process.env.REACT_APP_BACKEND_PORT;
      await axios.delete(`http://localhost:${backend_port}/branch-management/remove-branch/${branchToRemove}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setBranches(branches.filter((branch) => branch.id !== branchToRemove));
      setShowModal(false);
      setBranchToRemove(null);
    } catch (error) {
      console.error('Error removing branch:', error);
    } finally {
      setWaiting(false);
    }
  };

  return (
    <Layout NavigationBar={<TechnicianNaviBar />}>
      <div style={styles.dashboardbox}>
        <h2 style={styles.dashboardTitle}>Technician Dashboard</h2>
      </div>
      <div></div>
      <div style={styles.ContentBox}>
        <h2 style={styles.ContentTitle}>Manage Branches</h2>
      </div>
      <div style={styles.container}>
        <button style={styles.addButton} onClick={handleAddBranch}>
          Add New Branch
        </button>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Branch Name</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Contact Number</th>
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
                        value={branch.branch_address}
                        onChange={(e) => handleInputChange(e, branch.id, 'branch_address')}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        style={styles.input}
                        value={branch.contact_number}
                        onChange={(e) => handleInputChange(e, branch.id, 'contact_number')}
                      />
                    </td>
                    <td style={styles.td}>
                      <button style={styles.button} onClick={() => handleUpdateBranch(branch.id)}>
                        Save
                      </button>
                      <button style={styles.button} onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={styles.td}>{branch.name}</td>
                    <td style={styles.td}>{branch.branch_address}</td>
                    <td style={styles.td}>{branch.contact_number}</td>
                    <td style={styles.td}>
                      <button style={styles.button} onClick={() => handleEditBranch(branch.id)}>
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
                    value={newBranch.branch_address}
                    onChange={(e) => setNewBranch({ ...newBranch, branch_address: e.target.value })}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="text"
                    style={styles.input}
                    value={newBranch.contact_number}
                    onChange={(e) => setNewBranch({ ...newBranch, contact_number: e.target.value })}
                  />
                </td>
                <td style={styles.td}>
                  <button style={styles.button} onClick={handleSaveNewBranch}>
                    Save
                  </button>
                  <button style={styles.button} onClick={handleCancelNewBranch}>
                    Cancel
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
      </div>
    </Layout>
  );
};

export default ManageBranches;
