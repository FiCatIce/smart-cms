<?php

namespace App\Http\Controllers\Administration;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class CmsAdminController extends Controller
{
    public function index()
{
    $currentUser = auth()->user();
    $myRole = strtolower($currentUser->role); 

    // --- DIAGNOSA: SAYA KOMEN DULU FILTER WORKSPACE NYA ---
    // $query = User::where('workspace_id', $currentUser->workspace_id);
    
    // GANTI JADI INI (Ambil semua user di database tanpa peduli kantor)
    $query = User::query(); 

    // --- LOGIKA HIERARKI (TETAP SAMA) ---
    
    // 1. SUPER ADMIN: Lihat Semua (Termasuk teman beda kantor pun kelihatan dulu buat tes)
    if (str_contains($myRole, 'super')) {
        // No filter
    }
    // 2. ADMIN: Lihat Admin & Operator
    elseif ($myRole === 'admin') {
        $query->where('role', 'not like', '%super%');
    }
    // 3. OPERATOR: Lihat Operator saja
    else {
        $query->where('role', 'like', '%operator%');
    }

    $users = $query->latest()->get();

    return Inertia::render('Administration/CmsAdmin/Index', [
        'users' => $users
    ]);
}
    public function create()
    {
        return Inertia::render('Administration/CmsAdmin/Create');
    }

    public function store(Request $request)
{
    // 1. Validasi (Hapus validasi account_type)
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'role' => 'required|string|in:super-admin,admin,operator',
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    // 2. Ambil Workspace ID milik Admin yang sedang login
    $workspaceId = auth()->user()->workspace_id;

    // Safety Check: Kalau admin lama belum punya workspace, bikinin sekarang
    if (!$workspaceId) {
        $workspaceId = (string) Str::uuid();
        auth()->user()->update(['workspace_id' => $workspaceId]);
    }

    // 3. Buat User Baru (Otomatis masuk ke workspace yang sama)
    User::create([
        'name' => $request->name,
        'email' => $request->email,
        'role' => $request->role,
        'password' => Hash::make($request->password),
        'is_active' => true,
        'workspace_id' => $workspaceId, // <--- KUNCI: ID SAMA
    ]);

    return redirect()->route('administration.cms-admin.index')
        ->with('success', 'New team member added successfully.');
}

    public function edit($id)
{
    // Cari user, pastikan dalam satu workspace (kecuali Super Admin mungkin bisa edit lintas workspace, tapi amannya satu workspace dulu)
    $user = User::where('id', $id)
        ->where('workspace_id', auth()->user()->workspace_id)
        ->firstOrFail();

    return Inertia::render('Administration/CmsAdmin/Edit', [
        'user_to_edit' => $user // Kirim data user ke frontend
    ]);
}

    public function update(Request $request, $id)
    {
    $user = User::where('id', $id)
        ->where('workspace_id', auth()->user()->workspace_id)
        ->firstOrFail();

    $request->validate([
        'name' => 'required|string|max:255',
        // Email harus unik, TAPI abaikan untuk user ini sendiri (biar gak error kalau gak ganti email)
        'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
        'role' => 'required|in:super-admin,admin,operator',
        // Password nullable (kalau kosong berarti gak mau ganti password)
        'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
    ]);

    // Update data dasar
    $user->name = $request->name;
    $user->email = $request->email;
    $user->role = $request->role;

    // Logika Ganti Password
    // Hanya update password KALAU kolom password diisi
    if ($request->filled('password')) {
        $user->password = Hash::make($request->password);
    }

    $user->save();

    return redirect()->route('administration.cms-admin.index')
        ->with('success', 'User updated successfully.');
    }
    public function destroy($id)
    {
        // Cegah hapus diri sendiri
        if (auth()->id() == $id) {
            return back()->with('error', 'You cannot delete your own account while logged in.');
        }

        User::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'User deleted successfully.');
    }
}