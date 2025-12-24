<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            [
                'name' => 'Admin',
                'phone' => '12345678',
                'email' => 'admin@admin.com',
                'role' => 'admin',
                'is_active' => true,
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );
        User::firstOrCreate(
            [
                'name' => 'Evaluador',
                'phone' => '12345678',
                'email' => 'evaluador@admin.com',
                'role' => 'evaluador',
                'is_active' => true,
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        // Ejecutar el seeder de avalúo
        $this->call([
            AvaluoSeeder::class,
        ]);
    }
}
