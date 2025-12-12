<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use DOMPDF\Facade\Pdf;

class ArchivoControler extends Controller
{
    public function index()
    {
        // $pdf = Pdf::loadView('pdf.invoice', [
        //     'data' => $data,
        // ]);

        // return $pdf->stream('invoice.pdf');
    }
}
