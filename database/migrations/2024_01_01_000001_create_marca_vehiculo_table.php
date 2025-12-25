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
        Schema::create('marca_vehiculo', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->decimal('tasa_k', 8, 2); // 0.05 o 0.04
            $table->decimal('valor_residual', 8, 2);
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marca_vehiculo');
    }
};
