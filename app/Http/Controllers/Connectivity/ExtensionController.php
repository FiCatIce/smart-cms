<?php

namespace App\Http\Controllers\Connectivity;

use App\Http\Controllers\Controller;
use App\Models\PsAor;
use App\Models\PsAuth;
use App\Models\PsEndpoint;
use App\Models\CallServer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ExtensionController extends Controller
{
    public function index()
    {
        $extensions = PsEndpoint::orderBy('id', 'asc')->get();
        return Inertia::render('Connectivity/Line/Extension/Index', [
            'extensions' => $extensions
        ]);
    }

    public function create()
    {
        $servers = CallServer::where('is_active', true)->select('ip_address', 'name', 'ho_site')->get();

        return Inertia::render('Connectivity/Line/Extension/Create', [
            'servers' => $servers // Kirim ke Frontend
        ]);    
    }

    public function store(Request $request)
    {
        $request->validate([
            'extension' => 'required|numeric|unique:ps_endpoints,id',
            'password' => 'required',
            'name' => 'required|string|max:50',
            'server_ip' => 'required|ip',
        ]);

        try {
            DB::transaction(function () use ($request) {
                $ext = $request->extension;
                $pass = $request->password;
                $callerid = "\"{$request->name}\" <$ext>";
                $context = $request->context ?? 'from-internal';

                // 1. AOR
                PsAor::create([
                    'id' => $ext,
                    'max_contacts' => 100,
                    'remove_existing' => 'yes',
                    'qualify_frequency' => 60
                ]);

                // 2. Auth
                PsAuth::create([
                    'id' => $ext,
                    'auth_type' => 'userpass',
                    'username' => $ext,
                    'password' => $pass
                ]);

                // 3. Endpoint (WebRTC Ready - Versi Safe DB)
                PsEndpoint::create([
                    'id' => $ext,
                    'transport' => 'transport-wss',
                    'aors' => $ext,
                    'auth' => $ext,
                    'context' => $context,
                    'callerid' => $callerid,
                    'disallow' => 'all',
                    'allow' => 'opus,ulaw,alaw',
                    'media_encryption' => 'dtls',
                    'dtls_verify' => 'fingerprint',
                    'dtls_setup' => 'actpass',
                    'dtls_rekey' => '0',
                    'direct_media' => 'no',
                    'force_rport' => 'yes',
                    'rewrite_contact' => 'yes',
                    'rtp_symmetric' => 'yes',
                    'ice_support' => 'yes',
                    'use_avpf' => 'yes',
                    // HAPUS kolom-kolom yang tidak ada di database kamu:
                    // 'webrtc' => 'yes',
                    // 'device_state_busy_at' => 1,
                    // 'authenticate_qualify' => 'no' 
                ]);
            });

            return redirect()->route('connectivity.line.extension.index')
                ->with('success', "Extension $request->extension Created Successfully!");

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Database Error: ' . $e->getMessage()]);
        }
    }


    public function edit($id)
    {
        // Ambil data dari 3 tabel
        $endpoint = PsEndpoint::findOrFail($id);
        $auth = PsAuth::where('id', $id)->first();
        
        // Pecah CallerID format "Nama" <1001> menjadi "Nama" saja untuk form
        $name = '';
        if (preg_match('/"([^"]+)"/', $endpoint->callerid, $matches)) {
            $name = $matches[1];
        }

        $servers = CallServer::where('is_active', true)->select('ip_address', 'name')->get();

        return Inertia::render('Connectivity/Line/Extension/Edit', [
            'extension' => [
                'id' => $endpoint->id,
                'name' => $name,
                'password' => $auth ? $auth->password : '',
                'context' => $endpoint->context,
                // Server IP saat ini (nanti kita ambil dari endpoint/contact jika ada relasi)
                // Untuk sementara default atau ambil dari input sebelumnya
                'server_ip' => '103.154.80.171', 
            ],
            'servers' => $servers // Kirim list server
        ]);
    }

    // --- FITUR BARU: UPDATE DATA ---
    public function update(Request $request, $id)
    {
        $request->validate([
            // Extension ID tidak divalidasi unique karena tidak boleh diubah
            'password' => 'required',
            'name' => 'required|string|max:50',
        ]);

        try {
            DB::transaction(function () use ($request, $id) {
                
                // Update Password di tabel Auth
                PsAuth::where('id', $id)->update([
                    'password' => $request->password
                ]);

                // Update Name & Context di tabel Endpoint
                $callerid = "\"{$request->name}\" <$id>";
                
                PsEndpoint::where('id', $id)->update([
                    'callerid' => $callerid,
                    'context' => $request->context ?? 'from-internal',
                ]);
                
                // Server IP & Transport tidak diupdate karena hardcoded WebRTC
            });

            return redirect()->route('connectivity.line.extension.index')
                ->with('success', "Extension $id Updated Successfully!");

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Update Failed: ' . $e->getMessage()]);
        }
    }

    // --- FITUR BARU: DELETE ---
    public function destroy($id)
    {
        try {
            DB::transaction(function () use ($id) {
                PsEndpoint::where('id', $id)->delete();
                PsAuth::where('id', $id)->delete();
                PsAor::where('id', $id)->delete();
            });

            return redirect()->route('connectivity.line.extension.index')
                ->with('success', "Extension $id Deleted Successfully!");

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Delete Failed: ' . $e->getMessage()]);
        }
    }
}