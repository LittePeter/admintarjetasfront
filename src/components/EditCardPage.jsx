// src/components/EditCardPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../api/clienteApi.jsx';

export default function EditCardPage() {
    const { numeroTarjeta } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const cardData = location.state?.card;
    const clientId = location.state?.clientId;

    const [cupoTotal, setCupoTotal] = useState(cardData?.cupoTotal || '');

    useEffect(() => {
        if (!cardData || !clientId) {
            alert('Datos de tarjeta o cliente no disponibles');
            navigate(-1); // si no hay info, vuelve atrás
        }
    }, [cardData, clientId, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // DTO que enviaremos al backend
            const dto = {
                "numeroTarjeta": Number(numeroTarjeta),
                "cupoTotal": cupoTotal,
                "idCliente": clientId,
            };

            await api.put(`/card/update/${numeroTarjeta}`, dto);
            alert('Cupo actualizado correctamente');
            navigate(`/usuario/${clientId}`);
        } catch (err) {
            alert('Error al actualizar tarjeta: ' + (err.response?.data?.message || err.message));
        }
    };

    if (!cardData) return <p>Datos no disponibles...</p>;

    return (
        <div className="app" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Editar Tarjeta</h2>
            <p><strong>Número:</strong> {numeroTarjeta}</p>
            <p><strong>Franquicia:</strong> {cardData.franquicia}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Cupo Total:
                    <input
                        type="number"
                        step="0.01"
                        value={cupoTotal}
                        onChange={(e) => setCupoTotal(e.target.value)}
                        required
                        style={{ display: 'block', marginTop: '8px', padding: '8px', width: '100%' }}
                    />
                </label>

                <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                    <button type="submit" className="success">Guardar Cambios</button>
                    <button type="button" onClick={() => navigate(-1)}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
