<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //default user

        DB::table('users')->insert([
            'name' => "SystemAdmin",
            'email' => "admin@admin.net",
            'password' => Hash::make('admin1234'),
        ]);
    }
}
