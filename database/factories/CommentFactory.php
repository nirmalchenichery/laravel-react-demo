<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'userid'  => 1,
            'postid'  => 1,
            'email'   => fake()->unique()->safeEmail(),
            'comment' => $this->faker->text,
        ];
    } 
}
