import { Wrench } from 'lucide-react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-[#f8fafc] dark:bg-[#0f1a23] transition-colors duration-500">
            {/* Background Pattern */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-100"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300AEEF' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            />

            {/* Decorative Floating Elements */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full border border-[#e2e8f0] dark:border-[#20384b] opacity-20 z-0 border-dashed animate-[spin_20s_linear_infinite]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full border border-[#e2e8f0] dark:border-[#20384b] opacity-20 z-0 border-dashed animate-[spin_25s_linear_infinite_reverse]" />

            {/* Main Container */}
            <div className="relative w-full max-w-5xl h-auto md:h-[600px] flex flex-col md:flex-row rounded-3xl overflow-hidden z-10 bg-white dark:bg-[#1a2c3a] border border-[#e2e8f0] dark:border-[#20384b] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] transition-colors duration-500">

                {/* Left Section: Visual / Branding */}
                <div className="hidden md:flex md:w-1/2 relative flex-col justify-between p-12 overflow-hidden bg-slate-900">
                    {/* Background Image with Overlay */}
                    <img
                        src="https://images.unsplash.com/photo-1486262715619-72a604e3d7a9?q=80&w=2070&auto=format&fit=crop"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                        alt="Motor mecánico"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0f1a23] to-transparent opacity-90 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-black/30" />

                    {/* Content over Image */}
                    <div className="relative z-10 animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0s]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-[#00AEEF] flex items-center justify-center text-white shadow-lg">
                                <Wrench className="w-6 h-6" />
                            </div>
                            <span className="text-white font-bold text-xl tracking-wide">MECÁNICA PRO</span>
                        </div>
                    </div>

                    <div className="relative z-10 animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.1s]">
                        <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                            Excelencia en <br />
                            <span className="text-[#00AEEF]">Avalúo Técnico</span>
                        </h2>
                        <p className="text-slate-300 text-lg max-w-sm">
                            Accede a la plataforma integral de diagnóstico y valoración vehicular de la carrera.
                        </p>
                    </div>

                    <div className="relative z-10 mt-auto text-slate-400 text-sm animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.2s]">
                        © 2024 Facultad de Mecánica Automotriz
                    </div>
                </div>

                {/* Right Section: Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative bg-white dark:bg-[#1a2c3a] transition-colors duration-500">
                    <div className="w-full max-w-md mx-auto">
                        <div className="mb-10 text-center md:text-left animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0">
                            <h1 className="text-3xl font-bold text-[#1e293b] dark:text-white/90 mb-2">{title}</h1>
                            <p className="text-[#64748b] dark:text-white/70">{description}</p>
                        </div>

                        {children}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
