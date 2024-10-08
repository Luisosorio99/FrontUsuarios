import React, { useState } from 'react';
import axios from 'axios';

const UserSearch = () => {
  const [id, setId] = useState('');
  const [user, setUser] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/usuario/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error al buscar usuario', error);
    }
  };

  return (
    <div>
      <h2>Buscar Usuario</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Ingrese ID de usuario"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      {user && (
        <div>
          <h3>Detalles del Usuario</h3>
          <p>Nombre: {user.nombre}</p>
          <p>Apellido: {user.apellido}</p>
          <p>Email: {user.email}</p>
          <p>Teléfono: {user.telefono}</p>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
