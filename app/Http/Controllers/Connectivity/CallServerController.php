<?php

namespace App\Http\Controllers\Connectivity;

use App\Http\Controllers\Controller;
use App\Models\CallServer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CallServerController extends Controller
{
    /**
     * Menampilkan daftar Call Server sesuai Workspace User.
     */
    public function index()
    {
        // 1. Ambil ID Workspace user yang sedang login
        $userWorkspace = Auth::user()->workspace_id;

        // 2. Query hanya server milik workspace tersebut
        $servers = CallServer::where('workspace_id', $userWorkspace)
            ->latest()
            ->get()
            ->map(function ($server) {
                return [
                    'id' => $server->id,
                    'ho_site' => $server->ho_site ?? '-',
                    'name' => $server->name,
                    'ip_address' => $server->ip_address,
                    'port' => $server->port,
                    'is_active' => $server->is_active,
                    'description' => $server->description,
                    // Dummy counts (Nanti bisa diupdate pakai relationship count)
                    'ext_count' => 0, 
                    'lines_count' => 0,
                    'trunks_count' => 0,
                ];
            });

        return Inertia::render('Connectivity/CallServer/Index', [
            'servers' => $servers
        ]);
    }

    /**
     * Menampilkan Form Create.
     */
    public function create()
    {
        return Inertia::render('Connectivity/CallServer/Create');
    }

    /**
     * Menyimpan Data Server Baru.
     */
    public function store(Request $request)
    {
        // 1. Validasi Input
        $request->validate([
            'name' => 'required|string|max:255',
            'ip_address' => 'required|ip', // Validasi format IP Address
            'port' => 'numeric|nullable',
            'ho_site' => 'nullable|string',
            'description' => 'nullable|string|max:500',
        ]);

        // 2. Ambil Workspace ID User
        // Jika user belum punya workspace (kasus akun lama), buatkan default/null dulu
        $workspaceId = Auth::user()->workspace_id;

        // 3. Simpan ke Database
        CallServer::create([
            'workspace_id' => $workspaceId, // <--- PENTING: Menandai kepemilikan
            'ho_site' => $request->ho_site,
            'name' => $request->name,
            'ip_address' => $request->ip_address,
            'port' => $request->port ?? 5060, // Default SIP Port
            'description' => $request->description,
            'is_active' => true
        ]);

        return redirect()->route('connectivity.call-server.index')
            ->with('success', 'Call Server created successfully in your workspace!');
    }

    /**
     * Menghapus Server.
     */
    public function destroy($id)
    {
        // 1. Cari Server berdasarkan ID DAN Workspace ID
        // Ini mencegah user menghapus server milik workspace orang lain (Security)
        $server = CallServer::where('id', $id)
            ->where('workspace_id', Auth::user()->workspace_id)
            ->firstOrFail();

        // 2. Hapus
        $server->delete();

        return redirect()->back()->with('success', 'Server deleted successfully.');
    }
}