import React, { useState } from 'react';
import ManagerNaviBar from '../components/NaviBar/ManagerNaviBar';
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



const MManageEmployees = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      phone: '123-456-7890',
      nic: '123456789V',
      email: 'john.doe@example.com',
      position_id: '1',
      position: 'Manager',
      branch: 'Main',
      username: 'johndoe',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '987-654-3210',
      nic: '987654321V',
      email: 'jane.smith@example.com',
      position_id: '2',
      position: 'Developer',
      branch: 'West',
      username: 'janesmith',
    },
  ]);
  
  const [editingId, setEditingId] = useState(null);
  const [newEmployee, setNewEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [employeeToRemove, setEmployeeToRemove] = useState(null);
  const [tempEmployee, setTempEmployee] = useState(null);

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
      position_id: '',
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
    setEmployeeToRemove(id);
  };

  const handleRemoveEmployee = () => {
    setEmployees(employees.filter((employee) => employee.id !== employeeToRemove));
    setShowModal(false);
    setEmployeeToRemove(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTempEmployee(null);
  };

  const handleEditEmployee = (employee) => {
    setEditingId(employee.id);
    setTempEmployee({ ...employee });
  };

  const handleSaveEditEmployee = () => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) => (employee.id === editingId ? tempEmployee : employee))
    );
    setEditingId(null);
    setTempEmployee(null);
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
                        value={tempEmployee.firstName}
                        onChange={(e) => setTempEmployee({ ...tempEmployee, firstName: e.target.value })}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        style={styles.input}
                        value={tempEmployee.lastName}
                        onChange={(e) => setTempEmployee({ ...tempEmployee, lastName: e.target.value })}
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
                        value={tempEmployee.email}
                        onChange={(e) => setTempEmployee({ ...tempEmployee, email: e.target.value })}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        style={styles.input}
                        value={tempEmployee.position}
                        onChange={(e) => setTempEmployee({ ...tempEmployee, position: e.target.value })}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        style={styles.input}
                        value={tempEmployee.branch}
                        onChange={(e) => setTempEmployee({ ...tempEmployee, branch: e.target.value })}
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
                      <button style={styles.button} onClick={handleSaveEditEmployee}>
                        Save
                      </button>
                      <button style={styles.button} onClick={handleCancelEdit}>
                        Cancel
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
                      <button style={styles.button} onClick={() => handleEditEmployee(employee)}>
                        Update
                      </button>
                      <button style={styles.button} onClick={() => confirmRemoveEmployee(employee.id)}>
                        Remove
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
                  <button style={styles.button} onClick={() => setNewEmployee(null)}>
                    Cancel
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Confirm Removal</h2>
            <p>Are you sure you want to remove this employee?</p>
            <button style={styles.button} onClick={handleRemoveEmployee}>
              Yes
            </button>
            <button style={styles.button} onClick={() => setShowModal(false)}>
              No
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MManageEmployees;
