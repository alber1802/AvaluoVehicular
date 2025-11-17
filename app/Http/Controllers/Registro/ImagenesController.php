<?php

namespace App\Http\Controllers\Registro;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ImagenesController extends Controller
{
    
    public function index()
    {
        return Inertia::render('Registro/create/imagenes_avaluo');
    }

    public function store(Request $request)
    {
        //dd( $request->all());


        return redirect()->route('resultados.avaluo');
    }

    public function resultado(){
        
        return Inertia::render('Registro/create/resultado');
    }

    //se tiene que enviar un id para ver que datos se estan manejando 

    public function viewResultados(){


        return Inertia::render('Registro/create/ViewResultado');
    }


    //se tiene que enviar un id para ver que datos se estan manejando 
    public function editResultados(){
        
        //con el id 

        return Inertia::render('Registro/update/EditSeleccion');

    }

}
