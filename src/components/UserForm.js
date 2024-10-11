// UserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserForm = ({ isEditing, userData, onUserChange }) => {
  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    fecha_registro: '',
    estado: 'activo',
  });

  useEffect(() => {
    if (isEditing && userData) {
      setUser(userData);
    }
  }, [isEditing, userData]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseURL = 'https://apiusuarios-apxz.onrender.com/api/usuario';

      if (isEditing) {
        await axios.put(`${baseURL}/actualizar/${user.id_usuario}`, user);
        alert('Usuario actualizado con éxito');
      } else {
        await axios.post(`${baseURL}/crear`, user);
        alert('Usuario creado con éxito');
      }
      onUserChange(); // Notificar el cambio y cerrar el modal
    } catch (error) {
      console.error('Error al enviar los datos del usuario', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={user.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            name="apellido"
            value={user.apellido}
            onChange={handleChange}
            placeholder="Apellido"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            name="telefono"
            value={user.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            name="direccion"
            value={user.direccion}
            onChange={handleChange}
            placeholder="Dirección"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha_registro">Fecha de registro</label>
          <input
            type="date"
            className="form-control"
            id="fecha_registro"
            name="fecha_registro"
            value={user.fecha_registro}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <select
            className="form-control"
            id="estado"
            name="estado"
            value={user.estado}
            onChange={handleChange}
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="suspendido">Suspendido</option>
          </select>
        </div>
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
