<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\DeveloperController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::middleware('web')->post('/refresh-csrf-token', function (Request $request) {
  $newToken = csrf_token();
  return response(null, 204)->cookie('XSRF-TOKEN', $newToken);
});

  Route::post('/api/developers', [DeveloperController::class,'store']);
  Route::get('/api/developers', [DeveloperController::class,'index']);
  Route::get('/api/developers/{id}', [DeveloperController::class,'show']);
  Route::patch('/api/developers/{id}', [DeveloperController::class,'update']);
  Route::delete('/api/developers/{id}', [DeveloperController::class,'destroy']);

  Route::post('/api/projects', [ProjectController::class, 'store']);
  Route::get('/api/projects', [ProjectController::class, 'index']);
  Route::get('/api/projects/{id}', [ProjectController::class, 'show']);
  Route::patch('/api/projects/{id}', [ProjectController::class, 'update']);
  Route::delete('/api/projects/{id}', [ProjectController::class, 'destroy']);
  Route::post('/api/projects/assign/{id}', [ProjectController::class, 'assign']);