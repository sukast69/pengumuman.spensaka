import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, CheckCircle2, XCircle, FileText, ArrowRight, GraduationCap } from 'lucide-react';

type Student = {
    id: number;
    nisn: string;
    nama: string;
    ttl: string;
    status_lulus: boolean;
    link_skl: string | null;
    created_at: string;
};

export default function AdminDashboard({
    stats,
    recent_students,
}: {
    stats: {
        total: number;
        lulus: number;
        tidak_lulus: number;
        dengan_skl: number;
        persentase_lulus: number;
    };
    recent_students: Student[];
}) {
    const statCards = [
        { label: 'Total Siswa', value: stats.total, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Lulus', value: stats.lulus, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Tidak Lulus', value: stats.tidak_lulus, icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
        { label: 'Download SKL', value: stats.dengan_skl, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100' },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6" />
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                </div>

                <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                    {statCards.map((card) => (
                        <Card key={card.label}>
                            <CardContent className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 p-4 sm:p-6 text-center sm:text-left">
                                <div className={`rounded-lg p-2.5 sm:p-3 ${card.bg}`}>
                                    <card.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${card.color}`} />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">{card.label}</p>
                                    <p className="text-xl sm:text-2xl font-bold tracking-tight">{card.value}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Persentase Kelulusan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                            <div className="relative h-4 w-full flex-1 overflow-hidden rounded-full bg-secondary">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
                                    style={{ width: `${stats.persentase_lulus}%` }}
                                />
                            </div>
                            <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-start w-full sm:w-auto">
                                <span className="text-lg font-bold tabular-nums text-green-600">
                                    {stats.persentase_lulus}%
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {stats.lulus} dari {stats.total} siswa
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-3">
                        <CardTitle className="text-base">Data Terbaru</CardTitle>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/admin/data-siswa">
                                Lihat Semua Data
                                <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto w-full">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>NISN</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>TTL</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>SKL</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recent_students.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center text-muted-foreground">
                                                Belum ada data siswa
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        recent_students.map((student) => (
                                            <TableRow key={student.id}>
                                                <TableCell className="font-mono text-xs">{student.nisn}</TableCell>
                                                <TableCell>{student.nama}</TableCell>
                                                <TableCell className="text-xs text-muted-foreground">{student.ttl}</TableCell>
                                                <TableCell>
                                                    <Badge variant={student.status_lulus ? 'default' : 'destructive'}>
                                                        {student.status_lulus ? 'LULUS' : 'TIDAK LULUS'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-xs text-muted-foreground">
                                                    {student.link_skl ? 'Tersedia' : '-'}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
