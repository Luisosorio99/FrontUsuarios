// UserSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserSearch = () => {
  const [id_usuario, setId] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/api/usuario/${id_usuario}`);
      if (response.data.usuario) {
        setUser(response.data.usuario);
        setErrorMessage('');
        toggleModal(); // Abrir el modal si el usuario se encontró
      } else {
        setUser(null);
        setErrorMessage('No se encontraron datos para el usuario especificado.');
      }
    } catch (error) {
      console.error('Error al buscar usuario:', error);
      setUser(null);
      setErrorMessage('Error al buscar usuario, asegúrese de que el ID sea correcto.');
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <div>
      <h2>Buscar Usuario</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Ingrese ID de usuario"
          value={id_usuario}
          onChange={(e) => setId(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Modal para mostrar los detalles del usuario */}
      <Modal isOpen={modalVisible} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Detalles del Usuario
        </ModalHeader>
        <ModalBody>
          {user ? (
            <div>
              <p><strong>Nombre:</strong> {user.nombre}</p>
              <p><strong>Apellido:</strong> {user.apellido}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Teléfono:</strong> {user.telefono}</p>
              <p><strong>Dirección:</strong> {user.direccion}</p>
              <p><strong>Fecha de Registro:</strong> {new Date(user.fecha_registro).toLocaleDateString()}</p>
              <p><strong>Estado:</strong> {user.estado}</p>
            </div>
          ) : (
            <p>No se encontraron datos para el usuario especificado.</p>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UserSearch;
