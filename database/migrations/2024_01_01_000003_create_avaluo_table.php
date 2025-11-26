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
        Schema::create('avaluo', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_vehiculo')->unique()->constrained('vehiculos')->onDelete('cascade');
            $table->decimal('factor_reposicion', 10, 2);
            $table->decimal('final_estimacion', 10, 2);
            $table->string('moneda')->default('$US'); // o Bs
            $table->decimal('depre_modelo', 5, 4); // porcentaje no mayor a 1
            $table->decimal('depre_kilometraje', 5, 4); // porcentaje no mayor a 1
            $table->decimal('depre_inspeccion', 5, 4); // porcentaje no mayor a 1
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('avaluo');
    }
};
