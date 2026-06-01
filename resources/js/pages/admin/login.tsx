import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { School } from 'lucide-react';
import { useState } from 'react';
import AppFooter from '@/components/app-footer';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        router.post('/admin/login', { username, password }, {
            onError: (err) => setErrors(err),
        });
    }

    return (
        <>
            <Head title="Admin Login" />

            <div className="flex min-h-screen">
                <div className="hidden w-1/2 flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-700 to-cyan-500 p-12 text-white lg:flex">
                    <School className="mb-6 h-16 w-16" />
                    <h1 className="mb-2 text-3xl font-bold">SMP Negeri 1 Tejakula</h1>
                    <p className="mb-8 text-center text-lg text-white/80">
                        Sistem Pengumuman Kelulusan & Download SKL
                    </p>
                    <div className="mt-8 h-px w-32 bg-white/30" />
                    <p className="mt-8 text-center text-sm text-white/60">
                        Panel Admin
                    </p>
                </div>

                <div className="flex w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:w-1/2 dark:from-gray-900 dark:to-gray-800">
                    <Card className="w-full max-w-md shadow-lg">
                        <CardHeader className="text-center">
                            <div className="mb-4 flex justify-center lg:hidden">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600">
                                    <School className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold">
                                Admin Login
                            </CardTitle>
                            <CardDescription>
                                Masukkan username dan password
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        autoFocus
                                    />
                                    {errors.username && (
                                        <p className="text-sm text-red-500">{errors.username}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-red-500">{errors.password}</p>
                                    )}
                                </div>
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <AppFooter />
        </>
    );
}
