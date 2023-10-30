<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubjectController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(SubjectController::class)->group(function () {
    Route::middleware('auth:sanctum')->get('/subject', 'index');

    Route::middleware('auth:sanctum')->post('/subject/save', 'store');

    Route::middleware('auth:sanctum')->post('/subject/update/{id}', 'update');

    Route::middleware('auth:sanctum')->get('/subject/{id}', 'show');
});
