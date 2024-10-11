// UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import UserForm from './UserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://apiusuarios-apxz.onrender.com/api/usuarios');
      setUsers(response.data.usuarios); // Accede a la propiedad 'usuarios' en la respuesta
    } catch (error) {
      console.error('Error al obtener los usuarios', error);
    }
  };

  const deleteUser = async (id_usuario) => {
    try {
      await axios.delete(`https://apiusuarios-apxz.onrender.com/api/usuario/eliminar/${id_usuario}`);
      alert('Usuario eliminado con éxito');
      fetchUsers(); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar usuario', error);
    }
  };

  const openEditModal = (user) => {
    setUserToEdit(user);
    setIsEditing(true);
    setModalVisible(true);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setUserToEdit(null);
    setIsEditing(false);
  };

  const handleUserChange = () => {
    fetchUsers(); // Refrescar la lista de usuarios después de actualizar
    toggleModal(); // Cerrar el modal
  };

  return (
    <div>
      <h3>Lista de Usuarios</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Fecha de Registro</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id_usuario}>
              <td>{user.id_usuario}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.email}</td>
              <td>{user.telefono}</td>
              <td>{user.direccion}</td>
              <td>{new Date(user.fecha_registro).toLocaleDateString()}</td>
              <td>{user.estado}</td>
              <td>
                <button onClick={() => openEditModal(user)} className="btn btn-warning mr-2">Actualizar</button>
                <button onClick={() => deleteUser(user.id_usuario)} className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para el formulario de usuario */}
      <Modal isOpen={modalVisible} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {isEditing ? 'Editar Usuario' : 'Crear Usuario'}
        </ModalHeader>
        <ModalBody>
          <UserForm isEditing={isEditing} userData={userToEdit} onUserChange={handleUserChange} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UserList;
