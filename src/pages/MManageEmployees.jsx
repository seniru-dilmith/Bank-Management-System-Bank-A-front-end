import React, { useState, useEffect } from 'react';
import ManagerNaviBar from '../components/NaviBar/ManagerNaviBar';
import Layout from '../layouts/Layout';
import axios from 'axios'; // Axios for API requests

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

const positions = [
  { id: 1, title: 'Branch Manager' },
  { id: 2, title: 'Teller' },
  { id: 3, title: 'Loan Officer' },
  { id: 4, title: 'Security Officer' },
  { id: 5, title: 'Operations Manager' },
  { id: 6, title: 'Technician' },
];

const MManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newEmployee, setNewEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [employeeToRemove, setEmployeeToRemove] = useState(null);
  const [originalEmployeeData, setOriginalEmployeeData] = useState(null);
  const [branchId, setBranchId] = useState(null);
  const [positions, setPositions] = useState([]);

  const token = localStorage.getItem('token'); // Get JWT token from localStorage

  // Fetch Branch ID from the backend
  const fetchBranchId = async () => {
    try {
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
    }
  };

  // fetch positions from backend
  const fetchPositions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/branch-manager/get-positions', {
        headers: {
          Authorization: `Bearer ${token}`, // Add JWT token to request headers
        },
      });
      setPositions(response.data);
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };


  // Fetch employees for a specific branch
  const fetchEmployees = async (branchId) => {
    try {
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
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingId(employee.id);
    setOriginalEmployeeData({ ...employee });
  };

  const handleUpdateEmployee = async (id) => {
    const employeeToUpdate = employees.find((employee) => employee.id === id);
    try {
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
    }
  };

  const confirmRemoveEmployee = (id) => {
    setShowModal(true);
    setEmployeeToRemove(id);
  };

  const handleRemoveEmployee = async () => {
    try {
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
      <div style={styles.container}>
        <button style={styles.addButton} onClick={handleAddEmployee}>
          Add New Employee
        </button>
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
                    <td style={styles.td}>
                      <input
                        type="text"
                        style={styles.input}
                        value={employee.first_name}
                        onChange={(e) => handleInputChange(e, employee.id, 'first_name')}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        style={styles.input}
                        value={employee.last_name}
                        onChange={(e) => handleInputChange(e, employee.id, 'last_name')}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        style={styles.input}
                        value={employee.phone}
                        onChange={(e) => handleInputChange(e, employee.id, 'phone')}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        style={styles.input}
                        value={employee.nic}
                        onChange={(e) => handleInputChange(e, employee.id, 'nic')}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="email"
                        value={employee.email}
                        onChange={(e) => handleInputChange(e, employee.id, 'email')}
                      />
                    </td>
                    <td style={styles.td}>
                      <select
                        value={employee.position_id}
                        onChange={(e) => handleInputChange(e, employee.id, 'position_id')}
                      >
                        <option value="">Select Position</option>
                        {positions.map((position) => (
                          <option key={position.id} value={position.id}>
                            {position.title}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        style={styles.input}
                        value={employee.username}
                        onChange={(e) => handleInputChange(e, employee.id, 'username')}
                      />
                    </td>
                    <td style={styles.td}>
                      <button style={styles.button} onClick={() => handleUpdateEmployee(employee.id)}>
                        Save
                      </button>
                      <button style={styles.button} onClick={handleCancelEdit}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={styles.td}>{employee.first_name}</td>
                    <td style={styles.td}>{employee.last_name}</td>
                    <td style={styles.td}>{employee.phone}</td>
                    <td style={styles.td}>{employee.nic}</td>
                    <td style={styles.td}>{employee.email}</td>
                    <td style={styles.td}>
                      {positions.find((pos) => pos.id === employee.position_id)?.title}
                    </td>
                    <td style={styles.td}>{employee.username}</td>
                    <td style={styles.td}>
                      <button style={styles.button} onClick={() => handleEditEmployee(employee)}>Edit</button>
                      <button style={styles.button} onClick={() => confirmRemoveEmployee(employee.id)}>Remove</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h3>Confirm Removal</h3>
              <p>Are you sure you want to remove this employee?</p>
              <button onClick={handleRemoveEmployee} style={{...styles.modalButton, ...styles.confirmButton}}>Confirm</button>
              <button onClick={() => setShowModal(false)} style={{...styles.modalButton, ...styles.cancelButton}}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MManageEmployees;
