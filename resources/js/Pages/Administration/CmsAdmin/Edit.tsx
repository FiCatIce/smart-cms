import DashboardLayout from '@/Components/layout/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/Components/ui/card';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Info } from 'lucide-react';

// Terima props user_to_edit dari Controller
export default function Edit({ user_to_edit }: { user_to_edit: any }) {
    
    const { data, setData, put, processing, errors } = useForm({
        name: user_to_edit.name,
        email: user_to_edit.email,
        role: user_to_edit.role,
        password: '',             // Kosongkan defaultnya
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Gunakan PUT untuk update
        put(route('administration.cms-admin.update', user_to_edit.id));
    };

    return (
        <DashboardLayout>
            <Head title="Edit User" />
            
            <div className="max-w-2xl mx-auto py-10">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Edit User</h1>
                    <p className="text-muted-foreground">Update profile or reset password.</p>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Details: {user_to_edit.name}</CardTitle>
                            <CardDescription>Make changes to the user account.</CardDescription>
                        </CardHeader>
                        
                        <CardContent className="space-y-6">
                            
                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input 
                                    id="name" 
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value)} 
                                />
                                {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input 
                                    id="email" 
                                    type="email"
                                    value={data.email} 
                                    onChange={e => setData('email', e.target.value)} 
                                />
                                {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                            </div>

                            {/* Role */}
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Select onValueChange={(val) => setData('role', val)} defaultValue={data.role}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={data.role} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="super-admin">Super Admin</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="operator">Operator</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Divider Password */}
                            <div className="border-t pt-4">
                                <Label className="text-lg font-semibold text-orange-500">Reset Password</Label>
                                <Alert className="mt-2 mb-4 bg-blue-50 border-blue-200">
                                    <Info className="h-4 w-4 text-blue-600" />
                                    <AlertDescription className="text-blue-700 text-xs">
                                        Leave these fields <b>empty</b> if you don't want to change the password.
                                    </AlertDescription>
                                </Alert>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="password">New Password</Label>
                                        <Input 
                                            id="password" type="password"
                                            placeholder="Set new password..."
                                            value={data.password} onChange={e => setData('password', e.target.value)} 
                                        />
                                        {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm">Confirm New Password</Label>
                                        <Input 
                                            id="confirm" type="password"
                                            placeholder="Repeat password..."
                                            value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} 
                                        />
                                    </div>
                                </div>
                            </div>

                        </CardContent>

                        <CardFooter className="flex justify-between bg-muted/50 px-6 py-4">
                            <Button variant="ghost" type="button" asChild>
                                <Link href={route('administration.cms-admin.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing} className="bg-cyan-600 hover:bg-cyan-700">
                                Save Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </DashboardLayout>
    );
}