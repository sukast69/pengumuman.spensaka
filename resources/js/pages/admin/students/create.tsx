import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

export default function CreateStudent() {
    const [form, setForm] = useState({
        nisn: '',
        nama: '',
        ttl: '',
        status_lulus: true,
        link_skl: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        router.post('/admin/students', form, {
            onError: (err) => setErrors(err),
        });
    }

    return (
        <>
            <Head title="Tambah Siswa" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/admin/dashboard">Kembali</Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Tambah Siswa</h1>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Form Tambah Siswa</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="nisn">NISN</Label>
                                <Input
                                    id="nisn"
                                    name="nisn"
                                    value={form.nisn}
                                    onChange={handleChange}
                                    required
                                    maxLength={20}
                                />
                                {errors.nisn && <p className="text-sm text-red-500">{errors.nisn}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nama">Nama</Label>
                                <Input
                                    id="nama"
                                    name="nama"
                                    value={form.nama}
                                    onChange={handleChange}
                                    required
                                    maxLength={150}
                                />
                                {errors.nama && <p className="text-sm text-red-500">{errors.nama}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ttl">Tempat, Tanggal Lahir</Label>
                                <Input
                                    id="ttl"
                                    name="ttl"
                                    placeholder="Contoh: Jakarta, 1 Januari 2000"
                                    value={form.ttl}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.ttl && <p className="text-sm text-red-500">{errors.ttl}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="link_skl">Link SKL</Label>
                                <Input
                                    id="link_skl"
                                    name="link_skl"
                                    placeholder="https://..."
                                    value={form.link_skl}
                                    onChange={handleChange}
                                />
                                {errors.link_skl && <p className="text-sm text-red-500">{errors.link_skl}</p>}
                            </div>
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="status_lulus"
                                    checked={form.status_lulus}
                                    onCheckedChange={(checked) =>
                                        setForm({ ...form, status_lulus: checked === true })
                                    }
                                />
                                <Label htmlFor="status_lulus">Lulus</Label>
                            </div>
                            <Button type="submit">Simpan</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
