<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\MarcaVehiculo;
use App\Http\Requests\Marca\UpdateMarcaRequest;
use App\Http\Requests\Marca\CreateMarcaRequest;
use App\Http\Requests\Marca\DeleteMarcaRequest;

use Illuminate\Http\Request;

class MarcasController extends Controller
{
    public function index()
    {
        $marcas = MarcaVehiculo::all();
         return Inertia::render('Depreciacion/DepreMarcaVehiculo', [
            'marcas' => $marcas
        ]);
    }

    public function store(CreateMarcaRequest $request)
    {
        $marca = new MarcaVehiculo();
        $marca->nombre = $request->nombre;
        $marca->tasa_k = $request->tasa_k;
        $marca->valor_residual = $request->valor_residual;
        $marca->user_id = Auth::user()->id;
        $marca->save();


        return redirect()->back()->with('success', 'Marca guardada exitosamente');
    }

    public function update(UpdateMarcaRequest $request, $id)
    {
        $marca = MarcaVehiculo::find($id);
        $marca->update($request->all());

        return redirect()->back()->with('success', 'Marca actualizada exitosamente');
    }

    public function destroy($id)
    {
        $marca = MarcaVehiculo::find($id);
        $marca->delete();

        return redirect()->back()->with('success', 'Marca eliminada exitosamente');
    }
}
