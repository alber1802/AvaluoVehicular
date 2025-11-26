// Components
import EmailVerificationNotificationController from '@/actions/App/Http/Controllers/Auth/EmailVerificationNotificationController';
import { logout } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { ArrowRight, Mail } from 'lucide-react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Verificar correo electrónico"
            description="Por favor verifica tu dirección de correo haciendo clic en el enlace que te enviamos."
        >
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800 animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0">
                    <Mail className="w-5 h-5 inline-block mr-2" />
                    Un nuevo enlace de verificación ha sido enviado a tu correo electrónico.
                </div>
            )}

            <Form
                {...EmailVerificationNotificationController.store.form()}
                className="space-y-6 text-center"
            >
                {({ processing }) => (
                    <>
                        <div className="bg-[#00AEEF]/10 border border-[#00AEEF]/20 rounded-lg p-6 animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.1s]">
                            <Mail className="w-12 h-12 text-[#00AEEF] mx-auto mb-3" />
                            <p className="text-sm text-[#64748b] dark:text-white/70">
                                Revisa tu bandeja de entrada y haz clic en el enlace de verificación.
                            </p>
                        </div>

                        <Button
                            disabled={processing}
                            className="w-full bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_-10px_rgba(0,174,239,0.6)] active:translate-y-0 animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.2s]"
                        >
                            {processing && <Spinner />}
                            <span>Reenviar correo de verificación</span>
                            <ArrowRight className="w-5 h-5" />
                        </Button>

                        <TextLink
                            href={logout()}
                            className="mx-auto block text-sm text-[#00AEEF] hover:underline font-medium animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.3s]"
                        >
                            Cerrar sesión
                        </TextLink>
                    </>
                )}
            </Form>

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
