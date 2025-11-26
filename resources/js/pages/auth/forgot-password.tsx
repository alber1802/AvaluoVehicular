// Components
import PasswordResetLinkController from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { ArrowRight, Mail } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="¿Olvidaste tu contraseña?"
            description="Ingresa tu correo para recibir un enlace de recuperación"
        >
            <Head title="Forgot password" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <Form {...PasswordResetLinkController.store.form()}>
                    {({ processing, errors }) => (
                        <>
                            {/* Email Input */}
                            <div className="relative animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.1s]">
                                <div className="relative">
                                    <Mail className="absolute left-4 top-4 w-5 h-5 text-[#64748b] dark:text-white/70 transition-colors peer-focus:text-[#00AEEF]" />
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        autoComplete="off"
                                        placeholder=" "
                                        className="peer w-full px-4 pl-12 py-4 bg-transparent border-2 border-[#e2e8f0] dark:border-[#20384b] rounded-xl outline-none text-[#1e293b] dark:text-white/90 transition-all duration-300 focus:border-[#00AEEF] focus:shadow-[0_0_0_4px_rgba(0,174,239,0.1)]"
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute left-12 top-4 text-[#64748b] dark:text-white/70 pointer-events-none transition-all duration-300 bg-white dark:bg-[#1a2c3a] px-2 peer-focus:top-[-0.6rem] peer-focus:left-3 peer-focus:text-xs peer-focus:text-[#00AEEF] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-[-0.6rem] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#00AEEF] peer-[:not(:placeholder-shown)]:font-semibold"
                                    >
                                        Correo Institucional
                                    </label>
                                </div>
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            {/* Submit Button */}
                            <div className="my-6 animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.2s]">
                                <Button
                                    className="w-full bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_-10px_rgba(0,174,239,0.6)] active:translate-y-0"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && (
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                                    )}
                                    <span>Enviar enlace de recuperación</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="text-center text-sm text-[#64748b] dark:text-white/70 animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.3s]">
                    <span>O, regresar a </span>
                    <TextLink href={login()} className="text-[#00AEEF] font-bold hover:underline">
                        iniciar sesión
                    </TextLink>
                </div>
            </div>

            <style>{`
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
        </AuthLayout>
    );
}
