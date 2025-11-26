import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { ArrowRight, Eye, EyeOff, Lock, User } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthLayout
            title="Bienvenido"
            description="Ingresa tus credenciales para acceder al sistema."
        >
            <Head title="Log in" />

            <Form
                {...AuthenticatedSessionController.store.form()}
                resetOnSuccess={['password']}
                className="space-y-6"
            >
                {({ processing, errors }) => (
                    <>
                        {/* Email Input */}
                        <div className="relative animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.1s]">
                            <div className="relative">
                                <User className="absolute left-4 top-4 w-5 h-5 text-[#64748b] dark:text-white/70 transition-colors peer-focus:text-[#00AEEF]" />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
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

                        {/* Password Input */}
                        <div className="relative animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.2s]">
                            <div className="relative">
                                <Lock className="absolute left-4 top-4 w-5 h-5 text-[#64748b] dark:text-white/70 transition-colors peer-focus:text-[#00AEEF]" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder=" "
                                    className="peer w-full px-4 pl-12 pr-12 py-4 bg-transparent border-2 border-[#e2e8f0] dark:border-[#20384b] rounded-xl outline-none text-[#1e293b] dark:text-white/90 transition-all duration-300 focus:border-[#00AEEF] focus:shadow-[0_0_0_4px_rgba(0,174,239,0.1)]"
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute left-12 top-4 text-[#64748b] dark:text-white/70 pointer-events-none transition-all duration-300 bg-white dark:bg-[#1a2c3a] px-2 peer-focus:top-[-0.6rem] peer-focus:left-3 peer-focus:text-xs peer-focus:text-[#00AEEF] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-[-0.6rem] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#00AEEF] peer-[:not(:placeholder-shown)]:font-semibold"
                                >
                                    Contraseña
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-4 text-[#64748b] dark:text-white/70 hover:text-[#00AEEF] transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Remember / Forgot Password */}
                        <div className="flex items-center justify-between text-sm animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.2s]">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="w-4 h-4 rounded border-gray-300 text-[#00AEEF] focus:ring-[#00AEEF]"
                                />
                                <span className="text-[#64748b] dark:text-white/70">Recordarme</span>
                            </label>
                            {canResetPassword && (
                                <TextLink
                                    href={request()}
                                    className="text-[#00AEEF] hover:underline font-medium"
                                    tabIndex={5}
                                >
                                    ¿Olvidaste tu contraseña?
                                </TextLink>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_-10px_rgba(0,174,239,0.6)] active:translate-y-0 animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.3s]"
                            tabIndex={4}
                            disabled={processing}
                            data-test="login-button"
                        >
                            {processing && <Spinner />}
                            <span>Iniciar Sesión</span>
                            <ArrowRight className="w-5 h-5" />
                        </Button>

                        {/* Footer */}
                        <p className="text-center text-sm text-[#64748b] dark:text-white/70 mt-8 animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.3s]">
                            ¿No tienes cuenta?{' '}
                            <a href="#" className="text-[#00AEEF] font-bold hover:underline">
                                Contactar Admin
                            </a>
                        </p>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

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
