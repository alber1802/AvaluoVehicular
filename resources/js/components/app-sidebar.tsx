import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { listado as usuariosListado } from '@/routes/usuarios';
import { index as reciclajeListado } from '@/routes/reciclaje';
import { index as shareIndex } from '@/routes/avaluo/share';
import { consultar } from '@/routes/depreciacion';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Waypoints, LayoutGrid, Users } from 'lucide-react';
import AppLogo from './app-logo';
import { RecycleIcon, ChartBarIcon } from '@/components/icons';

import { route } from 'ziggy-js';

const mainNavItems: NavItem[] = [
    {
        title: 'Escritorio',
        href: dashboard(),
        icon: LayoutGrid,
        roles: ['admin', 'evaluador'],
    },
    {
        title: 'Usuarios',
        href: usuariosListado(),
        icon: Users,
        roles: ['admin'],
    },
    {
        title: 'Reciclaje',
        href: reciclajeListado(),
        icon: RecycleIcon,
        roles: ['admin', 'evaluador'],
    },
    {
        title: 'Depreciación',
        href: consultar(),
        icon: ChartBarIcon,
        roles: ['admin', 'evaluador'],
    },
    {
        title: 'Avaluos compartidos',
        href: shareIndex(),
        icon: Waypoints,
        roles: ['admin', 'evaluador'],
    },
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
