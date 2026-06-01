<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia\Inertia::render('public/search');
})->name('home');

Route::post('/search', [StudentController::class, 'search'])->middleware('throttle:30,1')->name('search');
Route::get('/search', function () {
    return redirect('/');
});
Route::get('/result/{nisn}', [StudentController::class, 'show'])->name('result');

Route::prefix('admin')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('admin.login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('admin.logout');

    Route::middleware(['admin'])->group(function () {
        Route::get('/dashboard', [StudentController::class, 'index'])->name('admin.dashboard');
        Route::get('/data-siswa', [StudentController::class, 'dataSiswa'])->name('admin.data-siswa');
        Route::get('/students/create', [StudentController::class, 'create'])->name('admin.students.create');
        Route::post('/students', [StudentController::class, 'store'])->name('admin.students.store');
        Route::get('/students/{id}/edit', [StudentController::class, 'edit'])->name('admin.students.edit');
        Route::put('/students/{id}', [StudentController::class, 'update'])->name('admin.students.update');
        Route::delete('/students/{id}', [StudentController::class, 'destroy'])->name('admin.students.destroy');
        Route::get('/students/import', [StudentController::class, 'importForm'])->name('admin.students.import');
        Route::post('/students/import', [StudentController::class, 'import'])->name('admin.students.import.store');
    });
});
