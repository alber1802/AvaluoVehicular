 <div class="a4-page">
     <div class="result-box">
         <h3>RESULTADO DEL AVALÚO</h3>

         <div class="result-item">
             <span>Precio Base (Nuevo):</span>
             <span
                 style="font-family: 'Courier New', monospace; font-weight: bold;">${{ number_format($vehiculo->precio_referencial, 2) }}</span>
         </div>

         <div class="result-item">
             <span>Valor Calculado:</span>
             <span
                 style="font-family: 'Courier New', monospace; font-weight: bold;">${{ number_format($vehiculo->precio_referencial * $factorInspeccion * $factorModelo * $factorKilometraje * $factorReposicion, 2) }}</span>
         </div>

         <div class="result-item">
             <span>Valor Residual Mínimo:</span>
             <span
                 style="font-family: 'Courier New', monospace; font-weight: bold;">${{ number_format($valorResidual, 2) }}</span>
         </div>

         <div class="result-item final">
             <span style="font-weight: bold; font-size: 12pt;">VALOR FINAL DEL AVALÚO:</span>
             <span class="value"
                 style="font-family: 'Courier New', monospace;">${{ number_format($valorFinal, 2) }}</span>
         </div>
     </div>

     <div class="note-box">
         <strong>NOTA:</strong> El presente cálculo es una estimación técnica basada en factores de depreciación por
         antigüedad, uso y estado físico del vehículo {{ $marca->nombre }} {{ $vehiculo->modelo }}. El valor final no
         puede ser inferior al valor residual establecido para la marca.
     </div>
 </div>
