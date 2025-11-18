import { useState } from 'react';

export default function UpdateCardForm({onAddCard }) {
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [cupoTotal, setCupoTotal] = useState('');
    const [cupoUsado, setCupoUsado] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // 🚨 evita que el navegador recargue
        if (!numeroTarjeta || !fechaVencimiento || !cupoTotal) return;

        await onAddCard({
            numeroTarjeta,
            fechaVencimiento,
            cupoTotal,
            cupoUsado,
        });
        setNumeroTarjeta('');
        setFechaVencimiento('');
        setCupoTotal('');
        setCupoUsado('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
            <label>
                Número Tarjeta:
                <input
                    type="number"
                    value={numeroTarjeta}
                    onChange={(e) => setNumeroTarjeta(e.target.value)}
                    required
                />
            </label>
            <label>
                Fecha Vencimiento:
                <input
                    type="text"
                    placeholder="MM/AAAA"
                    value={fechaVencimiento}
                    onChange={(e) => setFechaVencimiento(e.target.value)}
                    required
                />
            </label>
            <label>
                Cupo Total:
                <input
                    type="number"
                    step="0.01"
                    value={cupoTotal}
                    onChange={(e) => setCupoTotal(e.target.value)}
                    required
                />
            </label>
            <label>
                Cupo Usado:
                <input
                    type="number"
                    step="0.01"
                    value={cupoUsado}
                    onChange={(e) => setCupoUsado(e.target.value)}
                />
            </label>
            <button type="submit" className="primary">Añadir Tarjeta</button>
        </form>
    );
}