import React from 'react';
import {
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    LinkedInIcon,
    MapMarkerIcon,
    PhoneIcon,
    EnvelopeIcon
} from './icons';
import './style.css';

const Footer = () => {
    return (
        <footer className="welcome-footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Avalúos Vehiculares UMSA</h3>
                        <p>Servicio especializado de la Universidad Mayor de San Andrés con más de 15 años de experiencia en valoración vehicular.</p>
                        <div className="social-icons">
                            <a href="#"><FacebookIcon /></a>
                            <a href="#"><TwitterIcon /></a>
                            <a href="#"><InstagramIcon /></a>
                            <a href="#"><LinkedInIcon /></a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h3>Contacto</h3>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <MapMarkerIcon /> Av. Villazón, Monoblock Central UMSA
                        </p>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <PhoneIcon /> (591) 2-244-1555
                        </p>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <EnvelopeIcon /> avalios@umsa.bo
                        </p>
                    </div>

                    <div className="footer-section">
                        <h3>Horarios</h3>
                        <p>Lunes a Viernes: 8:00 - 18:00</p>
                        <p>Sábados: 9:00 - 13:00</p>
                        <p>Domingos: Cerrado</p>
                    </div>
                </div>

                <div className="copyright">
                    <p>© 2023 Avalúos Vehiculares UMSA. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>

    );
};

export default Footer;