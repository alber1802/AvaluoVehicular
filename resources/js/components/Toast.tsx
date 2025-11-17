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
                    icon: <CheckCircle className="h-7 w-7" />,
                    bgColor: 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30',
                    borderColor: 'border-green-500 dark:border-green-400',
                    textColor: 'text-green-900 dark:text-green-100',
                    iconColor: 'text-green-600 dark:text-green-400',
                    iconBg: 'bg-green-100 dark:bg-green-900/50'
                };
            case 'error':
                return {
                    icon: <XCircle className="h-7 w-7" />,
                    bgColor: 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30',
                    borderColor: 'border-red-500 dark:border-red-400',
                    textColor: 'text-red-900 dark:text-red-100',
                    iconColor: 'text-red-600 dark:text-red-400',
                    iconBg: 'bg-red-100 dark:bg-red-900/50'
                };
            case 'warning':
                return {
                    icon: <AlertCircle className="h-7 w-7" />,
                    bgColor: 'bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30',
                    borderColor: 'border-yellow-500 dark:border-yellow-400',
                    textColor: 'text-yellow-900 dark:text-yellow-100',
                    iconColor: 'text-yellow-600 dark:text-yellow-400',
                    iconBg: 'bg-yellow-100 dark:bg-yellow-900/50'
                };
            case 'info':
                return {
                    icon: <Info className="h-7 w-7" />,
                    bgColor: 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30',
                    borderColor: 'border-blue-500 dark:border-blue-400',
                    textColor: 'text-blue-900 dark:text-blue-100',
                    iconColor: 'text-blue-600 dark:text-blue-400',
                    iconBg: 'bg-blue-100 dark:bg-blue-900/50'
                };
        }
    };

    const config = getConfig();

    return (
        <div
            className={`fixed top-6 right-6 z-50 flex min-w-[320px] max-w-md items-start gap-4 rounded-xl border-2 ${config.borderColor} ${config.bgColor} p-5 shadow-2xl backdrop-blur-sm transition-all duration-300 ${
                isExiting ? 'animate-slide-out-right opacity-0' : 'animate-slide-in-right'
            }`}
        >
            {/* Icon */}
            <div className={`flex-shrink-0 rounded-full ${config.iconBg} p-2`}>
                <div className={config.iconColor}>
                    {config.icon}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 pt-0.5">
                <p className={`text-lg font-semibold leading-tight ${config.textColor}`}>
                    {message}
                </p>
            </div>

            {/* Close button */}
            <button
                onClick={handleClose}
                className={`flex-shrink-0 rounded-full p-1 transition-colors hover:bg-black/10 dark:hover:bg-white/10 ${config.iconColor}`}
            >
                <X className="h-5 w-5" />
            </button>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-xl bg-black/10 dark:bg-white/10">
                <div
                    className={`h-full ${
                        type === 'success' ? 'bg-green-500' :
                        type === 'error' ? 'bg-red-500' :
                        type === 'warning' ? 'bg-yellow-500' :
                        'bg-blue-500'
                    } animate-progress`}
                    style={{ animationDuration: `${duration}ms` }}
                />
            </div>
        </div>
    );
}
