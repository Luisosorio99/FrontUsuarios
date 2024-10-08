import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ isEditing, userData }) => {
  const [user, setUser] = useState(userData || {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    fecha_registro: '',
    estado: 'activo'
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/usuario/actualizar/${user.id}`, user);
        alert('Usuario actualizado con éxito');
      } else {
        await axios.post('/api/usuario/crear', user);
        alert('Usuario creado con éxito');
      }
    } catch (error) {
      console.error('Error al enviar los datos del usuario', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isEditing ? 'Editar Usuario' : 'Crear Usuario'}</h2>
      <form onSubmit={handleSubmit}>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td><label htmlFor="nombre" className="form-label">Nombre</label></td>
              <td>
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
              </td>
            </tr>
            <tr>
              <td><label htmlFor="apellido" className="form-label">Apellido</label></td>
              <td>
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
              </td>
            </tr>
            <tr>
              <td><label htmlFor="email" className="form-label">Email</label></td>
              <td>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="telefono" className="form-label">Teléfono</label></td>
              <td>
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
              </td>
            </tr>
            <tr>
              <td><label htmlFor="direccion" className="form-label">Dirección</label></td>
              <td>
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
              </td>
            </tr>
            <tr>
              <td><label htmlFor="fecha_registro" className="form-label">Fecha de Registro</label></td>
              <td>
                <input
                  type="date"
                  className="form-control"
                  id="fecha_registro"
                  name="fecha_registro"
                  value={user.fecha_registro}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="estado" className="form-label">Estado</label></td>
              <td>
                <select
                  className="form-select"
                  id="estado"
                  name="estado"
                  value={user.estado}
                  onChange={handleChange}
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="suspendido">Suspendido</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
