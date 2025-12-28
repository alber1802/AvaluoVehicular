import React from 'react';
import { Link } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { CarIcon, BarsIcon, TimesIcon } from './icons';
import './style.css';

interface HeaderPrincipalProps {
    isMobileMenuActive: boolean;
    onMobileToggle: () => void;
    onNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
    isAuthenticated: boolean;
}

const HeaderPrincipal: React.FC<HeaderPrincipalProps> = ({
    isMobileMenuActive,
    onMobileToggle,
    onNavLinkClick,
    isAuthenticated
}) => {
    return (
        <header className="welcome-header">
            <div className="container header-container">
                <a href="#" className="logo">
                    <CarIcon style={{ color: 'var(--light-blue)', fontSize: '2.2rem' }} />
                    Avalúos<span>UMSA</span>
                </a>

                <div
                    className="mobile-toggle"
                    id="mobileToggle"
                    onClick={onMobileToggle}
                >
                    {isMobileMenuActive ? (
                        <TimesIcon style={{ fontSize: '1.5rem' }} />
                    ) : (
                        <BarsIcon style={{ fontSize: '1.5rem' }} />
                    )}
                </div>

                <nav id="mainNav" className={isMobileMenuActive ? "active" : ""}>
                    <ul>
                        <li>
                            <a
                                href="#inicio"
                                onClick={(e) => onNavLinkClick(e, '#inicio')}
                            >
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a
                                href="#servicios"
                                onClick={(e) => onNavLinkClick(e, '#servicios')}
                            >
                                Servicios
                            </a>
                        </li>
                        <li>
                            <a
                                href="#video"
                                onClick={(e) => onNavLinkClick(e, '#video')}
                            >
                                Video
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contacto"
                                onClick={(e) => onNavLinkClick(e, '#contacto')}
                            >
                                Contacto
                            </a>
                        </li>
                        <li>
                            {isAuthenticated ? (
                                <Link
                                    href={dashboard()}
                                    style={{
                                        background: 'linear-gradient(to right, var(--primary-blue), var(--light-blue))',
                                        padding: '0.5rem 1.5rem',
                                        borderRadius: '50px',
                                        color: 'white'
                                    }}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={login()}
                                    style={{
                                        background: 'linear-gradient(to right, var(--primary-blue), var(--light-blue))',
                                        padding: '0.5rem 1.5rem',
                                        borderRadius: '50px',
                                        color: 'white'
                                    }}
                                >
                                    Iniciar Sesión
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default HeaderPrincipal;
