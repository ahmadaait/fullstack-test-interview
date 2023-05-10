<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

//route login
Route::post('/login', [App\Http\Controllers\Api\LoginController::class, 'index', ['as' => 'admin']]);

//group route with middleware "auth:api_admin"
Route::group(['middleware' => 'auth:api_admin'], function () {
    //data user
    Route::get('/user', [App\Http\Controllers\Api\LoginController::class, 'getUser', ['as' => 'admin']]);

    //refresh token JWT
    Route::get('/refresh', [App\Http\Controllers\Api\LoginController::class, 'refreshToken', ['as' => 'admin']]);

    //logout
    Route::post('/logout', [App\Http\Controllers\Api\LoginController::class, 'logout', ['as' => 'admin']]);

    Route::apiResource('/products', App\Http\Controllers\Api\ProductController::class, ['except' => ['create', 'edit'], 'as' => 'admin']);

    Route::apiResource('/transactions', App\Http\Controllers\Api\TransactionController::class, ['except' => ['create'], 'as' => 'admin']);
});
