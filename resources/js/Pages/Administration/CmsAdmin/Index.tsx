import { useState } from 'react';
import DashboardLayout from '@/Components/layout/DashboardLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/Components/ui/card";
import { 
    Plus, 
    Pencil, 
    Trash2, 
    Search, 
    ShieldAlert, 
    ShieldCheck, 
    User,
    Crown // Icon Mahkota untuk Super Admin
} from 'lucide-react';

interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
    workspace_id: string;
    created_at: string;
}

interface Props {
    users: UserData[];
}

export default function Index({ users }: Props) {
    const { auth } = usePage().props as any;
    const currentUser = auth.user;
    
    // State Search
    const [search, setSearch] = useState('');

    // Filter Logic
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id: number) => {
        if (confirm('Are you sure? This action cannot be undone.')) {
            router.delete(route('administration.cms-admin.destroy', id));
        }
    };

    // --- LOGIKA BADGE ROLE (YANG DIPERBAIKI) ---
    const getRoleBadge = (role: string) => {
        // Kita paksa lowercase biar cocokan datanya akurat
        const cleanRole = role.toLowerCase();

        if (cleanRole === 'super-admin' || cleanRole === 'super admin') {
            return (
                <Badge className="bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-900 gap-1.5 pr-3">
                    <Crown className="w-3.5 h-3.5 text-red-500" /> 
                    SUPER ADMIN
                </Badge>
            );
        } else if (cleanRole === 'admin') {
            return (
                <Badge className="bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/30 border border-cyan-900 gap-1.5 pr-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" /> 
                    ADMIN
                </Badge>
            );
        } else {
            return (
                <Badge variant="outline" className="text-gray-400 border-gray-700 gap-1.5 pr-3">
                    <User className="w-3.5 h-3.5" /> 
                    OPERATOR
                </Badge>
            );
        }
    };

    return (
        <DashboardLayout>
            <Head title="User Management" />

            <div className="space-y-6">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-white">Team Members</h2>
                        <p className="text-gray-400 mt-1">
                            Manage access and control user roles.
                        </p>
                    </div>

                    {/* Tombol Add (Hanya Super Admin) */}
                    {currentUser.role === 'super-admin' && (
                        <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white font-bold border-none shadow-lg shadow-orange-900/20">
                            <Link href={route('administration.cms-admin.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add New Member
                            </Link>
                        </Button>
                    )}
                </div>

                {/* --- SEARCH BAR (DARK MODE) --- */}
                <div className="flex items-center gap-4 bg-[#0f172a] p-4 rounded-xl border border-gray-800 shadow-sm">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Search user..."
                            className="pl-10 bg-[#1e293b] border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20 rounded-lg h-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* --- TABLE CARD (DARK MODE) --- */}
                <Card className="bg-[#0f172a] border-gray-800 shadow-xl overflow-hidden">
                    <CardHeader className="border-b border-gray-800 pb-4">
                        <CardTitle className="text-lg text-white">Users Directory</CardTitle>
                        <CardDescription className="text-gray-500">
                            Total {filteredUsers.length} active users found.
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-[#1e293b]/50">
                                <TableRow className="hover:bg-transparent border-gray-800">
                                    <TableHead className="text-gray-400 font-medium pl-6">Profile</TableHead>
                                    <TableHead className="text-gray-400 font-medium">Role Access</TableHead>
                                    <TableHead className="text-gray-400 font-medium">Email</TableHead>
                                    <TableHead className="text-gray-400 font-medium">Joined</TableHead>
                                    <TableHead className="text-right text-gray-400 font-medium pr-6">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <TableRow key={user.id} className="group hover:bg-[#1e293b] border-gray-800 transition-colors">
                                            
                                            {/* NAME & AVATAR */}
                                            <TableCell className="pl-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {/* Avatar Warna Warni Sesuai Role */}
                                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg
                                                        ${user.role === 'super-admin' ? 'bg-gradient-to-br from-red-600 to-red-800' : 
                                                          user.role === 'admin' ? 'bg-gradient-to-br from-cyan-600 to-cyan-800' : 
                                                          'bg-gradient-to-br from-slate-600 to-slate-800'}`}>
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-white">{user.name}</div>
                                                        <div className="text-xs text-gray-500">ID: {user.id}</div>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* ROLE BADGE */}
                                            <TableCell>
                                                {getRoleBadge(user.role)}
                                            </TableCell>

                                            {/* EMAIL */}
                                            <TableCell className="text-gray-300">
                                                {user.email}
                                            </TableCell>

                                            {/* DATE */}
                                            <TableCell className="text-gray-500 text-sm">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </TableCell>
                                            
                                            {/* ACTIONS (LOGIC SUPER ADMIN) */}
                                            <TableCell className="text-right pr-6">
                                                {currentUser.role === 'super-admin' ? (
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {/* Edit (Pensil Orange) */}
                                                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-orange-400 hover:text-orange-300 hover:bg-orange-500/20">
                                                            <Link href={route('administration.cms-admin.edit', user.id)}>
                                                                <Pencil className="h-4 w-4" />
                                                            </Link>
                                                        </Button>

                                                        {/* Delete (Sampah Merah) */}
                                                        {currentUser.id !== user.id && (
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon" 
                                                                className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                                                onClick={() => handleDelete(user.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-gray-600 italic">View Only</span>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-32 text-center border-gray-800">
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <Search className="h-8 w-8 mb-2 opacity-20" />
                                                <p>No users found matching "{search}".</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}