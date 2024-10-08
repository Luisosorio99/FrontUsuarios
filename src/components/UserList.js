import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {

    const [users, setUsers] = useState([]);


    useEffect(() => {
        axios.get('api/usuarios')
        .then(response => setUsers(response.data))
        .catch(error => console.error('Error al obtener los usuarios', error));
    }, []);

const deleteUser = async (id) => {
    try {
        await axios.delete('api/usuario/eliminar/${id}');
        alert('Usuarios eliminado con exitos');
        setUsers(users.filter(user => user.id !== id));
    } catch (error) {
        console.error('Error al eliminar usuarios', error);
    }

 }

return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.nombre} {user.apellido} - {user.email}
            <button onClick={() => deleteUser(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;