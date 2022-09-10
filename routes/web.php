<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\RecordController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Auth::routes();

Route::get('/', [HomeController::class, 'index'])->name('index');

Route::resource("class",ClassController::class);
Route::get("/class/{id}/getDates",[ClassController::class,"getDates"]);
Route::get("/class/{id}/getFinalRecord",[ClassController::class,"getFinalRecord"]);
Route::post("/class/{id}/setFinalRecord",[ClassController::class,"setFinalRecord"]);
Route::get("/class/{id}/getClassCount",[ClassController::class,"getClassCount"]);


Route::post("/addRecord",[RecordController::class,"addRecord"]);
Route::post("/deleteRecord",[RecordController::class,"deleteRecord"]);