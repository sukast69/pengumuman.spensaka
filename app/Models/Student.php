<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'nisn',
        'nama',
        'ttl',
        'status_lulus',
        'link_skl',
    ];

    protected function casts(): array
    {
        return [
            'status_lulus' => 'boolean',
        ];
    }
}
