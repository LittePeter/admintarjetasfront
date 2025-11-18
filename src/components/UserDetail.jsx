// src/components/UserDetail.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/clienteApi.jsx';
import UpdateCardForm from './UpdateCardForm';

export default function UserDetail() {
    const { idParam } = useParams();
    const idCliente = Number(idParam);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        if (isNaN(idCliente)) return; // evita llamadas con NaN

        const loadData = async () => {
            try {
                const [userRes, cardsRes] = await Promise.all([
                    api.get(`/user/${idCliente}`),
                    api.get(`/card/${idCliente}`)
                ]);
                setUser(userRes.data);
                setCards(cardsRes.data);
            } catch (err) {
                console.error('Error al cargar datos:', err);
            }
        };

        loadData();
    }, [idCliente]);

    const handleAddCard = async (cardData) => {
        try {
            const res = await api.post('/card', {
                numeroTarjeta: Number(cardData.numeroTarjeta),
                fechaVencimiento: cardData.fechaVencimiento,
                cupoTotal: parseFloat(cardData.cupoTotal),
                cupoUsado: parseFloat(cardData.cupoUsado) || 0,
                idCliente: idCliente,
            });
            setCards(prev => [...prev, res.data]);
        } catch (err) {
            alert('Error al crear tarjeta: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleDeleteCard = async (numeroTarjeta) => {
        if (!window.confirm('¿Está seguro de eliminar (inactivar) esta tarjeta?')) return;
        try {
            await api.delete(`/card/${numeroTarjeta}`);
            setCards(prev =>
                prev.map(c =>
                    c.numeroTarjeta === numeroTarjeta ? { ...c, estadoTarjeta: 'INACTIVO' } : c
                )
            );
        } catch (err) {
            alert('Error al eliminar tarjeta: ' + (err.response?.data?.message || err.message));
        }
    };

    if (!user) return <p>Cargando...</p>;

    return (
        <div className="app">
            <h2>Cliente: {user.name}</h2>
            <p><strong>Correo:</strong> {user.email}</p>

            {/* Botón de volver seguro: usa ruta absoluta */}
            <button onClick={() => navigate(`/`)} className="primary">← Volver</button>

            <h3>Tarjetas</h3>
            <UpdateCardForm clientId={idCliente} onAddCard={handleAddCard} />

            <table>
                <thead>
                <tr>
                    <th>Número</th>
                    <th>Franquicia</th>
                    <th>Vencimiento</th>
                    <th>Cupo Total</th>
                    <th>Usado</th>
                    <th>Disp.</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {cards.map(card => (
                    <tr key={card.numeroTarjeta}>
                        <td>{card.numeroTarjeta}</td>
                        <td>{card.franquicia || '-'}</td>
                        <td>{card.fechaVencimiento}</td>
                        <td>{card.cupoTotal}</td>
                        <td>{card.cupoUsado}</td>
                        <td>{card.cupoDisponible ?? 0}</td>
                        <td>
                <span style={{ color: card.estadoTarjeta === 'ACTIVO' ? 'green' : 'red' }}>
                  {card.estadoTarjeta}
                </span>
                        </td>
                        <td>
                            <button
                                onClick={() => navigate(`/tarjetas/${card.numeroTarjeta}/editar`, {
                                    state: { card, clientId: idCliente }
                                })}
                                className="success"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDeleteCard(card.numeroTarjeta)}
                                className="danger"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
