import { Head, Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/data-table';
import { Plus, Upload, Pencil, Trash2, Trash } from 'lucide-react';
import { useState } from 'react';

type Student = {
    id: number;
    nisn: string;
    nama: string;
    ttl: string;
    status_lulus: boolean;
    link_skl: string | null;
    created_at: string;
};

type PaginatedData = {
    data: Student[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
};

export default function DataSiswa({ students }: { students: PaginatedData }) {
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    function toggleSelect(id: number) {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    }

    function toggleSelectAll() {
        const currentIds = students.data.map((s) => s.id);
        const allSelected = currentIds.every((id) => selectedIds.has(id));
        setSelectedIds((prev) => {
            const next = new Set(prev);
            currentIds.forEach((id) => {
                if (allSelected) next.delete(id); else next.add(id);
            });
            return next;
        });
    }

    function handleDelete(id: number) {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            router.delete(`/admin/students/${id}`);
        }
    }

    function handleBatchDelete() {
        if (selectedIds.size === 0) return;
        if (confirm(`Hapus ${selectedIds.size} data yang dipilih?`)) {
            router.post('/admin/students/batch-delete', { ids: [...selectedIds] }, {
                onSuccess: () => setSelectedIds(new Set()),
            });
        }
    }

    function goToPage(page: number) {
        setSelectedIds(new Set());
        router.get('/admin/data-siswa', { page }, { preserveState: true });
    }

    const allOnPageSelected = students.data.length > 0 &&
        students.data.every((s) => selectedIds.has(s.id));

    const columns: ColumnDef<Student>[] = [
        {
            id: 'select',
            header: () => (
                <Checkbox
                    checked={allOnPageSelected}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Pilih semua"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={selectedIds.has(row.original.id)}
                    onCheckedChange={() => toggleSelect(row.original.id)}
                    aria-label="Pilih baris"
                />
            ),
        },
        {
            accessorKey: 'nisn',
            header: 'NISN',
            cell: ({ row }) => (
                <span className="font-mono text-xs">{row.getValue('nisn')}</span>
            ),
        },
        {
            accessorKey: 'nama',
            header: 'Nama',
            cell: ({ row }) => (
                <span className="font-medium">{row.getValue('nama')}</span>
            ),
        },
        {
            accessorKey: 'ttl',
            header: 'TTL',
            cell: ({ row }) => (
                <span className="text-xs text-muted-foreground">{row.getValue('ttl')}</span>
            ),
        },
        {
            accessorKey: 'status_lulus',
            header: 'Status',
            cell: ({ row }) => {
                const lulus = row.getValue('status_lulus');
                return (
                    <Badge variant={lulus ? 'default' : 'destructive'}>
                        {lulus ? 'LULUS' : 'TIDAK LULUS'}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'link_skl',
            header: 'SKL',
            cell: ({ row }) => {
                const skl = row.getValue('link_skl');
                return (
                    <span className="text-xs text-muted-foreground">
                        {skl ? 'Tersedia' : '-'}
                    </span>
                );
            },
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => {
                const student = row.original;
                return (
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/students/${student.id}/edit`}>
                                <Pencil className="mr-1 h-3 w-3" />
                                Edit
                            </Link>
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(student.id)}
                        >
                            <Trash2 className="mr-1 h-3 w-3" />
                            Hapus
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <Head title="Data Siswa" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Data Siswa</h1>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                        <Button asChild className="flex-1 sm:flex-none justify-center">
                            <Link href="/admin/students/create">
                                <Plus className="mr-1.5 h-4 w-4" />
                                Tambah Siswa
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="flex-1 sm:flex-none justify-center">
                            <Link href="/admin/students/import">
                                <Upload className="mr-1.5 h-4 w-4" />
                                Import Data
                            </Link>
                        </Button>
                    </div>
                </div>

                {selectedIds.size > 0 && (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleBatchDelete}
                            className="gap-1.5"
                        >
                            <Trash className="h-4 w-4" />
                            Hapus Terpilih ({selectedIds.size})
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedIds(new Set())}
                        >
                            Batal
                        </Button>
                    </div>
                )}

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                            Total: {students.total} siswa
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            data={students.data}
                            searchKey="nisn"
                            searchNumeric={true}
                            searchPlaceholder="Cari berdasarkan NISN..."
                            total={students.total}
                            from={students.from}
                            to={students.to}
                            currentPage={students.current_page}
                            lastPage={students.last_page}
                            onPageChange={goToPage}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
