<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Post;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Post::class;

    public function definition()
    {
        return [
            'language' => "en",
            'title' => $this->faker->title,
            'body' => $this->faker->text,
            'is_display' => "Y",
            'is_approved' => "N",
            'posted_at' => date('Y-m-d H:i:s'),
        ];

    }
}
