// src/components/UserList.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/clienteApi.jsx';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/user/all')
            .then(res => setUsers(res.data))
            .catch(err => console.error('Error al cargar clientes:', err));
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Clientes Registrados</h1>
            <button onClick={() => navigate('/usuarios/nuevo')}>Crear Nuevo Usuario</button>
            <table style={{ marginTop: '1rem', borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.idCliente}>
                        <td>{user.idCliente}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <button onClick={() => {
                                console.log('Navegando a:', `/usuario${user.idCliente}`); // 👈 depura aquí
                                navigate(`/usuario/${user.idCliente}`);
                            }}>
                                Ver
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}