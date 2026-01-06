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
        Schema::create('avaluo_compartido', function (Blueprint $table) {
            $table->id();
            $table->foreignId('avaluo_id')->constrained('avaluo')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('token')->nullable()->unique();
            $table->dateTime('fecha_inicio')->nullable();
            $table->dateTime('fecha_fin')->nullable();
            $table->string('estado')->default('vencido'); // activo, vencido, renovado
            $table->dateTime('fecha_compartido');
            $table->string('motivo');
            $table->integer('contador_vistas')->nullable()->default(0);
            $table->text('observaciones')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('avaluo_compartido');
    }
};
