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
        Schema::create('vehiculos', function (Blueprint $table) {
            $table->id();
            $table->string('entidad', 100);
            $table->date('fecha_evaluacion');
            $table->string('ubicacion_actual', 200);
            $table->string('tipo_vehiculo', 50);
            $table->string('tipo_combustible', 50)->nullable()->default('no tiene');
            $table->foreignId('id_marca')->constrained('marca_vehiculo')->onDelete('cascade');
            $table->string('modelo', 50)->default('no tiene');
            $table->integer('año_fabricacion');
            $table->string('placa', 20)->nullable()->default('no tiene');
            $table->string('serie_motor', 50)->nullable()->default('no tiene');
            $table->string('chasis', 50)->nullable()->default('no tiene');
            $table->string('color', 30)->nullable();
            $table->string('procedencia', 50);
            $table->string('kilometraje', 50);
            $table->decimal('precio_referencial', 10, 2);
            $table->foreignId('id_evaluador')->constrained('users')->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehiculos');
    }
};
