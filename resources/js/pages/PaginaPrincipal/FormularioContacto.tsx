import React, { useState, FormEvent } from 'react';
import './style.css';

const FormularioContacto: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        vehicle: '',
        purpose: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        alert(`¡Gracias ${formData.name}! Hemos recibido su solicitud de avalúo para su ${formData.vehicle}. Nos pondremos en contacto en las próximas 24 horas.`);

        setFormData({
            name: '',
            email: '',
            phone: '',
            vehicle: '',
            purpose: ''
        });
    };

    return (
        <section className="welcome-contact" id="contacto">
            <div className="container">
                <h2 className="section-title" style={{ color: 'white' }}>Solicitar Avalúo</h2>
                <p style={{
                    textAlign: 'center',
                    maxWidth: '700px',
                    margin: '0 auto 3rem',
                    color: '#ddd'
                }}>
                    Complete el formulario y nos pondremos en contacto para coordinar
                    la evaluación de su vehículo.
                </p>

                <div className="contact-form">
                    <form id="valuationForm" onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nombre completo</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Correo electrónico</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Teléfono</label>
                            <input
                                type="tel"
                                id="phone"
                                className="form-control"
                                required
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="vehicle">Vehículo (Marca, Modelo, Año)</label>
                            <input
                                type="text"
                                id="vehicle"
                                className="form-control"
                                required
                                value={formData.vehicle}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="purpose">Propósito del avalúo</label>
                            <select
                                id="purpose"
                                className="form-control"
                                required
                                value={formData.purpose}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Seleccione una opción</option>
                                <option value="compra-venta">Compra-Venta</option>
                                <option value="seguro">Seguro</option>
                                <option value="legal">Trámite Legal</option>
                                <option value="otros">Otros</option>
                            </select>
                        </div>

                        <button type="submit" className="submit-btn">Solicitar Avalúo</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default FormularioContacto;