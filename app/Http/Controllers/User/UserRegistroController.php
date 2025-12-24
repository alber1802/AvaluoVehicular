<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\updateUserRequest;
use App\Http\Requests\User\ChangeRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use App\Models\User;

class UserRegistroController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
      //  $this->authorize('viewAny', Auth::user());

        $users = User::all();
        return  Inertia::render('User/ListUsers', [
            'users' => $users,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateUserRequest $request)
    {
        
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone ?? null,
            'is_active' => 0,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return back()->with('success', 'Usuario creado exitosamente');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(updateUserRequest $request, $id)
    {
        $user = User::findOrFail($id);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone ?? null,
            'role' => $request->role,
        ]);
        return back()->with('success', 'Usuario actualizado exitosamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        if($user->role == 'admin'){
            return back()->with('error', 'No se puede eliminar al administrador');
        }
        $user->delete();

        return back()->with('success', 'Usuario eliminado exitosamente');
    }

    /**
     * Change user password
     */
    public function changePassword(Request $request, $id)
    {
        $request->validate([
            'password' => 'required|string|min:8',
        ]);

        $user = User::findOrFail($id);
        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return back()->with('success', 'Contraseña actualizada exitosamente');
    }

    /**
     * Change user role
     */
    public function changeRole(Request $request, $id)
    {
        $request->validate([
            'role' => 'required|string|in:admin,evaluador,usuario',
        ]);

        $user = User::findOrFail($id);

        if(Auth::user() ===  $user){
            return back()->with('error', 'No puedes cambiar tu propio rol');
        }

        $user->update([
            'role' => $request->role,
        ]);

        return back()->with('success', 'Rol actualizado exitosamente');
    }
    public function changeSuspension(Request $request, $id)
    {
        $request->validate([
            'is_suspended' => 'required|boolean',
        ]);
        $user = User::findOrFail($id);
        
        if(Auth::user() ===  $user){
            return back()->with('error', 'No puedes cambiar tu propia suspensión');
        }

        $user->update([
            'is_suspended' => $request->is_suspended,
        ]);

        return back()->with('success', 'Suspensión actualizada exitosamente');
    }
}
