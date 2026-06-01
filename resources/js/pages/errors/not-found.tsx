import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, SearchX } from 'lucide-react';
import AppFooter from '@/components/app-footer';

export default function NotFound() {
    return (
        <>
            <Head title="404 - Tidak Ditemukan" />

            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-slate-950">
                <Card className="w-full max-w-sm border-gray-200 shadow-lg dark:border-gray-700 dark:bg-slate-900">
                    <CardContent className="px-8 py-10 text-center">
                        <img
                            src="https://placehold.co/56x56/1e40af/ffffff?text=T"
                            alt="Logo Sekolah"
                            className="mx-auto mb-4 h-14 w-14 rounded-xl object-cover shadow-sm"
                            width={56}
                            height={56}
                        />
                        <h1 className="mb-6 text-base font-semibold tracking-tight text-gray-900 dark:text-white">
                            SMP Negeri 1 Tejakula
                        </h1>

                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800">
                            <SearchX className="h-7 w-7 text-gray-400 dark:text-gray-500" />
                        </div>

                        <h2 className="text-6xl font-bold tracking-tight text-gray-200 dark:text-gray-600">404</h2>
                        <p className="mt-3 text-base font-medium text-gray-600 dark:text-gray-300">
                            Data tidak ditemukan
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-gray-400 dark:text-gray-400">
                            Pastikan NISN yang dimasukkan sudah benar
                        </p>

                        <div className="mt-8">
                            <Button
                                size="lg"
                                className="h-12 gap-2 bg-gray-900 text-sm font-semibold tracking-wide text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                                asChild
                            >
                                <Link href="/">
                                    <ArrowLeft className="h-4 w-4" />
                                    Kembali ke Beranda
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <AppFooter />
        </>
    );
}
