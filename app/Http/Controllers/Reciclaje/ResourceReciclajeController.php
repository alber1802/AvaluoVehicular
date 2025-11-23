<?php

namespace App\Http\Controllers\Reciclaje;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResourceReciclajeController extends Controller
{
    /**
     * Muestra una lista del recurso.
     */
    public function index()
    {
        return Inertia::render('Reciclaje/indexReciclaje');
    }

    /**
     * Muestra el formulario para crear un nuevo recurso.
     */
    public function create()
    {
        //
    }

    /**
     * Almacena un recurso recién creado en el almacenamiento.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Muestra el recurso especificado.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Muestra el formulario para editar el recurso especificado.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Actualiza el recurso especificado en el almacenamiento.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Elimina el recurso especificado del almacenamiento.
     */
    public function destroy(string $id)
    {
        //
    }
}
