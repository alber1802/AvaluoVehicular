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
use App\Http\Controllers\ArchivoControler;


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
    
   

    //ruta para evaluacion mecanica 
    Route::post('/evaluacion/mecanica/store/{id}', [MecanicaController::class, 'store'])->name('evaluacion.mecanica.store');

    //rutas para elegir 
    Route::get('/evaluacion/mecanica/{id}', [MecanicaController::class, 'index'])->name('evaluacion.mecanica');
    Route::get('/evaluacion/mecanica/edit/{id}', [MecanicaController::class, 'edit'])->name('evaluacion.mecanica.edit');
    Route::post('/evaluacion/mecanica/update/{id}', [MecanicaController::class, 'update'])->name('evaluacion.mecanica.update');




    Route::get('/evaluacion/inspeccion/{id}', [InspeccionController::class, 'index'])->name('evaluacion.inspeccion');
    //ruta para evaluacion inspeccion
    Route::post('/evaluacion/inspeccion/store/{id}', [InspeccionController::class, 'store'])->name('evaluacion.inspeccion.store');

    //ruta para editar evaluacion inspeccion
    Route::get('/evaluacion/inspeccion/edit/{id}', [InspeccionController::class, 'edit'])->name('evaluacion.inspeccion.edit');
    Route::post('/evaluacion/inspeccion/update/{id}', [InspeccionController::class, 'update'])->name('evaluacion.inspeccion.update');

    //ruta para imagenes del vehiculo

    Route::get('/imagenes/vehiculo/{id}', [ImagenesController::class, 'index'])->name('imagenes.vehiculo');
    Route::post('/imagenes/vehiculo/store/{id}', [ImagenesController::class, 'store'])->name('imagenes.vehiculo.store');

    //decargar la imagen 
   // Route::get('/imagenes/vehiculo/download/{id}', [ImagenesController::class, 'descargarImagen'])->name('imagenes.vehiculo.download');
    Route::get('/imagenes/vehiculo/edit/{id}', [ImagenesController::class, 'edit'])->name('imagenes.vehiculo.edit');
    Route::post('/imagenes/vehiculo/update/{id}', [ImagenesController::class, 'update'])->name('imagenes.vehiculo.update');

    //resultados 
    Route::get('/resultado/avaluo/{id}', [AvaluoController::class, 'index'])->name('resultados.avaluo');

    //view resultados de
     //QUITAR ESTA RUTA Y MOVERLO
    //Route::get('/resultados/avaluo/view', [AvaluoController::class, 'show'])->name('resultados.avaluo');

    //para seleccionar al editar  "editResultados" 

   
    Route::get('/resultados/avaluo/edit/{id}', [CreateRegistroController::class, 'seleccionarEditar'])->name('resultados.avaluo.seleccionarEditar');

    //MANDAR DATOS PAR EDITAR A VISTA 
    Route::get('/avaluo/editDatosVehiculo/{id}', [CreateRegistroController::class, 'edit'])->name('avaluo.editDatosVehiculo');

    //  PARA EDITAR LOS DATOS       
    Route::post('/avaluo/editDatosVehiculo/update/{id}', [CreateRegistroController::class, 'update'])->name('avaluo.editDatosVehiculo.update');


    //ruta para continuar avaluo 
    Route::get('/resultados/avaluo/continuar/{id}', [CreateRegistroController::class,'show'])->name('resultados.avaluo.continuar');
});

//aca dan las lista de los archivos pdf que se generen
Route::prefix('archivos')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/generarPdf/{id}', [ArchivoControler::class, 'generarPdf'])->name('archivos.generarPdf');
});

Route::prefix('usuarios')->middleware(['auth', 'verified'])->group(function () {

    Route::get('/listado', [UserRegistroController::class, 'index'])->name('usuarios.listado');
    Route::post('/crear', [UserRegistroController::class, 'store'])->name('usuarios.store');
    Route::post('/actualizar/{id}', [UserRegistroController::class, 'update'])->name('usuarios.update');
    Route::post('/cambiar-password/{id}', [UserRegistroController::class, 'changePassword'])->name('usuarios.changePassword');
    Route::post('/cambiar-rol/{id}', [UserRegistroController::class, 'changeRole'])->name('usuarios.changeRole');
    Route::post('/suspend/{id}', [UserRegistroController::class, 'changeSuspension'])->name('usuarios.suspend');
    Route::delete('/eliminar/{id}', [UserRegistroController::class, 'destroy'])->name('usuarios.destroy');
   

    
});

Route::prefix('reciclaje')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/listado', [ResourceReciclajeController::class, 'index'])->name('reciclaje.index');

    
});


Route::prefix('depreciacion')->middleware(['auth', 'verified'])->group(function () {

    Route::get('/consultar', function () {

        return Inertia::render('Depreciacion/DepreMarcaVehiculo');

    })->name('depreciacion.consultar');

    
});
//vista de pudra R
//Route::get('/pdf/{id}', [ArchivoControler::class, 'vista'])->name('pdf.vista');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
