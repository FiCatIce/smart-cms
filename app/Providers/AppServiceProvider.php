<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Validation\Rules\Password; 
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
   {
        // Aturan Global Password: Min 8, Ada Huruf, Angka, Simbol
        Password::defaults(function () {
            return Password::min(8)
                ->letters()
                ->mixedCase()
                ->numbers()
                ->symbols()
                ->uncompromised(); // Cek database password bocor global
        });
    }
}
