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
  const [editingId, setEditingId] = useState(null); // Track editing row
  const [newEmployee, setNewEmployee] = useState(null); // Track new employee row
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [employeeToRemove, setEmployeeToRemove] = useState(null); // Track employee to remove
  const [originalEmployeeData, setOriginalEmployeeData] = useState(null); // Track original employee data

  // Dummy data for now
  useEffect(() => {
    const fetchedEmployees = [
      { id: 1, first_name: 'John', last_name: 'Doe', phone: '123456789', nic: '123456789V', email: 'john@example.com', position_id: 6, username: 'johndoe' },
      { id: 2, first_name: 'Jane', last_name: 'Smith', phone: '987654321', nic: '987654321V', email: 'jane@example.com', position_id: 1, username: 'janesmith' },
    ];
    setEmployees(fetchedEmployees);
  }, []);

  const handleInputChange = (e, id, field) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === id ? { ...employee, [field]: e.target.value } : employee
      )
    );
  };

  const handleAddEmployee = () => {
    const newId = employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;
    setNewEmployee({
      id: newId,
      first_name: '',
      last_name: '',
      phone: '',
      nic: '',
      email: '',
      position_id: '', // Track position ID
      username: '',
    });
  };

  const handleSaveNewEmployee = async () => {
    // Create the new employee object in the desired format
    const employeeData = {
      first_name: newEmployee.first_name,
      last_name: newEmployee.last_name,
      phone: newEmployee.phone,
      nic: newEmployee.nic,
      email: newEmployee.email,
      username: newEmployee.username,
      position_id: newEmployee.position_id, // Send position ID
    };

    try {
      const response = await axios.post('/api/employees', employeeData); // API call to add the new employee
      setEmployees([...employees, response.data]); // Add the new employee data from the response
      setNewEmployee(null); // Reset new employee state
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const confirmRemoveEmployee = (id) => {
    setShowModal(true);
    setEmployeeToRemove(id); // Set the employee to remove when the modal is shown
  };

  const handleRemoveEmployee = async () => {
    try {
      await axios.delete(`/api/employees/${employeeToRemove}`); // API call to remove the employee
      setEmployees(employees.filter((employee) => employee.id !== employeeToRemove));
      setShowModal(false);
      setEmployeeToRemove(null);
    } catch (error) {
      console.error('Error removing employee:', error);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingId(employee.id);
    setOriginalEmployeeData({ ...employee }); // Store original data before editing
  };

  const handleCancelEdit = () => {
    setEditingId(null); // Reset editingId to null to cancel editing
    // Restore original employee data
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
                        style={styles.input}
                        value={employee.email}
                        onChange={(e) => handleInputChange(e, employee.id, 'email')}
                      />
                    </td>
                    <td style={styles.td}>
                      <select
                        style={styles.input}
                        value={employee.position_id}
                        onChange={(e) => handleInputChange(e, employee.id, 'position_id')}
                      >
                        <option value="" disabled>Select Position</option>
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
                      <button style={styles.button} onClick={() => setEditingId(null)}>Save</button>
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
                    <td style={styles.td}>{positions.find(pos => pos.id === employee.position_id)?.title || 'N/A'}</td>
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
              <button style={{ ...styles.modalButton, ...styles.confirmButton }} onClick={handleRemoveEmployee}>Confirm</button>
              <button style={{ ...styles.modalButton, ...styles.cancelButton }} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        )}
        {newEmployee && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h3>Add New Employee</h3>
              <input
                type="text"
                placeholder="First Name"
                value={newEmployee.first_name}
                onChange={(e) => setNewEmployee({ ...newEmployee, first_name: e.target.value })}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={newEmployee.last_name}
                onChange={(e) => setNewEmployee({ ...newEmployee, last_name: e.target.value })}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Phone"
                value={newEmployee.phone}
                onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="NIC"
                value={newEmployee.nic}
                onChange={(e) => setNewEmployee({ ...newEmployee, nic: e.target.value })}
                style={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                style={styles.input}
              />
              <select
                style={styles.input}
                value={newEmployee.position_id}
                onChange={(e) => setNewEmployee({ ...newEmployee, position_id: e.target.value })}
              >
                <option value="" disabled>Select Position</option>
                {positions.map((position) => (
                  <option key={position.id} value={position.id}>{position.title}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Username"
                value={newEmployee.username}
                onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
                style={styles.input}
              />
              <button style={{ ...styles.modalButton, ...styles.confirmButton }} onClick={handleSaveNewEmployee}>Save</button>
              <button style={{ ...styles.modalButton, ...styles.cancelButton }} onClick={() => setNewEmployee(null)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MManageEmployees;
