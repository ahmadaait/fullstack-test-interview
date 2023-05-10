<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run()
    {
        DB::table('products')->insert([
            'name' => 'Product Test',
            'price' => 100000,
            'stock' => 10,
            'description' => 'This is Product Test using seeder',
        ]);
    }
}