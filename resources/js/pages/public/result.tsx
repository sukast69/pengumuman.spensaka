import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, XCircle, Download, ArrowLeft } from 'lucide-react';

type Student = {
    nisn: string;
    nama: string;
    ttl: string;
    status_lulus: boolean;
    link_skl: string | null;
};

export default function Result({ student }: { student: Student }) {
    const isLulus = student.status_lulus;

    return (
        <>
            <Head title={isLulus ? 'Selamat!' : 'Hasil Pencarian'} />

            <div 
                className="relative flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/school_background.png')" }}
            >
                {/* Translucent glass overlay */}
                <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs" />

                <div className="relative w-full max-w-sm z-10">
                    <div className="mb-6 text-center">
                        <img
                            src="https://placehold.co/56x56/1e40af/ffffff?text=T"
                            alt="Logo Sekolah"
                            className="mx-auto mb-3 h-14 w-14 rounded-xl object-cover shadow-sm"
                            width={56}
                            height={56}
                        />
                        <h1 className="text-lg font-bold tracking-tight text-white drop-shadow-md">
                            SMP Negeri 1 Tejakula
                        </h1>
                    </div>

                    <Card className="overflow-hidden border-gray-200 shadow-lg bg-white">
                        {isLulus ? (
                            <div className="border-b border-gray-100 bg-green-50 px-6 py-7 text-center">
                                <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-green-600" />
                                <p className="text-xs font-semibold tracking-widest text-green-700 uppercase">
                                    Selamat!
                                </p>
                                <p className="mt-1 text-2xl font-bold tracking-tight text-green-700">
                                    LULUS
                                </p>
                                <p className="mt-1.5 text-sm leading-relaxed text-green-600">
                                    Anda dinyatakan lulus dari SMP Negeri 1 Tejakula
                                </p>
                            </div>
                        ) : (
                            <div className="border-b border-gray-100 bg-gray-50 px-6 py-7 text-center">
                                <XCircle className="mx-auto mb-3 h-10 w-10 text-gray-400" />
                                <p className="text-2xl font-bold tracking-tight text-gray-600">
                                    TIDAK LULUS
                                </p>
                                <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                                    Mohon maaf, Anda belum dinyatakan lulus
                                </p>
                            </div>
                        )}

                        <CardContent className="p-0 bg-white">
                            <div className="space-y-0 px-6 py-5">
                                <div className="flex items-center justify-between border-b border-gray-100 py-3">
                                    <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                        NISN
                                    </span>
                                    <span className="font-mono text-sm font-medium text-gray-900">
                                        {student.nisn}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between border-b border-gray-100 py-3">
                                    <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                        Nama
                                    </span>
                                    <span className="text-right text-sm font-medium text-gray-900">
                                        {student.nama}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between border-b border-gray-100 py-3">
                                    <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                        TTL
                                    </span>
                                    <span className="text-right text-sm font-medium text-gray-900">
                                        {student.ttl}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                        Status
                                    </span>
                                    {isLulus ? (
                                        <Badge className="bg-green-100 px-3 py-1 text-xs font-semibold tracking-wide text-green-700 uppercase hover:bg-green-100">
                                            <CheckCircle2 className="mr-1.5 h-3 w-3" />
                                            LULUS
                                        </Badge>
                                    ) : (
                                        <Badge
                                            variant="outline"
                                            className="border-gray-300 px-3 py-1 text-xs font-semibold tracking-wide text-gray-600 uppercase"
                                        >
                                            <XCircle className="mr-1.5 h-3 w-3" />
                                            TIDAK LULUS
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {isLulus && student.link_skl && (
                                <div className="border-t border-gray-100 px-6 pb-6 pt-2">
                                    <Button
                                        size="lg"
                                        className="h-12 w-full gap-2 bg-gray-900 text-sm font-semibold tracking-wide text-white hover:bg-gray-800 active:scale-[0.98]"
                                        asChild
                                    >
                                        <a
                                            href={student.link_skl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Download className="h-4 w-4" />
                                            Download SKL
                                        </a>
                                    </Button>
                                </div>
                            )}

                            {!isLulus && (
                                <div className="border-t border-gray-100 px-6 pb-6 pt-2">
                                    <div className="rounded-lg bg-gray-50 px-4 py-3.5 text-center">
                                        <p className="text-sm leading-relaxed text-gray-500">
                                            Untuk informasi lebih lanjut, hubungi pihak sekolah.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="mt-6 text-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1.5 text-sm text-slate-300 hover:text-white"
                            asChild
                        >
                            <Link href="/">
                                <ArrowLeft className="h-3.5 w-3.5" />
                                Cari NISN Lain
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
