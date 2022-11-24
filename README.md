# laravel-react-app

Login
__________
email     => admin@admin.net
password' => admin1234


## Installation

1. Clone the repository
2. Install composer dependencies using `composer install`
3. Once you have installed the dependencies, you need to create the .env file. You can copy the example file using this command `cp .env.example .env`
4. After you have created you .env file you need to generate the application key by running this command `php artisan key:generate`
5. Create a new mysql database and add the details of your MySQL server in the .env file.
6. Once the database connection is ready, you need to run the migrations using the following command `php artisan migrate --seed`
7. Run tinker, Factory Command.Execute the following command on command prompt to generate or create dummy data using tinker and factory command: `php artisan tinker` and `Post::factory()->count(20)->create()`