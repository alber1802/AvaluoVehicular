import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { X, Search, ChevronDown, Check, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// Tipos genéricos para el MultiSelect
export interface MultiSelectOption {
    id: number | string;
    name: string;
    email?: string;
    role?: string;
    status?: 'active' | 'inactive';
    avatar?: string;
}

export interface MultiSelectProps<T extends MultiSelectOption> {
    options: T[];
    value: T[];
    onChange: (selected: T[]) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    disabled?: boolean;
    className?: string;
    showSearch?: boolean;
    showSelectAll?: boolean;
    maxHeight?: number;
    renderOption?: (option: T, isSelected: boolean) => React.ReactNode;
    renderChip?: (option: T, onRemove: () => void) => React.ReactNode;
}

// Componente Chip para mostrar selecciones
interface ChipProps {
    label: string;
    onRemove: () => void;
    disabled?: boolean;
}

function Chip({ label, onRemove, disabled }: ChipProps) {
    return (
        <div className="chip-animate inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full 
            bg-[#00AEEF]/10 border border-[#00AEEF]/20 text-[#00AEEF] text-sm font-medium
            dark:bg-[#00AEEF]/20 dark:border-[#00AEEF]/30 dark:text-[#00AEEF]
            transition-all duration-200 hover:bg-[#00AEEF]/20 dark:hover:bg-[#00AEEF]/30">
            <span className="max-w-[150px] truncate">{label}</span>
            {!disabled && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    className="w-4 h-4 rounded-full flex items-center justify-center 
                        hover:bg-[#00AEEF]/30 dark:hover:bg-[#00AEEF]/40 
                        transition-colors focus:outline-none"
                >
                    <X className="w-3 h-3" />
                </button>
            )}
        </div>
    );
}

// Componente principal MultiSelect
export function MultiSelect<T extends MultiSelectOption>({
    options,
    value,
    onChange,
    placeholder = "Seleccionar...",
    searchPlaceholder = "Buscar...",
    emptyMessage = "No se encontraron resultados",
    disabled = false,
    className,
    showSearch = true,
    showSelectAll = true,
    maxHeight = 280,
    renderOption,
    renderChip,
}: MultiSelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Filtrar opciones basado en búsqueda
    const filteredOptions = React.useMemo(() => {
        if (!searchTerm) return options;
        const term = searchTerm.toLowerCase();
        return options.filter(
            (option) =>
                option.name.toLowerCase().includes(term) ||
                option.email?.toLowerCase().includes(term) ||
                option.role?.toLowerCase().includes(term)
        );
    }, [options, searchTerm]);

    // Verificar si una opción está seleccionada
    const isSelected = useCallback(
        (option: T) => value.some((v) => v.id === option.id),
        [value]
    );

    // Toggle selección de opción
    const toggleOption = useCallback(
        (option: T) => {
            if (disabled) return;

            if (isSelected(option)) {
                onChange(value.filter((v) => v.id !== option.id));
            } else {
                onChange([...value, option]);
            }
        },
        [value, onChange, isSelected, disabled]
    );

    // Remover opción
    const removeOption = useCallback(
        (option: T) => {
            if (disabled) return;
            onChange(value.filter((v) => v.id !== option.id));
        },
        [value, onChange, disabled]
    );

    // Seleccionar/Deseleccionar todos
    const toggleSelectAll = useCallback(() => {
        if (disabled) return;

        const allFilteredSelected = filteredOptions.every((option) =>
            value.some((v) => v.id === option.id)
        );

        if (allFilteredSelected) {
            // Deseleccionar todos los filtrados
            const remainingValues = value.filter(
                (v) => !filteredOptions.some((option) => option.id === v.id)
            );
            onChange(remainingValues);
        } else {
            // Seleccionar todos los filtrados que no están seleccionados
            const newSelections = filteredOptions.filter(
                (option) => !value.some((v) => v.id === option.id)
            );
            onChange([...value, ...newSelections]);
        }
    }, [filteredOptions, value, onChange, disabled]);

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setSearchTerm("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focus en input de búsqueda cuando se abre
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    // Verificar si todos los filtrados están seleccionados
    const allFilteredSelected = filteredOptions.length > 0 &&
        filteredOptions.every((option) => value.some((v) => v.id === option.id));

    return (
        <div ref={containerRef} className={cn("relative w-full", className)}>
            {/* Trigger/Input Container */}
            <div
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={cn(
                    "min-h-[44px] px-3 py-2 rounded-lg cursor-pointer transition-all duration-200",
                    "border bg-white dark:bg-[#1a2c3a]",
                    "border-[#e2e8f0] dark:border-[#20384b]",
                    isOpen && "border-[#00AEEF] ring-2 ring-[#00AEEF]/20 dark:ring-[#00AEEF]/30",
                    disabled && "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-[#0f1a23]",
                    !isOpen && !disabled && "hover:border-[#00AEEF]/50"
                )}
            >
                <div className="flex flex-wrap items-center gap-2">
                    {/* Chips de selección */}
                    {value.length > 0 ? (
                        <>
                            {value.map((option) =>
                                renderChip ? (
                                    renderChip(option, () => removeOption(option))
                                ) : (
                                    <Chip
                                        key={option.id}
                                        label={option.name}
                                        onRemove={() => removeOption(option)}
                                        disabled={disabled}
                                    />
                                )
                            )}
                        </>
                    ) : (
                        <span className="text-[#64748b] dark:text-white/50 text-sm">
                            {placeholder}
                        </span>
                    )}

                    {/* Icono de dropdown */}
                    <div className="ml-auto flex items-center gap-2">
                        {value.length > 0 && (
                            <span className="text-xs text-[#64748b] dark:text-white/50 bg-[#f8fafc] dark:bg-[#0f1a23] px-2 py-0.5 rounded-full">
                                {value.length}
                            </span>
                        )}
                        <ChevronDown
                            className={cn(
                                "w-4 h-4 text-[#64748b] dark:text-white/50 transition-transform duration-200",
                                isOpen && "rotate-180"
                            )}
                        />
                    </div>
                </div>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className={cn(
                        "absolute top-full left-0 right-0 mt-1 z-50",
                        "bg-white dark:bg-[#1a2c3a]",
                        "border border-[#e2e8f0] dark:border-[#20384b]",
                        "rounded-lg shadow-lg overflow-hidden",
                        "animate-in fade-in-0 zoom-in-95 duration-200"
                    )}
                >
                    {/* Barra de búsqueda */}
                    {showSearch && (
                        <div className="p-3 border-b border-[#e2e8f0] dark:border-[#20384b]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00AEEF]" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder={searchPlaceholder}
                                    className={cn(
                                        "w-full pl-10 pr-4 py-2 text-sm rounded-lg",
                                        "bg-[#f8fafc] dark:bg-[#0f1a23]",
                                        "border border-[#e2e8f0] dark:border-[#20384b]",
                                        "text-[#1e293b] dark:text-white/90",
                                        "placeholder:text-[#64748b] dark:placeholder:text-white/50",
                                        "focus:outline-none focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20"
                                    )}
                                />
                            </div>
                        </div>
                    )}

                    {/* Lista de opciones */}
                    <div
                        className="overflow-y-auto custom-scrollbar"
                        style={{ maxHeight: `${maxHeight}px` }}
                    >
                        {filteredOptions.length === 0 ? (
                            <div className="p-4 text-center">
                                <Users className="w-8 h-8 mx-auto mb-2 text-[#64748b] dark:text-white/50 opacity-50" />
                                <p className="text-sm text-[#64748b] dark:text-white/50">
                                    {emptyMessage}
                                </p>
                            </div>
                        ) : (
                            filteredOptions.map((option) => {
                                const selected = isSelected(option);

                                if (renderOption) {
                                    return (
                                        <div
                                            key={option.id}
                                            onClick={() => toggleOption(option)}
                                            className="cursor-pointer"
                                        >
                                            {renderOption(option, selected)}
                                        </div>
                                    );
                                }

                                return (
                                    <div
                                        key={option.id}
                                        onClick={() => toggleOption(option)}
                                        className={cn(
                                            "px-3 py-3 cursor-pointer transition-colors duration-150",
                                            "border-b border-[#e2e8f0] dark:border-[#20384b] last:border-0",
                                            selected
                                                ? "bg-[#00AEEF]/10 dark:bg-[#00AEEF]/20"
                                                : "hover:bg-[#f8fafc] dark:hover:bg-[#20384b]/50"
                                        )}
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            {/* Info del usuario */}
                                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                                {option.avatar ? (
                                                    <div className="w-9 h-9 rounded-full overflow-hidden bg-[#f8fafc] dark:bg-[#0f1a23] flex-shrink-0">
                                                        <img
                                                            src={option.avatar}
                                                            alt={option.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-9 h-9 rounded-full bg-[#00AEEF]/10 dark:bg-[#00AEEF]/20 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-sm font-medium text-[#00AEEF]">
                                                            {option.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="min-w-0 flex-1">
                                                    <div className="font-medium text-[#1e293b] dark:text-white/90 truncate">
                                                        {option.name}
                                                    </div>
                                                    {option.email && (
                                                        <div className="text-xs text-[#64748b] dark:text-white/50 truncate">
                                                            {option.email}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Badges y checkbox */}
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                {option.status && (
                                                    <span
                                                        className={cn(
                                                            "px-2 py-0.5 text-xs rounded-full hidden sm:inline-block",
                                                            option.status === "active"
                                                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                                        )}
                                                    >
                                                        {option.status === "active" ? "Activo" : "Inactivo"}
                                                    </span>
                                                )}
                                                {option.role && (
                                                    <span
                                                        className={cn(
                                                            "px-2 py-0.5 text-xs rounded-full hidden md:inline-block",
                                                            option.role === "Administrador"
                                                                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                                                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                                        )}
                                                    >
                                                        {option.role}
                                                    </span>
                                                )}
                                                <div
                                                    className={cn(
                                                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                                                        selected
                                                            ? "bg-[#00AEEF] border-[#00AEEF]"
                                                            : "border-[#e2e8f0] dark:border-[#20384b]"
                                                    )}
                                                >
                                                    {selected && (
                                                        <Check className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Footer con contador y botón seleccionar todos */}
                    {showSelectAll && filteredOptions.length > 0 && (
                        <div className="p-3 border-t border-[#e2e8f0] dark:border-[#20384b] bg-[#f8fafc] dark:bg-[#0f1a23]">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[#64748b] dark:text-white/50">
                                    {value.length} seleccionado{value.length !== 1 ? "s" : ""}
                                </span>
                                <button
                                    type="button"
                                    onClick={toggleSelectAll}
                                    className="text-[#00AEEF] hover:text-[#0098d6] font-medium transition-colors"
                                >
                                    {allFilteredSelected ? "Deseleccionar todos" : "Seleccionar todos"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Estilos para animaciones y scrollbar */}
            <style>{`
                .chip-animate {
                    animation: chipIn 0.2s ease-out;
                }
                
                @keyframes chipIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #00AEEF;
                    border-radius: 3px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #0098d6;
                }
            `}</style>
        </div>
    );
}

// Componente simplificado para selección de usuarios
export interface UserMultiSelectProps {
    users: MultiSelectOption[];
    selectedUsers: MultiSelectOption[];
    onChange: (users: MultiSelectOption[]) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

export function UserMultiSelect({
    users,
    selectedUsers,
    onChange,
    placeholder = "Seleccionar usuarios...",
    disabled = false,
    className,
}: UserMultiSelectProps) {
    return (
        <MultiSelect
            options={users}
            value={selectedUsers}
            onChange={onChange}
            placeholder={placeholder}
            searchPlaceholder="Buscar usuarios..."
            emptyMessage="No se encontraron usuarios"
            disabled={disabled}
            className={className}
            showSearch={true}
            showSelectAll={true}
        />
    );
}

export default MultiSelect;
