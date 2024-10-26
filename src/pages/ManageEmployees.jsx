import React, { useState, useEffect } from 'react';
import TechnicianNaviBar from '../components/NaviBar/TechnicianNaviBar';
import Layout from '../layouts/Layout';
import axios from 'axios';
import useAuth from '../utils/useAuth';

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

const ManageEmployees = () => {
  useAuth(); // Custom hook to check for authentication
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track editing row
  const [newEmployee, setNewEmployee] = useState(null); // Track new employee row
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [positions, setPositions] = useState([]); // Track positions
  const [employeeToRemove, setEmployeeToRemove] = useState(null); // Track employee to remove

  // Fetch employees from the database

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage

      const response = await axios.get('http://localhost:5000/employee-management/employees', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 

      setEmployees(response.data);
      
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchPositions = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const response = await axios.get('http://localhost:5000/employee-management/positions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPositions(response.data);
    } catch (error) {
      console.error('Error fetching positions:', error);
    } 
  };

  useEffect(() => {
    fetchEmployees();
    fetchPositions();
  }, []);

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
      address: '',
      username: '',
    });
  };

  const handleSaveNewEmployee = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const response = await axios.post('http://localhost:5000/employee-management/add-employee', newEmployee, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees([...employees, response.data]);
      setNewEmployee(null);
      fetchEmployees();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  // handler to update the employee
  const handleUpdateEmployee = async (id) => {
    
    const employeeToUpdate = employees.find((employee) => employee.id === id);
    
    // Prepare the correct format for the backend request
    const updatedEmployeeData = {
      id: employeeToUpdate.id,
      first_name: employeeToUpdate.first_name,
      last_name: employeeToUpdate.last_name,
      address: employeeToUpdate.address,
      phone: employeeToUpdate.phone,
      nic: employeeToUpdate.nic,
      email: employeeToUpdate.email,
      username: employeeToUpdate.username,
      position_id: employeeToUpdate.position_id,
      branch_id: employeeToUpdate.branch_id,
      supervisor_id: employeeToUpdate.supervisor_id,
    };

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/employee-management/update-employee', updatedEmployeeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingId(null);
      fetchEmployees();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const confirmRemoveEmployee = (id) => {
    setShowModal(true);
    setEmployeeToRemove(id); // Set the employee to remove when the modal is shown
  };

  const handlePositionChange = (e, id) => {
    const selectedPosition = positions.find((pos) => pos.name === e.target.value);
    setEmployees((prev) =>
      prev.map((employee) =>
        employee.id === id ? { ...employee, position_id: selectedPosition.id } : employee
      )
    );
  };  

  const handleRemoveEmployee = () => {
    // Remove the employee from the database
    const removeEmployee = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/employee-management/remove-employee/${employeeToRemove}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setEmployees(employees.filter((employee) => employee.id !== employeeToRemove));
        setShowModal(false);
        setEmployeeToRemove(null);
      } catch (error) {
        console.error('Error removing employee:', error);
      } 
    };
    
    removeEmployee();
  }; 

  return (
    <Layout NavigationBar={<TechnicianNaviBar />}>
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
              <th style={styles.th}>Address</th>
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
                        id={`first_name-${employee.id}`}
                        style={styles.input}
                        value={employee.first_name}
                        onChange={(e) => handleInputChange(e, employee.id, 'first_name')}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        id={`last_name-${employee.id}`}
                        style={styles.input}
                        value={employee.last_name}
                        onChange={(e) => handleInputChange(e, employee.id, 'last_name')}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        id={`phone-${employee.id}`}
                        style={styles.input}
                        value={employee.phone}
                        onChange={(e) => handleInputChange(e, employee.id, 'phone')}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        id={`nic-${employee.id}`}
                        style={styles.input}
                        value={employee.nic}
                        onChange={(e) => handleInputChange(e, employee.id, 'nic')}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="email"
                        id={`email-${employee.id}`}
                        style={styles.input}
                        value={employee.email}
                        onChange={(e) => handleInputChange(e, employee.id, 'email')}
                      />
                    </td>
                    <td style={styles.td}>
                    <select
                      id={`position-${employee.id}`}
                      style={styles.select}
                      value={positions.find((pos) => pos.id === employee.position_id)?.name || ''}
                      onChange={(e) => handlePositionChange(e, employee.id)}
                      disabled={employee.id === 1} // Disable if the employee ID is 1
                    >
                      {positions.map((position) => (
                        <option key={position.id} value={position.name}>
                          {position.name}
                        </option>
                      ))}
                    </select>

                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        id={`address-${employee.id}`}
                        style={styles.input}
                        value={employee.address}
                        onChange={(e) => handleInputChange(e, employee.id, 'address')}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        id={`username-${employee.id}`}
                        style={styles.input}
                        value={employee.username}
                        onChange={(e) => handleInputChange(e, employee.id, 'username')}
                      />
                    </td>
                    <td style={styles.td}>
                      <button style={styles.button} onClick={() => handleUpdateEmployee(employee.id)}>
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={styles.td}>{employee.first_name}</td>
                    <td style={styles.td}>{employee.last_name}</td>
                    <td style={styles.td}>{employee.phone}</td>
                    <td style={styles.td}>{employee.nic}</td>
                    <td style={styles.td}>{employee.email}</td>
                    <td style={styles.td}>{employee.position}</td>
                    <td style={styles.td}>{employee.address}</td>
                    <td style={styles.td}>{employee.username}</td>
                    <td style={styles.td}>
                      <button style={styles.button} onClick={() => setEditingId(employee.id)}>
                        Update Employee
                      </button>
                      <button style={styles.button} onClick={() => confirmRemoveEmployee(employee.id)}>
                        Remove Employee
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {newEmployee && (
              <tr>
                <td style={styles.td}>
                  <input
                    type="text"
                    style={styles.input}
                    value={newEmployee.first_name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, first_name: e.target.value })}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="text"
                    style={styles.input}
                    value={newEmployee.last_name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, last_name: e.target.value })}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="text"
                    style={styles.input}
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="text"
                    style={styles.input}
                    value={newEmployee.nic}
                    onChange={(e) => setNewEmployee({ ...newEmployee, nic: e.target.value })}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="email"
                    style={styles.input}
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  />
                </td>
                <td style={styles.td}>
                  <select
                    style={styles.select}
                    value={newEmployee.position_id}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        position_id: positions.find((pos) => pos.name === e.target.value)?.id,
                      })
                    }
                  >
                    {positions.map((position) => (
                      <option key={position.id} value={position.name}>
                        {position.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td style={styles.td}>
                  <input
                    type="text"
                    style={styles.input}
                    value={newEmployee.address}
                    onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="text"
                    style={styles.input}
                    value={newEmployee.username}
                    onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
                  />
                </td>
                <td style={styles.td}>
                  <button style={styles.button} onClick={() => handleSaveNewEmployee }>
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
              <h3>Are you sure you want to remove this employee?</h3>
              <button
                style={{ ...styles.modalButton, ...styles.confirmButton }}
                onClick={handleRemoveEmployee}
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


export default ManageEmployees;
