<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\MarcaVehiculo;
use App\Models\Vehiculo;
use App\Models\Avaluo;


class DashboardController extends Controller
{
    /**
     * Muestra un listado del recurso.
     */
    public function index(Request $request)
    {
        // Obtener parámetros de búsqueda y filtros
        $search = $request->get('search', '');
        $marca = $request->get('marca', '');
        $año = $request->get('año', '');
        $page = $request->get('page', 1);

        $userId = Auth::id();
        $isAdmin = Auth::user()->role == "admin";

        // Initialize variables to ensure they are always defined
        $count_vehiculosHoy = 0;
        $comparacionAyer = 0;
        $count_vehiculos = 0;
        $count_avaluos = 0;
        $valoracion = 0;
        $valoracionPromedio = 0;
        $pendientes = 0;
        $vehiculos = collect(); // Use an empty collection for default
        $marcas = MarcaVehiculo::all(); // Marcas are generally global filter options
        $años_vehiculo = Vehiculo::select('año_fabricacion')
            ->distinct()
            ->orderBy('año_fabricacion', 'desc')
            ->get(); // Years are generally global filter options

        // Base query for vehicles, applying user-specific filter if not admin
        $baseQuery = Vehiculo::with('imagenes', 'marca', 'avaluo');
        if (!$isAdmin) {
            $baseQuery->where('user_id', $userId);
        }

        // Apply text search
        if ($search) {
            $baseQuery->where(function ($q) use ($search) {
                $q->where('modelo', 'like', '%' . $search . '%')
                    ->orWhere('placa', 'like', '%' . $search . '%')
                    ->orWhereHas('marca', function ($q_marca) use ($search) {
                        $q_marca->where('nombre', 'like', '%' . $search . '%');
                    });
            });
        }

        // Filter by marca
        if ($marca && $marca !== 'all') {
            $baseQuery->where('id_marca', $marca);
        }

        // Filter by año
        if ($año && $año !== 'all') {
            $baseQuery->where('año_fabricacion', $año);
        }

        // Paginate vehicles
        $vehiculos = $baseQuery->orderBy('created_at', 'desc')
            ->paginate(10, ['*'], 'page', $page);

        if ($isAdmin) {
            $count_vehiculosHoy = Vehiculo::whereDate('created_at', now()->toDateString())->count();
            $comparacionAyer = Vehiculo::whereDate('created_at', now()->subDay()->toDateString())->count();
            $count_vehiculos = Vehiculo::count();
            $count_avaluos = Avaluo::count();
            $valoracion = Avaluo::sum('final_estimacion');
        } else {
            // Non-admin user sees only their own reports
            $count_vehiculosHoy = Vehiculo::where('user_id', $userId)->whereDate('created_at', now()->toDateString())->count();
            $comparacionAyer = Vehiculo::where('user_id', $userId)->whereDate('created_at', now()->subDay()->toDateString())->count();
            $count_vehiculos = Vehiculo::where('user_id', $userId)->count();

            // Avaluos related to the user's vehicles
            $count_avaluos = Avaluo::whereHas('vehiculo', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })->count();
            $valoracion = Avaluo::whereHas('vehiculo', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })->sum('final_estimacion');
        }

        $valoracionPromedio = $count_avaluos > 0 ? $valoracion / $count_avaluos : 0;
        $pendientes = $count_vehiculos - $count_avaluos;
        if ($pendientes < 0) $pendientes = 0; // Ensure pendientes is not negative


        return Inertia::render('dashboard', [
            'vehiculosHoy' => $count_vehiculosHoy,
            'pendientes' => $pendientes,
            'valoracionPromedio' => $valoracionPromedio,
            'comparacionAyer' => $comparacionAyer,
            'vehiculos' => $vehiculos,
            'avaluos' => $count_avaluos,
            'marcas' => $marcas,
            'años_vehiculo' => $años_vehiculo,
            'filters' => [
                'search' => $search,
                'marca' => $marca,
                'año' => $año,
            ],
            'isAdmin' => $isAdmin, // Pass this to frontend if needed for UI differences
        ]);
    }

    
}
