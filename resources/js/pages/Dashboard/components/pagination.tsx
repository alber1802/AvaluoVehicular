import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className,
}: PaginationProps) {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const showPages = 5;

        if (totalPages <= showPages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className={cn('flex items-center justify-between gap-2', className)}>
            <div className="text-sm text-[#64748b] dark:text-white/70">
                Página {currentPage} de {totalPages}
            </div>

            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[#64748b] hover:bg-[#00AEEF]/10 hover:text-[#00AEEF] dark:text-white/70 dark:hover:bg-[#00AEEF]/20 dark:hover:text-[#00AEEF]"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[#64748b] hover:bg-[#00AEEF]/10 hover:text-[#00AEEF] dark:text-white/70 dark:hover:bg-[#00AEEF]/20 dark:hover:text-[#00AEEF]"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="hidden items-center gap-1 sm:flex">
                    {getPageNumbers().map((page, index) => (
                        <div key={index}>
                            {page === '...' ? (
                                <span className="px-2 text-[#64748b] dark:text-white/70">...</span>
                            ) : (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                        'h-8 w-8 text-[#64748b] hover:bg-[#00AEEF]/10 hover:text-[#00AEEF] dark:text-white/70 dark:hover:bg-[#00AEEF]/20 dark:hover:text-[#00AEEF]',
                                        currentPage === page &&
                                            'bg-[#00AEEF]/20 text-[#00AEEF] hover:bg-[#00AEEF]/30 dark:bg-[#00AEEF]/30 dark:hover:bg-[#00AEEF]/40'
                                    )}
                                    onClick={() => onPageChange(page as number)}
                                >
                                    {page}
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[#64748b] hover:bg-[#00AEEF]/10 hover:text-[#00AEEF] dark:text-white/70 dark:hover:bg-[#00AEEF]/20 dark:hover:text-[#00AEEF]"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[#64748b] hover:bg-[#00AEEF]/10 hover:text-[#00AEEF] dark:text-white/70 dark:hover:bg-[#00AEEF]/20 dark:hover:text-[#00AEEF]"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
