import NewPasswordController from '@/actions/App/Http/Controllers/Auth/NewPasswordController';
import { Form, Head } from '@inertiajs/react';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    return (
        <AuthLayout
            title="Restablecer contraseña"
            description="Por favor ingresa tu nueva contraseña"
        >
            <Head title="Reset password" />

            <Form
                {...NewPasswordController.store.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors }) => (
                    <div className="grid gap-6">
                        {/* Email Input (Read-only) */}
                        <div className="relative animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.1s]">
                            <div className="relative">
                                <Mail className="absolute left-4 top-4 w-5 h-5 text-[#64748b] dark:text-white/70" />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    readOnly
                                    autoComplete="email"
                                    className="w-full px-4 pl-12 py-4 bg-[#f8fafc] dark:bg-[#0f1a23] border-2 border-[#e2e8f0] dark:border-[#20384b] rounded-xl outline-none text-[#1e293b] dark:text-white/90 cursor-not-allowed opacity-60"
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-3 top-[-0.6rem] text-xs text-[#64748b] dark:text-white/70 font-semibold bg-white dark:bg-[#1a2c3a] px-2"
                                >
                                    Correo Electrónico
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
                                    autoFocus
                                    autoComplete="new-password"
                                    placeholder=" "
                                    className="peer w-full px-4 pl-12 pr-12 py-4 bg-transparent border-2 border-[#e2e8f0] dark:border-[#20384b] rounded-xl outline-none text-[#1e293b] dark:text-white/90 transition-all duration-300 focus:border-[#00AEEF] focus:shadow-[0_0_0_4px_rgba(0,174,239,0.1)]"
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute left-12 top-4 text-[#64748b] dark:text-white/70 pointer-events-none transition-all duration-300 bg-white dark:bg-[#1a2c3a] px-2 peer-focus:top-[-0.6rem] peer-focus:left-3 peer-focus:text-xs peer-focus:text-[#00AEEF] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-[-0.6rem] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#00AEEF] peer-[:not(:placeholder-shown)]:font-semibold"
                                >
                                    Nueva Contraseña
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

                        {/* Password Confirmation Input */}
                        <div className="relative animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.3s]">
                            <div className="relative">
                                <Lock className="absolute left-4 top-4 w-5 h-5 text-[#64748b] dark:text-white/70 transition-colors peer-focus:text-[#00AEEF]" />
                                <input
                                    id="password_confirmation"
                                    type={showPasswordConfirmation ? 'text' : 'password'}
                                    name="password_confirmation"
                                    required
                                    autoComplete="new-password"
                                    placeholder=" "
                                    className="peer w-full px-4 pl-12 pr-12 py-4 bg-transparent border-2 border-[#e2e8f0] dark:border-[#20384b] rounded-xl outline-none text-[#1e293b] dark:text-white/90 transition-all duration-300 focus:border-[#00AEEF] focus:shadow-[0_0_0_4px_rgba(0,174,239,0.1)]"
                                />
                                <label
                                    htmlFor="password_confirmation"
                                    className="absolute left-12 top-4 text-[#64748b] dark:text-white/70 pointer-events-none transition-all duration-300 bg-white dark:bg-[#1a2c3a] px-2 peer-focus:top-[-0.6rem] peer-focus:left-3 peer-focus:text-xs peer-focus:text-[#00AEEF] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-[-0.6rem] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#00AEEF] peer-[:not(:placeholder-shown)]:font-semibold"
                                >
                                    Confirmar Contraseña
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                    className="absolute right-4 top-4 text-[#64748b] dark:text-white/70 hover:text-[#00AEEF] transition-colors"
                                >
                                    {showPasswordConfirmation ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="mt-4 w-full bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_-10px_rgba(0,174,239,0.6)] active:translate-y-0 animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.4s]"
                            disabled={processing}
                            data-test="reset-password-button"
                        >
                            {processing && <Spinner />}
                            <span>Restablecer Contraseña</span>
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </div>
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
