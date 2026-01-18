import DashboardLayout from '@/Components/layout/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/Components/ui/card';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        ho_site: '',
        name: '',
        ip_address: '',
        port: '5060',
        description: ''
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('connectivity.call-server.store'));
    };

    return (
        <DashboardLayout>
            <Head title="New Call Server" />
            
            <div className="max-w-2xl mx-auto py-10">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">New Call Server</h1>
                    <p className="text-muted-foreground">Register a new PBX node or gateway.</p>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Call Server Details</CardTitle>
                            <CardDescription>
                                Enter connectivity information for the new server.
                            </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="space-y-6">
                            
                            {/* HO SITE (Optional) */}
                            <div className="space-y-2">
                                <Label>Head Office Site</Label>
                                <Select onValueChange={(val) => setData('ho_site', val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select HO site (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="HO Jakarta">HO Jakarta</SelectItem>
                                        <SelectItem value="HO Jakarta HA">HO Jakarta HA</SelectItem>
                                        <SelectItem value="HO Surabaya FO">HO Surabaya FO</SelectItem>
                                        <SelectItem value="HO Bandung Basic">HO Bandung Basic</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-[10px] text-muted-foreground">Which HO site is this server deployed at?</p>
                            </div>

                            {/* NAME */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                                <Input 
                                    id="name" 
                                    placeholder="e.g. SmartUCX-1" 
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className={errors.name ? "border-red-500" : ""}
                                />
                                {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                            </div>

                            {/* HOST & PORT */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-2 space-y-2">
                                    <Label htmlFor="ip">Host / IP Address <span className="text-red-500">*</span></Label>
                                    <Input 
                                        id="ip" 
                                        placeholder="e.g. 103.154.80.172" 
                                        value={data.ip_address}
                                        onChange={e => setData('ip_address', e.target.value)}
                                        className={errors.ip_address ? "border-red-500" : ""}
                                    />
                                    {errors.ip_address && <span className="text-xs text-red-500">{errors.ip_address}</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="port">Port</Label>
                                    <Input 
                                        id="port" 
                                        placeholder="5060" 
                                        value={data.port}
                                        onChange={e => setData('port', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea 
                                    id="description" 
                                    placeholder="Additional notes about this server..."
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                            </div>

                        </CardContent>

                        <CardFooter className="flex justify-between bg-muted/50 px-6 py-4">
                            <Button variant="ghost" type="button" asChild>
                                <Link href={route('connectivity.call-server.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing} className="bg-cyan-600 hover:bg-cyan-700">
                                {processing ? 'Saving...' : 'Create Server'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </DashboardLayout>
    );
}