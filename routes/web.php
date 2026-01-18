<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Connectivity\ExtensionController;
use App\Http\Controllers\Connectivity\CallServerController;
use App\Http\Controllers\Administration\CmsAdminController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use Inertia\Inertia;


Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
});



Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    
    Route::prefix('connectivity')->name('connectivity.')->group(function () {
        
        Route::prefix('call-server')->name('call-server.')->group(function () {
            Route::get('/', [CallServerController::class, 'index'])->name('index');
            Route::get('/create', [CallServerController::class, 'create'])->name('create');
            Route::post('/', [CallServerController::class, 'store'])->name('store');
            Route::delete('/{id}', [CallServerController::class, 'destroy'])->name('destroy');
        });

        
        Route::prefix('line')->name('line.')->group(function () {
            Route::get('/extension', [ExtensionController::class, 'index'])->name('extension.index');
            Route::get('/extension/create', [ExtensionController::class, 'create'])->name('extension.create');
            Route::post('/extension', [ExtensionController::class, 'store'])->name('extension.store');
            Route::get('/extension/{id}/edit', [ExtensionController::class, 'edit'])->name('extension.edit');
            Route::put('/extension/{id}', [ExtensionController::class, 'update'])->name('extension.update');
            Route::delete('/extension/{id}', [ExtensionController::class, 'destroy'])->name('extension.destroy');
        });
    });

    
    Route::prefix('administration')->name('administration.')->group(function () {
        Route::prefix('cms-admin')->name('cms-admin.')->group(function () {
            Route::get('/', [CmsAdminController::class, 'index'])->name('index');
            Route::get('/create', [CmsAdminController::class, 'create'])->name('create');
            Route::post('/', [CmsAdminController::class, 'store'])->name('store');
            Route::delete('/{id}', [CmsAdminController::class, 'destroy'])->name('destroy');
            Route::get('/{id}/edit', [CmsAdminController::class, 'edit'])->name('edit');
            Route::put('/{id}', [CmsAdminController::class, 'update'])->name('update');
        });
    });

});

require __DIR__.'/auth.php';