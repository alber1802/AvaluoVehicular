import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/two-factor/login';
import { Form, Head } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { ArrowRight, Key, Shield } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    const authConfigContent = useMemo<{
        title: string;
        description: string;
        toggleText: string;
    }>(() => {
        if (showRecoveryInput) {
            return {
                title: 'Código de Recuperación',
                description:
                    'Por favor confirma el acceso a tu cuenta ingresando uno de tus códigos de recuperación de emergencia.',
                toggleText: 'iniciar sesión usando un código de autenticación',
            };
        }

        return {
            title: 'Código de Autenticación',
            description:
                'Ingresa el código de autenticación proporcionado por tu aplicación de autenticación.',
            toggleText: 'iniciar sesión usando un código de recuperación',
        };
    }, [showRecoveryInput]);

    const toggleRecoveryMode = (clearErrors: () => void): void => {
        setShowRecoveryInput(!showRecoveryInput);
        clearErrors();
        setCode('');
    };

    return (
        <AuthLayout
            title={authConfigContent.title}
            description={authConfigContent.description}
        >
            <Head title="Two-Factor Authentication" />

            <div className="space-y-6">
                <Form
                    {...store.form()}
                    className="space-y-4"
                    resetOnError
                    resetOnSuccess={!showRecoveryInput}
                >
                    {({ errors, processing, clearErrors }) => (
                        <>
                            {showRecoveryInput ? (
                                <div className="animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.1s]">
                                    <div className="relative">
                                        <Key className="absolute left-4 top-4 w-5 h-5 text-[#64748b] dark:text-white/70 transition-colors peer-focus:text-[#00AEEF]" />
                                        <input
                                            name="recovery_code"
                                            type="text"
                                            placeholder=" "
                                            autoFocus={showRecoveryInput}
                                            required
                                            className="peer w-full px-4 pl-12 py-4 bg-transparent border-2 border-[#e2e8f0] dark:border-[#20384b] rounded-xl outline-none text-[#1e293b] dark:text-white/90 transition-all duration-300 focus:border-[#00AEEF] focus:shadow-[0_0_0_4px_rgba(0,174,239,0.1)]"
                                        />
                                        <label
                                            htmlFor="recovery_code"
                                            className="absolute left-12 top-4 text-[#64748b] dark:text-white/70 pointer-events-none transition-all duration-300 bg-white dark:bg-[#1a2c3a] px-2 peer-focus:top-[-0.6rem] peer-focus:left-3 peer-focus:text-xs peer-focus:text-[#00AEEF] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-[-0.6rem] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#00AEEF] peer-[:not(:placeholder-shown)]:font-semibold"
                                        >
                                            Código de Recuperación
                                        </label>
                                    </div>
                                    <InputError
                                        message={errors.recovery_code}
                                        className="mt-2"
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-3 text-center animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.1s]">
                                    <div className="bg-[#00AEEF]/10 border border-[#00AEEF]/20 rounded-lg p-6 w-full">
                                        <Shield className="w-12 h-12 text-[#00AEEF] mx-auto mb-4" />
                                        <div className="flex w-full items-center justify-center">
                                            <InputOTP
                                                name="code"
                                                maxLength={OTP_MAX_LENGTH}
                                                value={code}
                                                onChange={(value) => setCode(value)}
                                                disabled={processing}
                                                pattern={REGEXP_ONLY_DIGITS}
                                            >
                                                <InputOTPGroup>
                                                    {Array.from(
                                                        { length: OTP_MAX_LENGTH },
                                                        (_, index) => (
                                                            <InputOTPSlot
                                                                key={index}
                                                                index={index}
                                                            />
                                                        ),
                                                    )}
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </div>
                                    </div>
                                    <InputError message={errors.code} />
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_-10px_rgba(0,174,239,0.6)] active:translate-y-0 animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.2s]"
                                disabled={processing}
                            >
                                {processing && (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                                )}
                                <span>Continuar</span>
                                <ArrowRight className="w-5 h-5" />
                            </Button>

                            <div className="text-center text-sm text-[#64748b] dark:text-white/70 animate-[fadeInUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] opacity-0 [animation-delay:0.3s]">
                                <span>o puedes </span>
                                <button
                                    type="button"
                                    className="cursor-pointer text-[#00AEEF] font-bold hover:underline"
                                    onClick={() =>
                                        toggleRecoveryMode(clearErrors)
                                    }
                                >
                                    {authConfigContent.toggleText}
                                </button>
                            </div>
                        </>
                    )}
                </Form>
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
