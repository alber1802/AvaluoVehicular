<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sistemas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_vehiculo')->constrained('vehiculos')->onDelete('cascade');
            $table->string('nombre_sistema', 50); // Ej: Motor, Dirección, Suspensión
            $table->string('componente', 100); // Ej: Alternador, Tablero, Amortiguadores
            $table->string('estado', 5)->nullable(); // B, R, RC, RR, RRe
            $table->text('observaciones');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sistemas');
    }
};
