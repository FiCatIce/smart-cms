import DashboardLayout from '@/Components/layout/DashboardLayout';
import { Head, usePage } from '@inertiajs/react';
import { 
    Users, 
    Server, 
    Phone, 
    Activity, 
    ArrowUpRight, 
    HardDrive,
    Cpu
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

export default function Dashboard({ stats }: { stats: any }) {
    const { auth } = usePage().props as any;

    return (
        <DashboardLayout>
            <Head title="Dashboard" />

            <div className="space-y-8">
                
                {/* --- WELCOME BANNER --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-white">
                            Dashboard Overview
                        </h2>
                        <p className="text-gray-400 mt-1">
                            Welcome back, <span className="text-cyan-400 font-semibold">{auth.user.name}</span>. Here is your system status.
                        </p>
                    </div>
                    
                    {/* Status Indikator Server (Dummy Visual) */}
                    <div className="flex items-center gap-2 bg-[#1e293b] px-4 py-2 rounded-full border border-gray-700 shadow-sm">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium text-gray-300">System Operational</span>
                    </div>
                </div>

                {/* --- STATS CARDS --- */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    
                    {/* CARD 1: TOTAL USERS */}
                    <Card className="bg-[#1e293b] border-gray-800 shadow-lg hover:border-cyan-500/50 transition-all cursor-default group">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-cyan-500 group-hover:text-cyan-400 transition-colors" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{stats.users}</div>
                            <p className="text-xs text-gray-500 mt-1">Active team members</p>
                        </CardContent>
                    </Card>

                    {/* CARD 2: TOTAL SERVERS */}
                    <Card className="bg-[#1e293b] border-gray-800 shadow-lg hover:border-orange-500/50 transition-all cursor-default group">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Asterisk Servers</CardTitle>
                            <Server className="h-4 w-4 text-orange-500 group-hover:text-orange-400 transition-colors" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{stats.servers}</div>
                            <p className="text-xs text-gray-500 mt-1">Connected nodes</p>
                        </CardContent>
                    </Card>

                    {/* CARD 3: EXTENSIONS */}
                    <Card className="bg-[#1e293b] border-gray-800 shadow-lg hover:border-purple-500/50 transition-all cursor-default group">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Total Extensions</CardTitle>
                            <Phone className="h-4 w-4 text-purple-500 group-hover:text-purple-400 transition-colors" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{stats.extensions}</div>
                            <p className="text-xs text-gray-500 mt-1">Registered SIP accounts</p>
                        </CardContent>
                    </Card>

                    {/* CARD 4: ACTIVE CALLS */}
                    <Card className="bg-[#1e293b] border-gray-800 shadow-lg hover:border-green-500/50 transition-all cursor-default group">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Active Calls</CardTitle>
                            <Activity className="h-4 w-4 text-green-500 group-hover:text-green-400 transition-colors" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{stats.calls}</div>
                            <p className="text-xs text-gray-500 mt-1">Live conversations</p>
                        </CardContent>
                    </Card>
                </div>

                {/* --- AREA BAWAH (PLACEHOLDER CHART / SERVER STATUS) --- */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    
                    {/* Main Chart Area (Placeholder) */}
                    <Card className="col-span-4 bg-[#0f172a] border-gray-800 shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-white">Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <div className="h-[200px] flex items-center justify-center border-2 border-dashed border-gray-800 rounded-lg bg-[#1e293b]/50">
                                <div className="text-center text-gray-500">
                                    <Activity className="mx-auto h-8 w-8 mb-2 opacity-50" />
                                    <p className="text-sm">No recent activity logs found.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Server Health Status (Placeholder) */}
                    <Card className="col-span-3 bg-[#0f172a] border-gray-800 shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-white">Server Health</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                
                                {/* Item 1 */}
                                <div className="flex items-center">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 border border-gray-700">
                                        <HardDrive className="h-4 w-4 text-cyan-500" />
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none text-white">Storage Usage</p>
                                        <p className="text-xs text-gray-500">System storage capacity</p>
                                    </div>
                                    <div className="ml-auto font-medium text-white">32%</div>
                                </div>

                                {/* Item 2 */}
                                <div className="flex items-center">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 border border-gray-700">
                                        <Cpu className="h-4 w-4 text-orange-500" />
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none text-white">CPU Load</p>
                                        <p className="text-xs text-gray-500">Average processing load</p>
                                    </div>
                                    <div className="ml-auto font-medium text-white">12%</div>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}