import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

// Importar componentes de PaginaPrincipal
import HeaderPrincipal from './PaginaPrincipal/HeaderPrincipal';
import HeaderSeccionPrincipal from './PaginaPrincipal/HeaderSeccionPrincipal';
import ServiciosPrincipal from './PaginaPrincipal/ServiciosPrincipal';
import SectionVideo from './PaginaPrincipal/SectionVideo';
import FormularioContacto from './PaginaPrincipal/FormularioContacto';
import Footer from './PaginaPrincipal/Footer';

// Importar estilos específicos de la página de bienvenida
import './PaginaPrincipal/style.css';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    // Estado para el menú móvil
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

    // Toggle del menú móvil
    const handleMobileToggle = () => {
        setIsMobileMenuActive(!isMobileMenuActive);
    };

    // Scroll suave para navegación
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
                behavior: 'smooth'
            });
        }
        setIsMobileMenuActive(false);
    };

    return (
        <div className="welcome-page">
            <Head title="Bienvenido" />

            {/* Header con navegación */}
            <HeaderPrincipal
                isMobileMenuActive={isMobileMenuActive}
                onMobileToggle={handleMobileToggle}
                onNavLinkClick={handleSmoothScroll}
                isAuthenticated={!!auth.user}
            />

            {/* Hero Section */}
            <HeaderSeccionPrincipal
                onNavLinkClick={handleSmoothScroll}
            />

            {/* Servicios Section */}
            <ServiciosPrincipal />

            {/* Video Section */}
            <SectionVideo />

            {/* Formulario de Contacto */}
            <FormularioContacto />

            {/* Footer */}
            <Footer />
        </div>
    );
}
