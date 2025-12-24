import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    onClose?: () => void;
}

export default function Toast({ message, type = 'success', duration = 4000, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose();
        }, 300);
    };

    if (!isVisible) return null;

    const getConfig = () => {
        switch (type) {
            case 'success':
                return {
                    icon: <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7" />,
                    borderColor: 'border-green-500',
                    iconColor: 'text-green-400',
                    iconBg: 'bg-green-500/20',
                    progressColor: 'bg-green-500'
                };
            case 'error':
                return {
                    icon: <XCircle className="h-6 w-6 sm:h-7 sm:w-7" />,
                    borderColor: 'border-red-500',
                    iconColor: 'text-red-400',
                    iconBg: 'bg-red-500/20',
                    progressColor: 'bg-red-500'
                };
            case 'warning':
                return {
                    icon: <AlertCircle className="h-6 w-6 sm:h-7 sm:w-7" />,
                    borderColor: 'border-yellow-500',
                    iconColor: 'text-yellow-400',
                    iconBg: 'bg-yellow-500/20',
                    progressColor: 'bg-yellow-500'
                };
            case 'info':
                return {
                    icon: <Info className="h-6 w-6 sm:h-7 sm:w-7" />,
                    borderColor: 'border-[#00AEEF]',
                    iconColor: 'text-[#00AEEF]',
                    iconBg: 'bg-[#00AEEF]/20',
                    progressColor: 'bg-[#00AEEF]'
                };
        }
    };

    const config = getConfig();

    return (
        <div
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex w-[90%] max-w-md items-center gap-3 sm:gap-4 rounded-xl border-l-4 ${config.borderColor} 
            p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 ${isExiting ?
                    ' opacity-0 -translate-y-2' : ''
                }`}
            style={{ backgroundColor: '#0A2540' }}
        >
            {/* Icon */}
            <div className={`flex-shrink-0 rounded-full ${config.iconBg} p-2 sm:p-2.5`}>
                <div className={config.iconColor}>
                    {config.icon}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-semibold leading-tight text-white truncate sm:whitespace-normal">
                    {message}
                </p>
            </div>

            {/* Close button */}
            <button
                onClick={handleClose}
                className="flex-shrink-0 rounded-full p-1.5 transition-colors hover:bg-white/10 text-white/70 hover:text-white"
            >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Progress bar */}
            <div
                className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-xl"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
                <div
                    className={`h-full ${config.progressColor} animate-progress`}
                    style={{ animationDuration: `${duration}ms` }}
                />
            </div>
        </div>
    );
}
