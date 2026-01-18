import DashboardLayout from '@/Components/layout/DashboardLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/Components/ui/select';
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardFooter 
} from '@/Components/ui/card';
import { ShieldAlert, ShieldCheck, User, ArrowLeft } from 'lucide-react';

export default function Create() {
    const { auth } = usePage().props as any;
    
    // Normalisasi role user yang sedang login (biar aman dari typo database)
    const currentUserRole = auth.user.role.toLowerCase(); 

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        role: 'operator', // Default role paling aman (Operator)
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('administration.cms-admin.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <DashboardLayout>
            <Head title="Create New User" />
            
            <div className="max-w-2xl mx-auto py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Button variant="ghost" asChild className="text-gray-400 hover:text-white pl-0 hover:bg-transparent">
                        <Link href={route('administration.cms-admin.index')} className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to User List
                        </Link>
                    </Button>
                    {/* Ganti Member jadi User */}
                    <h1 className="text-3xl font-bold text-white mt-2">Add New User</h1>
                    <p className="text-gray-400">
                        Add a new user to <span className="text-cyan-400 font-semibold">{auth.user.name}'s</span> workspace.
                    </p>
                </div>

                <form onSubmit={submit}>
                    <Card className="bg-[#0f172a] border-gray-800 shadow-xl">
                        <CardHeader className="border-b border-gray-800 pb-6">
                            <CardTitle className="text-white">User Details</CardTitle>
                            <CardDescription className="text-gray-500">
                                This user will share the same Extensions & Server data.
                            </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="space-y-6 pt-6">

                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                                <Input 
                                    id="name" 
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value)} 
                                    placeholder="e.g. John Doe"
                                    className="bg-[#1e293b] border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20"
                                />
                                {errors.name && <span className="text-xs text-red-400">{errors.name}</span>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                                <Input 
                                    id="email" 
                                    type="email"
                                    value={data.email} 
                                    onChange={e => setData('email', e.target.value)} 
                                    placeholder="user@company.com"
                                    className="bg-[#1e293b] border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20"
                                />
                                {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
                            </div>

                            {/* Role Selection */}
                            <div className="space-y-2">
                                <Label className="text-gray-300">Assign Role</Label>
                                <Select 
                                    onValueChange={(val) => setData('role', val)} 
                                    defaultValue={data.role}
                                >
                                    <SelectTrigger className="bg-[#1e293b] border-gray-700 text-white focus:ring-cyan-500/20 h-11">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    
                                    <SelectContent className="bg-[#1e293b] border-gray-700 text-white">
                                        
                                        {/* LOGIKA HIERARKI ROLE */}
                                        
                                        {/* Opsi Super Admin: HANYA muncul jika yang login adalah Super Admin */}
                                        {currentUserRole === 'super-admin' && (
                                            <SelectItem value="super-admin" className="focus:bg-gray-800 focus:text-white cursor-pointer">
                                                <div className="flex items-center gap-2 text-red-400 font-medium">
                                                    <ShieldAlert className="w-4 h-4" />
                                                    Super Admin (Full Access)
                                                </div>
                                            </SelectItem>
                                        )}

                                        {/* Opsi Admin: Muncul jika Super Admin ATAU Admin */}
                                        {(currentUserRole === 'super-admin' || currentUserRole === 'admin') && (
                                            <SelectItem value="admin" className="focus:bg-gray-800 focus:text-white cursor-pointer">
                                                <div className="flex items-center gap-2 text-cyan-400 font-medium">
                                                    <ShieldCheck className="w-4 h-4" />
                                                    Admin (Manage Servers)
                                                </div>
                                            </SelectItem>
                                        )}

                                        {/* Opsi Operator: Muncul untuk SEMUA level */}
                                        <SelectItem value="operator" className="focus:bg-gray-800 focus:text-white cursor-pointer">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <User className="w-4 h-4" />
                                                Operator (View Only)
                                            </div>
                                        </SelectItem>

                                    </SelectContent>
                                </Select>
                                {errors.role && <span className="text-xs text-red-400">{errors.role}</span>}
                            </div>

                            {/* Password */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-gray-300">Password</Label>
                                    <Input 
                                        id="password" type="password"
                                        value={data.password} onChange={e => setData('password', e.target.value)} 
                                        className="bg-[#1e293b] border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20"
                                    />
                                    {errors.password && <span className="text-xs text-red-400">{errors.password}</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm" className="text-gray-300">Confirm Password</Label>
                                    <Input 
                                        id="confirm" type="password"
                                        value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} 
                                        className="bg-[#1e293b] border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20"
                                    />
                                </div>
                            </div>

                        </CardContent>

                        <CardFooter className="flex justify-between border-t border-gray-800 px-6 py-4 bg-[#0f172a]">
                            <Button variant="ghost" type="button" asChild className="text-gray-400 hover:text-white hover:bg-white/5">
                                <Link href={route('administration.cms-admin.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8">
                                {processing ? 'Adding...' : 'Add User'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </DashboardLayout>
    );
}