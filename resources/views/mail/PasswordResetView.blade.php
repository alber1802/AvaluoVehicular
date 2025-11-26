<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablecer Contraseña</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f8fafc;
            padding: 20px;
            line-height: 1.6;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        .email-header {
            background: linear-gradient(135deg, #0f1a23 0%, #1a2c3a 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .email-header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(0, 174, 239, 0.1) 0%, transparent 70%);
            animation: pulse 3s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        .logo-container {
            position: relative;
            z-index: 1;
            margin-bottom: 20px;
        }
        
        .logo {
            width: 60px;
            height: 60px;
            background-color: #00AEEF;
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 16px rgba(0, 174, 239, 0.3);
        }
        
        .logo svg {
            width: 32px;
            height: 32px;
            color: white;
        }
        
        .email-header h1 {
            color: white;
            font-size: 28px;
            font-weight: 700;
            margin: 0;
            position: relative;
            z-index: 1;
        }
        
        .email-header .subtitle {
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            margin-top: 8px;
            position: relative;
            z-index: 1;
        }
        
        .email-body {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 18px;
            color: #1e293b;
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        .message {
            color: #64748b;
            font-size: 15px;
            margin-bottom: 30px;
            line-height: 1.8;
        }
        
        .info-box {
            background: linear-gradient(135deg, #00AEEF10 0%, #00AEEF05 100%);
            border-left: 4px solid #00AEEF;
            padding: 20px;
            border-radius: 8px;
            margin: 30px 0;
        }
        
        .info-box p {
            color: #1e293b;
            font-size: 14px;
            margin: 0;
        }
        
        .info-box strong {
            color: #00AEEF;
        }
        
        .button-container {
            text-align: center;
            margin: 35px 0;
        }
        
        .reset-button {
            display: inline-block;
            background: linear-gradient(135deg, #00AEEF 0%, #0096d1 100%);
            color: white;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 16px;
            box-shadow: 0 10px 20px -10px rgba(0, 174, 239, 0.6);
            transition: all 0.3s ease;
        }
        
        .reset-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 30px -10px rgba(0, 174, 239, 0.8);
        }
        
        .alternative-link {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 20px;
            border-radius: 8px;
            margin: 30px 0;
        }
        
        .alternative-link p {
            color: #64748b;
            font-size: 13px;
            margin-bottom: 10px;
        }
        
        .alternative-link a {
            color: #00AEEF;
            word-break: break-all;
            font-size: 12px;
            text-decoration: none;
        }
        
        .alternative-link a:hover {
            text-decoration: underline;
        }
        
        .warning {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            border-radius: 8px;
            margin: 25px 0;
        }
        
        .warning p {
            color: #92400e;
            font-size: 13px;
            margin: 0;
        }
        
        .email-footer {
            background-color: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .email-footer p {
            color: #64748b;
            font-size: 13px;
            margin: 5px 0;
        }
        
        .email-footer .brand {
            color: #1e293b;
            font-weight: 600;
            margin-top: 15px;
        }
        
        .email-footer .brand span {
            color: #00AEEF;
        }
        
        @media only screen and (max-width: 600px) {
            .email-body {
                padding: 30px 20px;
            }
            
            .email-header {
                padding: 30px 20px;
            }
            
            .email-header h1 {
                font-size: 24px;
            }
            
            .reset-button {
                padding: 14px 30px;
                font-size: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <div class="logo-container">
                <div class="logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                    </svg>
                </div>
            </div>
            <h1>Restablecer Contraseña</h1>
            <p class="subtitle">Sistema de Avalúo Técnico Vehicular</p>
        </div>
        
        <!-- Body -->
        <div class="email-body">
            <p class="greeting">¡Hola!</p>
            
            <p class="message">
                Recibimos una solicitud para restablecer la contraseña de tu cuenta en el 
                <strong>Sistema de Avalúo Técnico Vehicular</strong>. Si no realizaste esta solicitud, 
                puedes ignorar este correo de forma segura.
            </p>
            
            <div class="info-box">
                <p>
                    <strong>📧 Correo electrónico:</strong> {{ $email }}
                </p>
            </div>
            
            <p class="message">
                Para restablecer tu contraseña, haz clic en el botón de abajo. Este enlace 
                es válido por <strong>60 minutos</strong> por razones de seguridad.
            </p>
            
            <!-- Reset Button -->
            <div class="button-container">
                <a href="{{ url('reset-password', $token) }}?email={{ urlencode($email) }}" class="reset-button">
                    Restablecer Contraseña
                </a>
            </div>
            
            <!-- Alternative Link -->
            <div class="alternative-link">
                <p><strong>¿El botón no funciona?</strong> Copia y pega el siguiente enlace en tu navegador:</p>
                <a href="{{ url('reset-password', $token) }}?email={{ urlencode($email) }}">
                    {{ url('reset-password', $token) }}?email={{ urlencode($email) }}
                </a>
            </div>
            
            <!-- Warning -->
            <div class="warning">
                <p>
                    <strong>⚠️ Importante:</strong> Si no solicitaste restablecer tu contraseña, 
                    te recomendamos cambiarla inmediatamente y contactar al administrador del sistema 
                    para reportar esta actividad sospechosa.
                </p>
            </div>
            
            <p class="message" style="margin-top: 30px;">
                Si tienes alguna pregunta o necesitas ayuda, no dudes en contactar al 
                administrador del sistema.
            </p>
        </div>
        
        <!-- Footer -->
        <div class="email-footer">
            <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
            <p class="brand">
                <span>MECÁNICA PRO</span> - Carrera de Mecánica Automotriz - UMSA 
            </p>
            <p>© {{ date('Y') }} Sistema de Avalúo Técnico. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
