import React from 'react';
import DashboardLayout from '@/Components/layout/DashboardLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/Components/ui/card"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/Components/ui/table"
import { 
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, 
    AlertDialogTrigger 
} from "@/Components/ui/alert-dialog"
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';

interface Extension {
    id: string;
    transport: string;
    context: string;
    callerid: string;
}

interface Props {
    extensions: Extension[];
}

export default function Index({ extensions }: Props) {
    // Ambil flash message dari session (success/error)
    const { flash } = usePage().props as { flash?: { success?: string, error?: string } };

    const handleDelete = (id: string) => {
        router.delete(route('connectivity.line.extension.destroy', id));
    };

    return (
        <DashboardLayout>
            <Head title="Extension List" />

            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Extensions</h2>
                        <p className="text-muted-foreground">Manage WebRTC and SIP extensions.</p>
                    </div>
                    <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
                        <Link href={route('connectivity.line.extension.create')}>
                           <Plus className="mr-2 h-4 w-4"/> Create Extension
                        </Link>
                    </Button>
                </div>

                {/* Notifikasi Sukses */}
                {flash?.success && (
                <Alert className="bg-green-900/20 border-green-900 text-green-200">
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{flash.success}</AlertDescription>
                </Alert>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Registered Lines</CardTitle>
                        <CardDescription>List of all extensions configured in Asterisk.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Extension</TableHead>
                                    <TableHead>Caller ID</TableHead>
                                    <TableHead>Context</TableHead>
                                    <TableHead>Transport</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {extensions.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                            No extensions found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    extensions.map((ext) => (
                                        <TableRow key={ext.id}>
                                            <TableCell className="font-bold">{ext.id}</TableCell>
                                            <TableCell>{ext.callerid ? ext.callerid.replace(/"/g, '') : '-'}</TableCell>
                                            <TableCell>{ext.context}</TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/20">
                                                    {ext.transport}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                {/* Tombol Edit */}
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={route('connectivity.line.extension.edit', ext.id)}>
                                                        <Pencil className="h-4 w-4 text-orange-400" />
                                                    </Link>
                                                </Button>

                                                {/* Tombol Delete dengan Konfirmasi */}
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <Trash2 className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete 
                                                                extension <b>{ext.id}</b> and remove it from the server.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction 
                                                                className="bg-red-600 hover:bg-red-700"
                                                                onClick={() => handleDelete(ext.id)}
                                                            >
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}