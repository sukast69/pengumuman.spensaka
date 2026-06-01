import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState, useRef } from 'react';

export default function ImportStudent() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [processing, setProcessing] = useState(false);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!file) return;

        setProcessing(true);
        const formData = new FormData();
        formData.append('file', file);

        router.post('/admin/students/import', formData, {
            onFinish: () => setProcessing(false),
        });
    }

    return (
        <>
            <Head title="Import Data Siswa" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/admin/dashboard">Kembali</Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Import Data Siswa</h1>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload File</CardTitle>
                            <CardDescription>
                                Upload file CSV atau Excel (.xlsx) dengan format kolom: NISN, Nama, TTL, Link SKL
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="file">Pilih File</Label>
                                    <Input
                                        ref={fileInputRef}
                                        id="file"
                                        type="file"
                                        accept=".csv,.xlsx"
                                        onChange={handleFileChange}
                                        required
                                    />
                                </div>
                                {file && (
                                    <Alert>
                                        <AlertTitle>File terpilih</AlertTitle>
                                        <AlertDescription>
                                            {file.name} ({(file.size / 1024).toFixed(1)} KB)
                                        </AlertDescription>
                                    </Alert>
                                )}
                                <Button type="submit" disabled={!file || processing}>
                                    {processing ? 'Processing...' : 'Import'}
                                </Button>
                                <Button variant="outline" asChild>
                                    <a href="/templates/template_import.csv" download>
                                        Download Template CSV
                                    </a>
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Panduan</CardTitle>
                            <CardDescription>
                                Format file yang didukung: CSV dan XLSX
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-lg border p-4">
                                <h3 className="mb-2 font-medium">Format Kolom</h3>
                                <p className="text-sm text-gray-500">
                                    Baris pertama harus header (akan dilewati). Baris berikutnya berisi data:
                                </p>
                                <pre className="mt-2 rounded bg-gray-100 p-3 text-xs dark:bg-gray-800">
                                    NISN,Nama,TTL,Link SKL{'\n'}
                                    1234567890,John Doe,Jakarta 1 Jan 2000,https://...
                                </pre>
                            </div>

                            <div className="rounded-lg border p-4">
                                <h3 className="mb-2 font-medium">Catatan</h3>
                                <ul className="list-inside list-disc text-sm text-gray-500">
                                    <li>NISN wajib diisi dan harus unik</li>
                                    <li>Jika NISN sudah ada, data akan diperbarui</li>
                                    <li>Link SKL boleh dikosongkan</li>
                                    <li>Maksimal ukuran file 10 MB</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
