import DashboardLayout from '@/Components/layout/DashboardLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/Components/ui/card';
import { Plus, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';

interface Server {
    ip_address: string;
    name: string;
    ho_site?: string;
}

interface Props {
    servers: Server[];
}

export default function Create({ servers }: Props) { // Terima props servers
    const { data, setData, post, processing, errors } = useForm({
        server_ip: '', // Kosongkan default biar user wajib pilih
        extension: '',
        password: '',
        name: '',        
        context: 'from-internal',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('connectivity.line.extension.store'));
    };

    return (
        <DashboardLayout>
            <Head title="Create Extension" />
            
            <div className="max-w-2xl mx-auto py-10">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">New Line</h1>
                    <p className="text-muted-foreground">Add a new SIP extension to a Call Server.</p>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Extension Details</CardTitle>
                            <CardDescription>
                                Configure the extension number, authentication, and server mapping.
                            </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="space-y-6">

                            {/* --- AREA ERROR GLOBAL (BARU) --- */}
                            {/* Ini akan memunculkan pesan jika database gagal simpan */}
                            {errors.error && (
                                <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-900 text-red-200">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>
                                        {errors.error}
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* 1. CALL SERVER */}
                            <div className="space-y-2">
                            <Label htmlFor="server_ip">Call Server <span className="text-red-500">*</span></Label>
                            <div className="flex gap-2">
                                <Select 
                                    value={data.server_ip} 
                                    onValueChange={(val) => setData('server_ip', val)}
                                >
                                    <SelectTrigger id="server_ip" className="flex-1">
                                        <SelectValue placeholder="Select Call Server" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {servers.length === 0 ? (
                                            <SelectItem value="disabled" disabled>No active servers found</SelectItem>
                                        ) : (
                                            servers.map((server) => (
                                                <SelectItem key={server.ip_address} value={server.ip_address}>
                                                    {server.name} ({server.ip_address}) {server.ho_site ? `- ${server.ho_site}` : ''}
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                                
                                <Button type="button" variant="outline" size="icon" asChild title="Add Server">
                                    <Link href={route('connectivity.call-server.create')}>
                                        <Plus className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                            {errors.server_ip && <span className="text-xs text-red-500">{errors.server_ip}</span>}
                        </div>

                            {/* 2. EXTENSION & PASSWORD */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="extension">Extension Number <span className="text-red-500">*</span></Label>
                                    <Input 
                                        id="extension" 
                                        placeholder="e.g. 1001" 
                                        value={data.extension}
                                        onChange={e => setData('extension', e.target.value)}
                                        className={errors.extension ? "border-red-500" : ""}
                                    />
                                    {errors.extension && <span className="text-xs text-red-500">{errors.extension}</span>}
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="password">Secret Password <span className="text-red-500">*</span></Label>
                                    <Input 
                                        id="password" 
                                        type="password"
                                        placeholder="••••••••" 
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className={errors.password ? "border-red-500" : ""}
                                    />
                                    {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
                                </div>
                            </div>

                            {/* 3. NAME & CONTEXT */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Display Name <span className="text-red-500">*</span></Label>
                                    <Input 
                                        id="name" 
                                        placeholder="e.g. Meeting Room" 
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className={errors.name ? "border-red-500" : ""}
                                    />
                                    {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Context</Label>
                                    <Select value={data.context} onValueChange={(val) => setData('context', val)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="from-internal">from-internal (Default)</SelectItem>
                                            <SelectItem value="from-external">from-external</SelectItem>
                                            <SelectItem value="turret-features">turret-features</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                        </CardContent>

                        <CardFooter className="flex justify-between bg-muted/50 px-6 py-4">
                            <Button variant="ghost" type="button" asChild>
                                <Link href={route('connectivity.line.extension.index')}>Cancel</Link>
                            </Button>
                            
                            <Button type="submit" disabled={processing} className="bg-cyan-600 hover:bg-cyan-700">
                                {processing ? 'Creating...' : 'Create Extension'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </DashboardLayout>
    );
}