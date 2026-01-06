<?php

namespace App\Http\Controllers\Share;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Vehiculo;
use App\Models\Avaluo;
use App\Models\AvaluoCompartido;
use App\Http\Requests\Share\CreateRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;


class ShareController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $isAdmin = $user->role === 'admin';

        // Query base con relaciones
        $query = AvaluoCompartido::with([
            'avaluo.vehiculo.marca',
            'user:id,name,email,role'
        ]);

        // Evaluador: obtener IDs de sus avalúos
        $vehiculosIds = Vehiculo::where('id_evaluador', $user->id)->pluck('id');
        $avaluosIds = Avaluo::whereIn('id_vehiculo', $vehiculosIds)->pluck('id');
       // dd($avaluosIds);

        if ($isAdmin) {
            // Admin ve todos los compartidos
            $compartidos = $query->orderBy('fecha_compartido', 'desc')->get();
            $misCompartidos = collect(); // Admin no tiene "mis compartidos"

            $misCompartidos = AvaluoCompartido::with([
                'avaluo.vehiculo.marca',
                'user:id,name,email,role'
            ])
            ->whereIn('avaluo_id', $avaluosIds)
            ->orderBy('fecha_compartido', 'desc')
            ->get()
            ->map(function ($item) {
                $item->tipo = 'compartido_por_mi';
                return $item;
            });
            
            $compartidosConmigo = collect(); // Admin no tiene compartidos con él
        } else {
            
            // Avalúos que YO compartí (soy el dueño del avalúo)
            $misCompartidos = AvaluoCompartido::with([
                'avaluo.vehiculo.marca',
                'user:id,name,email,role'
            ])
            ->whereIn('avaluo_id', $avaluosIds)
            ->orderBy('fecha_compartido', 'desc')
            ->get()
            ->map(function ($item) {
                $item->tipo = 'compartido_por_mi';
                return $item;
            });

            // Avalúos compartidos CONMIGO
            $compartidosConmigo = AvaluoCompartido::with([
                'avaluo.vehiculo.marca',
                'avaluo.vehiculo.evaluador:id,name,email',
                'user:id,name,email,role'
            ])
            ->where('user_id', $user->id)
            ->orderBy('fecha_compartido', 'desc')
            ->get()
            ->map(function ($item) {
                $item->tipo = 'compartido_conmigo';
                $item->propietario = $item->avaluo->vehiculo->evaluador ?? null;
                return $item;
            });

            // Todos los compartidos (para la vista general si se necesita)
            $compartidos = $misCompartidos->concat($compartidosConmigo);
        }

        // Estadísticas
        $stats = [
            'total' => $isAdmin ? $compartidos->count() : $misCompartidos->count() + $compartidosConmigo->count(),
            'activos' => $isAdmin 
                ? $compartidos->where('estado', 'activo')->count()
                : $misCompartidos->where('estado', 'activo')->count(),
            'vencidos' => $isAdmin 
                ? $compartidos->where('estado', 'vencido')->count()
                : $misCompartidos->where('estado', 'vencido')->count(),
            'renovados' => $isAdmin 
                ? $compartidos->where('estado', 'renovado')->count()
                : $misCompartidos->where('estado', 'renovado')->count(),
            'conToken' => $isAdmin 
                ? $compartidos->whereNotNull('token')->count()
                : $misCompartidos->whereNotNull('token')->count(),
            'misCompartidos' =>  $misCompartidos->count(),
            'compartidosConmigo' =>$isAdmin ? 0 :  $compartidosConmigo->count(),
        ];

        // Lista de usuarios para el modal de edición (excluyendo admin)
        $usuarios = User::where('role', '!=', 'admin')
            ->where('id', '!=', $user->id)
            ->select('id', 'name', 'email', 'role', 'is_active')
            ->get();

        return Inertia::render('Compartido/ListShared', [
            'compartidos' => $isAdmin ? $compartidos : $misCompartidos->concat($compartidosConmigo),
            'misCompartidos' => $misCompartidos,
            'compartidosConmigo' => $compartidosConmigo,
            'stats' => $stats,
            'usuarios' => $usuarios,
            'isAdmin' => $isAdmin,
        ]);
    }

    public function store(CreateRequest $request, int $id)
    {
        $user = Auth::user();

        $vehiculo = Vehiculo::where('id_evaluador', $user->id)->where('id', $id)->first();

        if (!$vehiculo) {
            return redirect()->back()->with('error', 'Vehículo no encontrado');
        }

        $avaluo = Avaluo::where('id_vehiculo', $vehiculo->id)->first();

        if (!$avaluo) {
            return redirect()->back()->with('error', 'Avalúo no encontrado');
        }

        $token = null;

        if ($request->motivo === 'acceso publico') {
            $token = Str::random(40);
        }

        foreach ($request->user_ids as $user_id) {
            AvaluoCompartido::create([
                'avaluo_id' => $avaluo->id,
                'user_id' => $user_id,
                'fecha_inicio' => $request->fecha_inicio,
                'fecha_fin' => $request->fecha_fin,
                'motivo' => $request->motivo,
                'estado' => 'activo',
                'token' => $token,
                'fecha_compartido' => now(),
                'observaciones' => $request->observaciones,
            ]);
        }

        return redirect()->back()->with('success', 'Avalúo compartido exitosamente');
    }

    public function update(Request $request, int $id)
    {
        $compartido = AvaluoCompartido::findOrFail($id);

        $request->validate([
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio',
            'estado' => 'required|in:activo,vencido,renovado',
            'motivo' => 'required|string|max:255|regex:/^[^<>]*$/',
            'observaciones' => 'nullable|string|max:1000|regex:/^[^<>]*$/',
        ]);

        // Si cambia a acceso público y no tiene token, generar uno
        $token = $compartido->token;
        if ($request->motivo === 'acceso publico' && !$token) {
            $token = Str::random(40);
        } elseif ($request->motivo !== 'acceso publico') {
            $token = null;
        }

        $compartido->update([
            'fecha_inicio' => $compartido->fecha_inicio,
            'fecha_fin' => $request->fecha_fin,
            'motivo' => $request->motivo,
            'estado' => $request->estado,
            'token' => $token,
            'observaciones' => $request->observaciones,
        ]);

        return redirect()->back()->with('success', 'Compartido actualizado exitosamente');
    }

    public function destroy(int $id)
    {
        $user = Auth::user();

        $compartido = AvaluoCompartido::findOrFail($id);
        $avaluo = Avaluo::findOrFail($compartido->avaluo_id);
        $vehiculo = Vehiculo::where('id', $avaluo->id_vehiculo)->where('id_evaluador', $user->id)->first();

        if(!$vehiculo)
        {
            return redirect()->back()->with('error', 'No se puede eliminar el compartido');
        }
        $compartido->delete();

        return redirect()->back()->with('success', 'Compartido eliminado exitosamente');
    }

    public function renovar(Request $request, int $id)
    {
        $request->validate([
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio',
        ]);
        $compartido = AvaluoCompartido::findOrFail($id);

        $compartido->update([
            'fecha_fin' => $request->fecha_fin,
            'estado' => 'renovado',
            'fecha_compartido' => now(),
        ]);

        return redirect()->back()->with('success', 'Compartido renovado exitosamente');
    }
    
}
