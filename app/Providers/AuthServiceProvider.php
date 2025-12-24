<?php

namespace App\Providers;

use App\Models\Vehiculo;
use App\Models\User;
use App\Policies\UsuarioPolicy;
use App\Policies\VehiculoPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Vehiculo::class => VehiculoPolicy::class,
        User::class => UsuarioPolicy::class,
    ];


    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
