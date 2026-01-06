import { type ReactNode } from 'react';

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a]">
            {/* Header Público Simple */}
            <header className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-white/80 backdrop-blur-md dark:border-[#20384b] dark:bg-[#1a2c3a]/80">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        {/* Logo o Título */}
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] shadow-lg shadow-blue-500/25">
                            <svg
                                className="h-6 w-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-[#1e293b] dark:text-white">
                                Sistema de Avalúos
                            </h1>
                            <p className="text-xs text-[#64748b] dark:text-white/60">
                                Vista Pública
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>

            {/* Footer Público */}
            <footer className="border-t border-[#e2e8f0] bg-white/50 backdrop-blur-sm dark:border-[#20384b] dark:bg-[#1a2c3a]/50">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="text-sm text-[#64748b] dark:text-white/60">
                            © {new Date().getFullYear()} Sistema de Avalúos Vehiculares. Todos los derechos reservados.
                        </p>
                        <p className="text-xs text-[#94a3b8] dark:text-white/40">
                            Este documento es de carácter informativo
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
