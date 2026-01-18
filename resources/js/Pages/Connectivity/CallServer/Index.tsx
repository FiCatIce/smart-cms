import DashboardLayout from '@/Components/layout/DashboardLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Checkbox } from '@/Components/ui/checkbox';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/Components/ui/table"
import { 
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from "@/Components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Search, Filter, Trash2, Eye, Pencil } from 'lucide-react';
import { Badge } from "@/Components/ui/badge";

export default function Index({ servers }: { servers: any[] }) {
    const { flash } = usePage().props as any;

    const deleteServer = (id: number) => {
        if(confirm('Are you sure you want to delete this server?')) {
            router.delete(route('connectivity.call-server.destroy', id));
        }
    };

    return (
        <DashboardLayout>
            <Head title="Call Servers" />

            <div className="p-6 space-y-6">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Call Servers</h1>
                        <p className="text-muted-foreground">Manage your PBX nodes and sites.</p>
                    </div>
                    <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
                        <Link href={route('connectivity.call-server.create')}>
                            <Plus className="mr-2 h-4 w-4" /> New Call Server
                        </Link>
                    </Button>
                </div>

                {/* Filter Bar */}
                <div className="flex gap-2">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search servers..." className="pl-8" />
                    </div>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </div>

                {/* Main Table */}
                <div className="rounded-md border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">
                                    <Checkbox />
                                </TableHead>
                                <TableHead>HO Site</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Host / IP</TableHead>
                                <TableHead>Port</TableHead>
                                <TableHead>Active</TableHead>
                                <TableHead className="text-center">Ext</TableHead>
                                <TableHead className="text-center">Lines</TableHead>
                                <TableHead className="text-center">Trunks</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {servers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={10} className="text-center h-24 text-muted-foreground">
                                        No call servers found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                servers.map((server) => (
                                    <TableRow key={server.id}>
                                        <TableCell><Checkbox /></TableCell>
                                        <TableCell className="font-medium text-muted-foreground">{server.ho_site}</TableCell>
                                        <TableCell className="font-bold text-foreground">{server.name}</TableCell>
                                        <TableCell>{server.ip_address}</TableCell>
                                        <TableCell>{server.port}</TableCell>
                                        <TableCell>
                                            {server.is_active ? (
                                                <Badge className="bg-green-500/15 text-green-500 hover:bg-green-500/25 border-0">Active</Badge>
                                            ) : (
                                                <Badge variant="destructive">Inactive</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">{server.ext_count}</TableCell>
                                        <TableCell className="text-center">{server.lines_count}</TableCell>
                                        <TableCell className="text-center">{server.trunks_count}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Eye className="mr-2 h-4 w-4" /> View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => deleteServer(server.id)}>
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                
                <div className="text-xs text-muted-foreground">
                    {servers.length} server(s) registered.
                </div>
            </div>
        </DashboardLayout>
    );
}