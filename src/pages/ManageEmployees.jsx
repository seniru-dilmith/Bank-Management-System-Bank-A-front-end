import React, { useState, useEffect } from 'react';
import TechnicianNaviBar from '../components/NaviBar/TechnicianNaviBar';
import Layout from '../layouts/Layout';

<<<<<<< HEAD
const TechnicianDashboard = () => {
  const containerStyle = {
    backgroundImage: 'url(https://example.com/your-background-image.jpg)', // Replace with actual background image
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  };

  const dashboardTitleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    backgroundColor: '#2E73B5',
    padding: '10px 20px',
    borderRadius: '10px',
    marginBottom: '20px',
    color: '#fff',
  };

  const tableContainerStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    width: '90%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    backgroundColor: '#001f3f',
    color: '#fff',
    padding: '10px',
    border: '1px solid #ccc',
  };

  const tdStyle = {
    padding: '10px',
    textAlign: 'center',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    backgroundColor: '#FF8C00',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '10px',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    margin: '5px',
    width: '120px',
  };

  const addEmployeeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#001f3f',
    padding: '10px 20px',
    marginBottom: '20px',
    display: 'block',
    marginLeft: 'auto',
=======
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
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track editing row
  const [newEmployee, setNewEmployee] = useState(null); // Track new employee row
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [employeeToRemove, setEmployeeToRemove] = useState(null); // Track employee to remove

  useEffect(() => {
    // Simulated fetch from API or database
    const fetchedEmployees = [
      { id: 1, firstName: 'John', lastName: 'Doe', phone: '123456789', nic: '123456789V', email: 'john@example.com', position: 'Technician', branch: 'NYC', username: 'johndoe' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '987654321', nic: '987654321V', email: 'jane@example.com', position: 'Manager', branch: 'LA', username: 'janesmith' },
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
      firstName: '',
      lastName: '',
      phone: '',
      nic: '',
      email: '',
      position: '',
      branch: '',
      username: '',
    });
  };

  const handleSaveNewEmployee = () => {
    setEmployees([...employees, newEmployee]);
    setNewEmployee(null);
  };

  const confirmRemoveEmployee = (id) => {
    setShowModal(true);
    setEmployeeToRemove(id); // Set the employee to remove when the modal is shown
  };

  const handleRemoveEmployee = () => {
    setEmployees(employees.filter((employee) => employee.id !== employeeToRemove));
    setShowModal(false);
    setEmployeeToRemove(null);
>>>>>>> sasmitha
  };

  return (
    <Layout NavigationBar={<TechnicianNaviBar />}>
<<<<<<< HEAD
      <div style={containerStyle}>
        {/* Dashboard Title */}
        <div style={dashboardTitleStyle}>Technician Dashboard</div>

        {/* Manage Employees Section */}
        <div style={tableContainerStyle}>
          <h2>Manage Employees</h2>
          <button style={addEmployeeButtonStyle}>Add New Employee</button>
          
          {/* Employees Table */}
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>first name</th>
                <th style={thStyle}>last name</th>
                <th style={thStyle}>phone</th>
                <th style={thStyle}>nic</th>
                <th style={thStyle}>email</th>
                <th style={thStyle}>position</th>
                <th style={thStyle}>branch</th>
                <th style={thStyle}>username</th>
                <th style={thStyle}>action</th>
              </tr>
            </thead>
            <tbody>
              {/* Repeat this row structure for multiple employees */}
              <tr>
                <td style={tdStyle}>John</td>
                <td style={tdStyle}>Doe</td>
                <td style={tdStyle}>555-5555</td>
                <td style={tdStyle}>123456789</td>
                <td style={tdStyle}>johndoe@example.com</td>
                <td style={tdStyle}>Technician</td>
                <td style={tdStyle}>New York</td>
                <td style={tdStyle}>jdoe</td>
                <td style={tdStyle}>
                  <button style={buttonStyle}>remove employee</button>
                  <button style={buttonStyle}>update employee</button>
                </td>
              </tr>
              {/* More rows can be added as needed */}
            </tbody>
          </table>
        </div>
=======
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
              <th style={styles.th}>Branch</th>
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
                        value={employee.firstName}
                        onChange={(e) => handleInputChange(e, employee.id, 'firstName')}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        style={styles.input}
                        value={employee.lastName}
                        onChange={(e) => handleInputChange(e, employee.id, 'lastName')}
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
                      <input
                        type="text"
                        style={styles.input}
                        value={employee.position}
                        onChange={(e) => handleInputChange(e, employee.id, 'position')}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        style={styles.input}
                        value={employee.branch}
                        onChange={(e) => handleInputChange(e, employee.id, 'branch')}
                      />
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
                      <button style={styles.button} onClick={() => setEditingId(null)}>
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={styles.td}>{employee.firstName}</td>
                    <td style={styles.td}>{employee.lastName}</td>
                    <td style={styles.td}>{employee.phone}</td>
                    <td style={styles.td}>{employee.nic}</td>
                    <td style={styles.td}>{employee.email}</td>
                    <td style={styles.td}>{employee.position}</td>
                    <td style={styles.td}>{employee.branch}</td>
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
                    value={newEmployee.firstName}
                    onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="text"
                    style={styles.input}
                    value={newEmployee.lastName}
                    onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
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
                  <input
                    type="text"
                    style={styles.input}
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                  />
                </td>
                <td style={styles.td}>
                  <input
                    type="text"
                    style={styles.input}
                    value={newEmployee.branch}
                    onChange={(e) => setNewEmployee({ ...newEmployee, branch: e.target.value })}
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
                  <button style={styles.button} onClick={handleSaveNewEmployee}>
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
>>>>>>> sasmitha
      </div>
    </Layout>
  );
};

<<<<<<< HEAD
export default TechnicianDashboard;
=======

export default ManageEmployees;
>>>>>>> sasmitha
