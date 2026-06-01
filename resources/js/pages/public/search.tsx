import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import AppFooter from '@/components/app-footer';

export default function SearchPage() {
    const [nisn, setNisn] = useState('');

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        if (!nisn.trim()) return;
        router.post('/search', { nisn: nisn.trim() });
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (
            !/^\d$/.test(e.key) &&
            !['Backspace','Delete','Tab','ArrowLeft','ArrowRight','Home','End'].includes(e.key) &&
            !e.ctrlKey && !e.metaKey
        ) {
            e.preventDefault();
        }
    }

    return (
        <>
            <Head title="Pengumuman Kelulusan" />

            <div 
                className="relative flex min-h-screen items-center justify-center bg-slate-950 px-4 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/school_background.webp')" }}
            >
                {/* Translucent glass overlay */}
                <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs" />

                {/* Main Card Container */}
                <Card className="relative w-full max-w-sm border-gray-200 bg-white shadow-lg z-10 overflow-hidden dark:border-gray-700 dark:bg-slate-900">
                    <CardHeader className="items-center pb-2 pt-8 text-center bg-white dark:bg-slate-900">
                        <img
                            src="/images/logo-smpn1tejakula.png"
                            alt="Logo Sekolah"
                            className="mb-4 h-18 w-18 rounded-xl object-cover shadow-sm"
                            width={72}
                            height={72}
                        />
                        <CardTitle className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            SMP Negeri 1 Tejakula
                        </CardTitle>
                        <CardDescription className="text-sm tracking-wide text-gray-500 dark:text-gray-400">
                            Pengumuman Kelulusan Tahun Ajaran 2024/2025
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="px-8 pb-8 pt-2 bg-white dark:bg-slate-900">
                        <form onSubmit={handleSearch} className="space-y-5">
                            <div className="space-y-2">
                                <label
                                    htmlFor="nisn"
                                    className="text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-300"
                                >
                                    NISN
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                                    <Input
                                        id="nisn"
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="Masukkan NISN"
                                        value={nisn}
                                        onChange={(e) => setNisn(e.target.value.replace(/\D/g, ''))}
                                        onKeyDown={handleKeyDown}
                                        required
                                        autoFocus
                                        maxLength={20}
                                        className="h-12 border-gray-300 pl-10 text-base tracking-wide placeholder:text-gray-400 focus:border-gray-900 focus:ring-0 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                size="lg"
                                className="h-12 w-full bg-gray-900 text-sm font-semibold tracking-wide text-white hover:bg-gray-800 active:scale-[0.98] dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                            >
                                Cari
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="absolute bottom-0 left-0 right-0 z-10">
                    <AppFooter variant="dark" />
                </div>
            </div>
        </>
    );
}
