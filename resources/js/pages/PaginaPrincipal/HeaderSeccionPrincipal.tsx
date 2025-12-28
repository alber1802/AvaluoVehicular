import React from 'react';
import './style.css';

interface HeaderSeccionPrincipalProps {
    onNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const HeaderSeccionPrincipal: React.FC<HeaderSeccionPrincipalProps> = ({ onNavLinkClick }) => {
    return (
        <section className="welcome-hero" id="inicio">
            <div className="container">
                <h1>Avalúos Vehiculares Profesionales</h1>
                <p>
                    Servicio especializado de la Universidad Mayor de San Andrés para la
                    valoración precisa de vehículos. Confiabilidad, precisión y respaldo académico.
                </p>
                <a
                    href="#contacto"
                    className="hero-btn"
                    onClick={(e) => onNavLinkClick(e, '#contacto')}
                >
                    Solicitar Avalúo
                </a>
            </div>
        </section>
    );
};

export default HeaderSeccionPrincipal;
