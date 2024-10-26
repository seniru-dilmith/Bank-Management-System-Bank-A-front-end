import React, { useState } from 'react';
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

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track editing row
  const [newEmployee, setNewEmployee] = useState(null); // Track new employee row
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [employeeToRemove, setEmployeeToRemove] = useState(null); // Track employee to remove

  // Fetch employees from the database
  /*useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees'); // Replace with your API endpoint
        setEmployees(response.data); // Assuming the data is in response.data
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);*/

  useEffect(() => {
    // Dummy data for now
    const fetchedEmployees = [
      { id: 1, firstName: 'John', lastName: 'Doe', phone: '123456789', nic: '123456789V', email: 'john@example.com', position: 'Technician', branch: 'NYC', username: 'johndoe' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '987654321', nic: '987654321V', email: 'jane@example.com', position: 'Manager', branch: 'LA', username: 'janesmith' },
    ];
    setEmployees(fetchedEmployees);

    // When using an actual API, you would replace this with an axios call:
    // axios.get('/api/employees')
    //   .then(response => setEmployees(response.data))
    //   .catch(error => console.error('Error fetching data', error));

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
      position: '',
      branch: '',
      username: '',
    });
  };

  const handleSaveNewEmployee = async () => {
    try {
      const response = await axios.post('/api/employees', newEmployee); // API call to add the new employee
      setEmployees([...employees, response.data]); // Add the new employee data from the response
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
      await axios.delete(`/api/employees/${employeeToRemove}`); // API call to remove the employee
      setEmployees(employees.filter((employee) => employee.id !== employeeToRemove));
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
                        value={tempEmployee.phone}
                        onChange={(e) => setTempEmployee({ ...tempEmployee, phone: e.target.value })}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        style={styles.input}
                        value={tempEmployee.nic}
                        onChange={(e) => setTempEmployee({ ...tempEmployee, nic: e.target.value })}
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
                        value={tempEmployee.username}
                        onChange={(e) => setTempEmployee({ ...tempEmployee, username: e.target.value })}
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
                {/* Same for other fields */}
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
      </div>
    </Layout>
  );
};

export default MManageEmployees;
