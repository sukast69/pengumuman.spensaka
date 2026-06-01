<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('nisn', 20)->unique()->notNullable();
            $table->string('nama', 150)->notNullable();
            $table->string('ttl', 100)->notNullable();
            $table->boolean('status_lulus')->default(true);
            $table->text('link_skl')->nullable();
            $table->timestamps();
        });

        Schema::table('students', function (Blueprint $table) {
            $table->index('nisn', 'idx_students_nisn');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
