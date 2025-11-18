// src/components/CreateCardForm.jsx
import { useState } from 'react';

export default function CreateCardForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        numeroTarjeta: '',
        fechaVencimiento: '',
        cupoTotal: '',
        cupoUsado: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { numeroTarjeta, fechaVencimiento, cupoTotal, cupoUsado } = formData;

        if (!numeroTarjeta || !fechaVencimiento || !cupoTotal) {
            alert('Complete todos los campos requeridos');
            return;
        }

        if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(fechaVencimiento)) {
            alert('Formato de vencimiento inválido. Use MM/YYYY');
            return;
        }

        onSubmit({
            numeroTarjeta: Number(numeroTarjeta),
            fechaVencimiento,
            cupoTotal,
            cupoUsado: cupoUsado ? Number(cupoUsado) : 0,
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
            <h4>Añadir Nueva Tarjeta</h4>
            <input
                name="numeroTarjeta"
                type="number"
                placeholder="Número de tarjeta (15 o 16 dígitos)"
                value={formData.numeroTarjeta}
                onChange={handleChange}
                required
            />
            <input
                name="fechaVencimiento"
                placeholder="MM/YYYY"
                value={formData.fechaVencimiento}
                onChange={handleChange}
                pattern="(0[1-9]|1[0-2])\/\d{4}"
                title="Ej: 08/2028"
                required
            />
            <input
                name="cupoTotal"
                type="number"
                step="0.01"
                placeholder="Cupo total"
                value={formData.cupoTotal}
                onChange={handleChange}
                required
            />
            <input
                name="cupoUsado"
                type="number"
                step="0.01"
                placeholder="Cupo usado (opcional, por defecto 0)"
                value={formData.cupoUsado}
                onChange={handleChange}
            />
            <button type="submit">Nueva Tarjeta</button>
        </form>
    );
}