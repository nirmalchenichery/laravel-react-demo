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
            'name'          => "SystemAdmin",
            'email'         => "admin@admin.net",
            'password'      => Hash::make('admin1234'),
            'created_at'    => date('Y-m-d H:i:s'),
            'role'          =>"admin",
        ]);

        DB::table('users')->insert([
            'name'          => "Manager",
            'email'         => "manager@admin.net",
            'password'      => Hash::make('manager1234'),
            'created_at'    => date('Y-m-d H:i:s'),
            'role'          =>"manager",
        ]);

        DB::table('users')->insert([
            'name'          => "User",
            'email'         => "user@admin.net",
            'password'      => Hash::make('user1234'),
            'created_at'    => date('Y-m-d H:i:s'),
            'role'          =>"user",
        ]);

    }
}
