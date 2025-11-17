<?php

namespace App\Http\Controllers\Registro;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CreateRegistroController extends Controller
{
    
    public function index()
    {
        return Inertia::render('Registro/create/registro');
        
    }

    public function seleccionar(){
        

        //hacer validacion para cuando recrese el usuario y ya haya podiver mejor algun registro
        return Inertia::render('Registro/create/condiciones_generales');
    }


    public function store(Request $request)
    {
       
        //dd($request->all());

        return redirect()->route('registro.seleccionar');
        
    }
   
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
