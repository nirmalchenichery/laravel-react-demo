<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Access\Response;
use App\Models\User;
use App\Models\Post;
use App\Policies\PostPolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        Post::class => PostPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        /* define a admin user role */
        Gate::define('isAdmin', function($user) 
        {
            return $user->role == 'admin';
        });

        /* define a manager user role */
        Gate::define('isManager', function($user) 
        {
            return $user->role == 'manager';
        });

        /* define a user role */
        Gate::define('isUser', function($user) 
        {
            return $user->role == 'user';
        });
        //

        Gate::define('edit-settings', function (User $user) {
            return $user->role == 'admin'
                        ? Response::allow()
                        : Response::deny('You must be an administrator.');
        });

    }
}
