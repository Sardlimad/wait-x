"use client"
import React, { useState } from 'react';

const UsuariosForm = () => {
    const [formData, setFormData] = useState({
        usuario: '',
        contraseña: '',
        correo: '',
        nombre: '',
        apellidos: '',
        activo: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-3">
                <label className="form-label">Usuario:</label>
                <input
                    type="text"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Contraseña:</label>
                <input
                    type="password"
                    name="contraseña"
                    value={formData.contraseña}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Correo:</label>
                <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Apellidos:</label>
                <input
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3 form-check">
                <input
                    type="checkbox"
                    name="activo"
                    checked={formData.activo}
                    onChange={handleChange}
                    className="form-check-input"
                    id="activoCheck"
                />
                <label className="form-check-label" htmlFor="activoCheck">
                    Activo
                </label>
            </div>

            <button type="submit" className="btn btn-primary">
                Guardar
            </button>
        </form>
    );
};

export default UsuariosForm;