import React from 'react';
import { CarSideIcon, BalanceScaleIcon, GavelIcon } from './icons';
import './style.css';

const ServiciosPrincipal = () => {
    return (
        <section className="welcome-services" id="servicios">
            <div className="container">
                <h2 className="section-title">Nuestros Servicios</h2>
                <div className="services-grid">
                    <div className="service-card">
                        <div className="service-icon">
                            <CarSideIcon />
                        </div>
                        <div className="service-content">
                            <h3>Avalúo para Compra-Venta</h3>
                            <p>Determinamos el valor real de mercado de su vehículo para transacciones justas y seguras.</p>
                        </div>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">
                            <BalanceScaleIcon />
                        </div>
                        <div className="service-content">
                            <h3>Avalúo para Seguros</h3>
                            <p>Valoración técnica para cobertura de seguros y siniestros vehiculares.</p>
                        </div>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">
                            <GavelIcon />
                        </div>
                        <div className="service-content">
                            <h3>Avalúo para Trámites Legales</h3>
                            <p>Valoraciones con validez legal para procesos judiciales, herencias y divorcios.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default ServiciosPrincipal;