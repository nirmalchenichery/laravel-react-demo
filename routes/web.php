<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;

use Illuminate\Support\Facades\Gate;

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

Route::resource('users', UserController::class);
Route::get('users.index', [UserController::class, 'index'])->name('users.index');







Route::resource('posts', PostController::class);
Route::get('search', [PostController::class, 'search'])->name('posts.search');
Route::get('pagination', [PostController::class, 'pagination']);
Route::get('comment/{id}', [CommentController::class, 'index']);
Route::get('sort', [PostController::class, 'sort']);

// Route::get('/posts/delete', 'PostController@delete')->middleware('can:isAdmin')->name('posts.delete');
// Route::get('/posts/update', 'PostController@update')->middleware('can:isManager')->name('post.update');
// Route::get('/posts/create', 'PostController@create')->middleware('can:isUser')->name('post.create');


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    
    // Admin Rights
    if (Gate::allows('isAdmin')){
        return Inertia::render('AdminDashboard');
    }
    elseif(Gate::allows('isManager')){
        return Inertia::render('ManagerDashboard');
    }
    else{
        return Inertia::render('Home');
    } 



})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
