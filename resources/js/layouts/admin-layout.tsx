import { Link, router } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';
import { LayoutDashboard, Table2, UserPlus, Upload, LogOut, Moon, Sun, Monitor } from 'lucide-react';
import AppFooter from '@/components/app-footer';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { Menu } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/data-siswa', label: 'Data Siswa', icon: Table2 },
    { href: '/admin/students/create', label: 'Tambah Siswa', icon: UserPlus },
    { href: '/admin/students/import', label: 'Import Data', icon: Upload },
];

function AppearanceToggle() {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                    {appearance === 'dark' ? (
                        <Moon className="h-4 w-4" />
                    ) : appearance === 'light' ? (
                        <Sun className="h-4 w-4" />
                    ) : (
                        <Monitor className="h-4 w-4" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => updateAppearance('light')}>
                    <Sun className="mr-2 h-4 w-4" /> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateAppearance('dark')}>
                    <Moon className="mr-2 h-4 w-4" /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateAppearance('system')}>
                    <Monitor className="mr-2 h-4 w-4" /> System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-xs">
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Trigger */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col p-6 pr-0">
                            <SheetHeader className="mb-4">
                                <SheetTitle className="text-left font-bold text-lg">Admin Panel</SheetTitle>
                                <SheetDescription className="sr-only">
                                    Menu navigasi administrasi kelulusan siswa.
                                </SheetDescription>
                            </SheetHeader>
                            <nav className="flex flex-col gap-2 pr-6">
                                {navItems.map((item) => (
                                    <Button key={item.href} variant="ghost" className="justify-start h-10 px-3" asChild>
                                        <Link href={item.href}>
                                            <item.icon className="mr-3 h-5 w-5 text-muted-foreground" />
                                            {item.label}
                                        </Link>
                                    </Button>
                                ))}
                                <hr className="my-2 border-border" />
                                <Button
                                    variant="ghost"
                                    className="justify-start h-10 px-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    onClick={() => router.post('/admin/logout')}
                                >
                                    <LogOut className="mr-3 h-5 w-5" />
                                    Logout
                                </Button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    
                    <span className="text-sm font-semibold tracking-wider">Admin Panel</span>
                </div>

                {/* Desktop Navigation */}
                <NavigationMenu className="hidden md:flex flex-1 max-w-none justify-center">
                    <NavigationMenuList className="gap-1">
                        {navItems.map((item) => (
                            <NavigationMenuItem key={item.href}>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={item.href}>
                                        <item.icon className="mr-1.5 h-4 w-4" />
                                        {item.label}
                                    </Link>
                                </Button>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-2">
                    <AppearanceToggle />
                    <Button variant="ghost" size="sm" className="hidden md:flex" onClick={() => router.post('/admin/logout')}>
                        <LogOut className="mr-1.5 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </header>
            <main className="flex-1 overflow-auto p-4 md:p-6">
                {children}
            </main>
            <AppFooter />
        </div>
    );
}
