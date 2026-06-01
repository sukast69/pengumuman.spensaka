<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        \App\Models\Admin::create([
            'username' => 'admin',
            'password' => 'admin123',
        ]);
    }
}
