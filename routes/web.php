<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Registro\CreateRegistroController;
use App\Http\Controllers\Registro\InspeccionController;
use App\Http\Controllers\Registro\MecanicaController;
use App\Http\Controllers\Registro\ImagenesController;
use App\Http\Controllers\User\UserRegistroController;
use App\Http\Controllers\Reciclaje\ResourceReciclajeController;
use  App\Http\Controllers\Registro\AvaluoController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});


//para la el registro

Route::prefix('registro')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/crear', [CreateRegistroController::class, 'index'])->name('registro.index');

    Route::post('/avaluo', [CreateRegistroController::class, 'store'])->name('registro.store');

    //ruta para seleccionar avaluo 
     Route::get('/seleccionar/{id}', [CreateRegistroController::class, 'seleccionar'])->name('registro.seleccionar');
    //rutas para elegir 
    Route::get('/evaluacion/mecanica/{id}', [MecanicaController::class, 'index'])->name('evaluacion.mecanica');
    Route::get('/evaluacion/inspeccion/{id}', [InspeccionController::class, 'index'])->name('evaluacion.inspeccion');

    //ruta para evaluacion mecanica 
    Route::post('/evaluacion/mecanica/store/{id}', [MecanicaController::class, 'store'])->name('evaluacion.mecanica.store');

    //ruta para evaluacion inspeccion
    Route::post('/evaluacion/inspeccion/store/{id}', [InspeccionController::class, 'store'])->name('evaluacion.inspeccion.store');

    //ruta para imagenes del vehiculo

    Route::get('/imagenes/vehiculo/{id}', [ImagenesController::class, 'index'])->name('imagenes.vehiculo');
    Route::post('/imagenes/vehiculo/store/{id}', [ImagenesController::class, 'store'])->name('imagenes.vehiculo.store');

    //resultados 
    Route::get('/resultado/avaluo/{id}', [AvaluoController::class, 'index'])->name('resultados.avaluo');

    //view resultados de
     //QUITAR ESTA RUTA Y MOVERLO
    Route::get('/resultados/avaluo/view', [AvaluoController::class, 'show'])->name('resultados.avaluo');

    //para seleccionar al editar  "editResultados" 

   
    Route::get('/resultados/avaluo/edit', [CreateRegistroController::class, 'editResultados'])->name('resultados.avaluo.editResultados');


    //ruta para continuar avaluo 
    Route::get('/resultados/avaluo/continuar/{id}', [CreateRegistroController::class,'show'])->name('resultados.avaluo.continuar');
});


Route::prefix('usuarios')->middleware(['auth', 'verified'])->group(function () {

    Route::get('/listado', [UserRegistroController::class, 'index'])->name('usuarios.listado');

    
});

Route::prefix('reciclaje')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/listado', [ResourceReciclajeController::class, 'index'])->name('reciclaje.index');

    
});


Route::prefix('depreciacion')->middleware(['auth', 'verified'])->group(function () {

    Route::get('/consultar', function () {

        return Inertia::render('Depreciacion/DepreMarcaVehiculo');

    })->name('depreciacion.consultar');

    
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
