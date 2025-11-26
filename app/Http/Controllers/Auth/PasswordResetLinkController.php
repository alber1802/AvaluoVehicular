<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use App\Mail\PasswordResetLink;  
use App\Models\User; 
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    /**
     * Show the password reset link request page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);
        
        // Verificar si el usuario existe
        $user = User::where('email', $request->email)->first();
        
        if ($user) {
            // Crear token de reset
            $token = Password::createToken($user);
            
            // Enviar email
            Mail::to($request->email)->send(new PasswordResetLink($request->email, $token));
        }
        
        // Siempre retornar el mismo mensaje por seguridad (no revelar si el email existe)
        return back()->with('status', __('Si el correo existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.'));
    }
}
