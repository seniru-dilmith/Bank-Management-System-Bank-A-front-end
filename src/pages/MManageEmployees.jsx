import React, { useState, useEffect } from 'react';
import ManagerNaviBar from '../components/NaviBar/ManagerNaviBar';
import Layout from '../layouts/Layout';
import axios from 'axios'; // Axios for API requests
import useAuth from '../utils/useAuth';
import { useSpinner } from '../utils/SpinnerContext';
import { findDOMNode } from 'react-dom';

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
};

const MManageEmployees = () => {
  useAuth(); // Custom hook to check for JWT token
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newEmployee, setNewEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [employeeToRemove, setEmployeeToRemove] = useState(null);
  const [originalEmployeeData, setOriginalEmployeeData] = useState(null);
  const [branchId, setBranchId] = useState(null);
  const [positions, setPositions] = useState([]);
  const { setWaiting } = useSpinner();

  const token = localStorage.getItem('token'); // Get JWT token from localStorage

  // Fetch Branch ID from the backend
  const fetchBranchId = async () => {
    try {
      setWaiting(true); // Show loading spinner
      const branchResponse = await axios.get(
        'http://localhost:5000/branch-manager/get-branch-id',
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add JWT token to request headers
          },
        }
      );
      setBranchId(branchResponse.data.branch_id); // Ensure the correct data is used
    } catch (error) {
      console.error('Error fetching branch ID:', error);
    } finally {
      setWaiting(false); // Hide loading spinner
    }
  };

  // Fetch positions from backend
  const fetchPositions = async () => {
    try {
      setWaiting(true); // Show loading spinner
      const response = await axios.get('http://localhost:5000/branch-manager/get-positions', {
        headers: {
          Authorization: `Bearer ${token}`, // Add JWT token to request headers
        },
      });
      setPositions(response.data);
    } catch (error) {
      console.error('Error fetching positions:', error);
    } finally {
      setWaiting(false); // Hide loading spinner
    }
  };

  // Fetch employees for a specific branch
  const fetchEmployees = async (branchId) => {
    try {
      setWaiting(true); // Show loading spinner
      const response = await axios.get(
        `http://localhost:5000/employee/general/branch/${branchId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add JWT token to request headers
          },
        }
      );
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setWaiting(false); // Hide loading spinner
    }
  };

  // Fetch branch ID and then employees
  useEffect(() => {
    const fetchData = async () => {
      await fetchBranchId(); // Fetch the branch ID first
      await fetchPositions(); // Fetch the positions
    };
    fetchData();
  }, []);

  // Fetch employees whenever branchId changes
  useEffect(() => {
    if (branchId) {
      fetchEmployees(branchId); // Fetch employees only after branchId is set
    }
  }, [branchId]);

  const handleInputChange = (e, id, field) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === id ? { ...employee, [field]: e.target.value } : employee
      )
    );
  };

  const handleAddEmployee = () => {
    setNewEmployee({
      first_name: '',
      last_name: '',
      phone: '',
      nic: '',
      email: '',
      position_id: '',
      username: '',
    });
  };

  const handleSaveNewEmployee = async () => {
    try {
      setWaiting(true); // Show loading spinner
      const response = await axios.post(
        'http://localhost:5000/employee/add',
        newEmployee,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request
          },
        }
      );
      setEmployees([...employees, response.data]);
      setNewEmployee(null);
    } catch (error) {
      console.error('Error saving employee:', error);
    } finally {
      setWaiting(false); // Hide loading spinner
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingId(employee.id);
    setOriginalEmployeeData({ ...employee });
  };

  const handleUpdateEmployee = async (id) => {
    const employeeToUpdate = employees.find((employee) => employee.id === id);
    try {
      setWaiting(true); // Show loading spinner
      await axios.put(
        `http://localhost:5000/employee/update/${id}`,
        employeeToUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request
          },
        }
      );
      setEditingId(null);
      fetchEmployees(branchId); // Refresh the list
    } catch (error) {
      console.error('Error updating employee:', error);
    } finally {
      setWaiting(false); // Hide loading spinner
    }
  };

  const confirmRemoveEmployee = (id) => {
    setShowModal(true);
    setEmployeeToRemove(id);
  };

  const handleRemoveEmployee = async () => {
    try {
      setWaiting(true); // Show loading spinner
      await axios.delete(
        `http://localhost:5000/employee/delete/${employeeToRemove}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request
          },
        }
      );
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== employeeToRemove)
      );
      setShowModal(false);
      setEmployeeToRemove(null);
    } catch (error) {
      console.error('Error removing employee:', error);
    } finally { 
      setWaiting(false); // Hide loading spinner
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === originalEmployeeData.id ? originalEmployeeData : employee
      )
    );
  };

  return (
    <Layout NavigationBar={<ManagerNaviBar />}>
      <div style={styles.dashboardbox}>
          <h2 style={styles.dashboardTitle}>Branch Manager Dashboard</h2>
        </div>
        <div></div>
        <div style={styles.ContentBox}>
          <h2 style={styles.ContentTitle}>Manage Employees</h2>
      </div>
      <div style={styles.container}>
      
       {/* <button style={styles.addButton} onClick={handleAddEmployee}>
          Add New Employee
        </button> */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>First Name</th>
              <th style={styles.th}>Last Name</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>NIC</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Position</th>
              <th style={styles.th}>Username</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                {editingId === employee.id ? (
                  <>
                    <td>
                      <input
                        style={styles.input}
                        value={employee.first_name}
                        onChange={(e) => handleInputChange(e, employee.id, 'first_name')}
                      />
                    </td>
                    <td>
                      <input
                        style={styles.input}
                        value={employee.last_name}
                        onChange={(e) => handleInputChange(e, employee.id, 'last_name')}
                      />
                    </td>
                    <td>
                      <input
                        style={styles.input}
                        value={employee.phone}
                        onChange={(e) => handleInputChange(e, employee.id, 'phone')}
                      />
                    </td>
                    <td>
                      <input
                        style={styles.input}
                        value={employee.nic}
                        onChange={(e) => handleInputChange(e, employee.id, 'nic')}
                      />
                    </td>
                    <td>
                      <input
                        style={styles.input}
                        value={employee.email}
                        onChange={(e) => handleInputChange(e, employee.id, 'email')}
                      />
                    </td>
                    <td>
                      <select
                        style={styles.input}
                        value={employee.position_id}
                        onChange={(e) => handleInputChange(e, employee.id, 'position_id')}
                      >
                        {positions.map((position) => (
                          <option key={position.id} value={position.id}>
                            {position.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        style={styles.input}
                        value={employee.username}
                        onChange={(e) => handleInputChange(e, employee.id, 'username')}
                      />
                    </td>
                    <td>
                      <button
                        style={{ ...styles.button, backgroundColor: '#007bff' }}
                        onClick={() => handleUpdateEmployee(employee.id)}
                      >
                        Save
                      </button>
                      <button
                        style={{ ...styles.button, backgroundColor: '#dc3545' }}
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.nic}</td>
                    <td>{employee.email}</td>
                    <td>{employee.position_id}</td>
                    <td>{employee.username}</td>
                    <td>
                      <button
                        style={{ ...styles.button, backgroundColor: '#28a745' }}
                        onClick={() => handleEditEmployee(employee)}
                      >
                        Edit
                      </button>
                      <button
                        style={{ ...styles.button, backgroundColor: '#dc3545' }}
                        onClick={() => confirmRemoveEmployee(employee.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {newEmployee && (
            <div>
              <h3>Add New Employee</h3>
              <input
                style={styles.input}
                placeholder="First Name"
                value={newEmployee.first_name}
                onChange={(e) => setNewEmployee({ ...newEmployee, first_name: e.target.value })}
              />
              <input
                style={styles.input}
                placeholder="Last Name"
                value={newEmployee.last_name}
                onChange={(e) => setNewEmployee({ ...newEmployee, last_name: e.target.value })}
              />
              <input
                style={styles.input}
                placeholder="Phone"
                value={newEmployee.phone}
                onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
              />
              <input
                style={styles.input}
                placeholder="NIC"
                value={newEmployee.nic}
                onChange={(e) => setNewEmployee({ ...newEmployee, nic: e.target.value })}
              />
              <input
                style={styles.input}
                placeholder="Email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
              />
              <select
                style={styles.input}
                value={newEmployee.position_id}
                onChange={(e) => setNewEmployee({ ...newEmployee, position_id: e.target.value })}
              >
                {positions.map((position) => (
                  <option key={position.id} value={position.id}>
                    {position.name}
                  </option>
                ))}
              </select>
              <input
                style={styles.input}
                placeholder="Username"
                value={newEmployee.username}
                onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
              />
              <button style={styles.button} onClick={handleSaveNewEmployee}>
                Save New Employee
              </button>
              <button style={styles.button} onClick={() => setNewEmployee(null)}>
                Cancel
              </button>
            </div>
          )}
        </div>
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h4>Are you sure you want to remove this employee?</h4>
              <button
                style={{ ...styles.modalButton, ...styles.confirmButton }}
                onClick={handleRemoveEmployee}
              >
                Yes
              </button>
              <button
                style={{ ...styles.modalButton, ...styles.cancelButton }}
                onClick={() => setShowModal(false)}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MManageEmployees;
