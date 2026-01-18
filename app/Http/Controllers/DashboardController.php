<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        $totalUsers = User::where('workspace_id', $user->workspace_id)->count();

        $totalServers = 0; 
        $totalExtensions = 0;
        $activeCalls = 0; 

        return Inertia::render('Dashboard', [
            'stats' => [
                'users' => $totalUsers,
                'servers' => $totalServers,
                'extensions' => $totalExtensions,
                'calls' => $activeCalls,
            ]
        ]);
    }
}