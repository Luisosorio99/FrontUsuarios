// App.js
import React, { useState } from 'react';
import './App.css';
import UserForm from './components/UserForm';
import UserSearch from './components/UserSearch';
import UserList from './components/UserList';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [id_usuario, setSearchIdUsuario] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setIsEditing(false);
    setUserToEdit(null);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/usuario/${id_usuario}`);
      if (response.data.usuario) {
        setSearchedUser(response.data.usuario);
        setErrorMessage('');
      } else {
        setSearchedUser(null);
        setErrorMessage('No se encontraron datos para el usuario especificado.');
      }
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      setSearchedUser(null);
      setErrorMessage('Error al buscar el usuario, asegúrese de que el ID sea correcto.');
    }
  };

  const openEditModal = (user) => {
    setUserToEdit(user);
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleUserChange = () => {
    toggleModal(); // Cerrar el modal después de crear o actualizar
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión de Usuarios</h1>
        <div className="search-section">
          <h3>Buscar Usuario</h3>
          <input
            type="text"
            placeholder="Ingrese ID de usuario"
            value={id_usuario}
            onChange={(e) => setSearchIdUsuario(e.target.value)}
          />
          <button onClick={handleSearch} className="btn btn-primary">Buscar</button>
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <div className="user-details mt-4">
          <h3>Detalles del Usuario</h3>
          {searchedUser ? (
            <div>
              <p><strong>Nombre:</strong> {searchedUser.nombre}</p>
              <p><strong>Apellido:</strong> {searchedUser.apellido}</p>
              <p><strong>Email:</strong> {searchedUser.email}</p>
              <p><strong>Teléfono:</strong> {searchedUser.telefono}</p>
              <p><strong>Dirección:</strong> {searchedUser.direccion}</p>
              <p><strong>Fecha de Registro:</strong> {new Date(searchedUser.fecha_registro).toLocaleDateString()}</p>
              <p><strong>Estado:</strong> {searchedUser.estado}</p>
            </div>
          ) : (
            <p>No se encontraron datos para el usuario especificado.</p>
          )}
        </div>
        <button className="btn btn-success mt-3" onClick={toggleModal}>
          Crear Usuario
        </button>

        {/* Modal para el formulario de usuario */}
        <Modal isOpen={modalVisible} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            {isEditing ? 'Editar Usuario' : 'Crear Usuario'}
          </ModalHeader>
          <ModalBody>
            <UserForm isEditing={isEditing} userData={userToEdit} onUserChange={handleUserChange} />
          </ModalBody>
        </Modal>

        {/* Lista de usuarios */}
        <UserList openEditModal={openEditModal} />
      </header>
    </div>
  );
}

export default App;
