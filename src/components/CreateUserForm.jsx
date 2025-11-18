// src/components/CreateUserForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/clienteApi.jsx';

export default function CreateUserForm() {
    const [formData, setFormData] = useState({
        idCliente: '',
        name: '',
        email: '',
        numeroTarjeta: '',
        fechaVencimiento: '',
        cupoTotal: '',
        cupoUsado: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Petición única con todos los datos
            await api.post('/user/create', {
                idCliente: Number(formData.idCliente),
                name: formData.name,
                email: formData.email,
                numeroTarjeta: formData.numeroTarjeta,
                fechaVencimiento: formData.fechaVencimiento,
                cupoTotal: parseFloat(formData.cupoTotal),
                cupoUsado: parseFloat(formData.cupoUsado) || 0,
            });

            alert('Usuario y tarjeta creados correctamente');
            navigate('/'); // vuelve al listado de usuarios
        } catch (err) {
            alert(
                'Error al crear usuario y tarjeta: ' +
                (err.response?.data?.message || err.message)
            );
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
            <h2>Crear Nuevo Cliente con Tarjeta</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px' }}>
                <input
                    name="idCliente"
                    type="number"
                    placeholder="ID (número)"
                    required
                    onChange={handleChange}
                />
                <input
                    name="name"
                    placeholder="Nombre completo"
                    required
                    onChange={handleChange}
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Correo"
                    required
                    onChange={handleChange}
                />

                <h3>Datos de la Tarjeta</h3>
                <input
                    name="numeroTarjeta"
                    type="text"
                    placeholder="Número de tarjeta"
                    required
                    onChange={handleChange}
                />
                <input
                    name="fechaVencimiento"
                    type="text"
                    placeholder="MM/AAAA"
                    required
                    onChange={handleChange}
                />
                <input
                    name="cupoTotal"
                    type="number"
                    step="0.01"
                    placeholder="Cupo total"
                    required
                    onChange={handleChange}
                />
                <input
                    name="cupoUsado"
                    type="number"
                    step="0.01"
                    placeholder="Cupo usado (opcional)"
                    onChange={handleChange}
                />

                <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="submit" className="primary">
                        Registrar Cliente y Tarjeta
                    </button>
                    <button type="button" onClick={() => navigate(-1)}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
