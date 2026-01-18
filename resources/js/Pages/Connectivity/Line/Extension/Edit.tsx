import DashboardLayout from '@/Components/layout/DashboardLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/Components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';

// Props yang dikirim dari controller
interface EditProps {
    extension: {
        id: string;
        name: string;
        password: string;
        context: string;
        server_ip: string;
    };
}

export default function Edit({ extension }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        server_ip: extension.server_ip || '103.154.80.171',
        extension: extension.id, // Readonly
        password: extension.password,
        name: extension.name,        
        context: extension.context,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Menggunakan method PUT untuk update
        put(route('connectivity.line.extension.update', extension.id));
    };

    return (
        <DashboardLayout>
            <Head title="Edit Extension" />
            
            <div className="max-w-2xl mx-auto py-10">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Edit Line</h1>
                    <p className="text-muted-foreground">Modify SIP extension details.</p>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Extension Configuration</CardTitle>
                            <CardDescription>
                                Update authentication or display name.
                            </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="space-y-6">

                            {errors.error && (
                                <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-900 text-red-200">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{errors.error}</AlertDescription>
                                </Alert>
                            )}

                            {/* Server IP (Disabled for Edit usually, or let it seem editable) */}
                            <div className="space-y-2">
                                <Label>Call Server</Label>
                                <Select value={data.server_ip} onValueChange={(val) => setData('server_ip', val)}>
                                    <SelectTrigger disabled className="bg-muted">
                                        <SelectValue placeholder="Select Call Server" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="103.154.80.171">103.154.80.171</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Extension Number</Label>
                                    <Input 
                                        value={data.extension}
                                        disabled // Tidak boleh edit ID
                                        className="bg-muted text-muted-foreground"
                                    />
                                    <p className="text-[10px] text-muted-foreground">Extension number cannot be changed.</p>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="password">Secret Password</Label>
                                    <Input 
                                        id="password" 
                                        type="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className={errors.password ? "border-red-500" : ""}
                                    />
                                    {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Display Name</Label>
                                    <Input 
                                        id="name" 
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
                                            <SelectItem value="from-internal">from-internal</SelectItem>
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
                                {processing ? 'Updating...' : 'Update Extension'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </DashboardLayout>
    );
}