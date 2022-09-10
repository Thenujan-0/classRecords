<?php

namespace Database\Factories;

use App\Models\Class_;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class Class_Factory extends Factory
{

    protected $model = Class_::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $classNames=["yathushiha's class","Theebika's class","Kasun's class","Saman's class",];
        return [
            'name' => fake()->firstName()."'s class",
            // 'user_id' => User::all()->random()->id,
            'user_id' => 1,
            'count_reset_on' => fake()->randomElement([10,20]),

        ];
    }
}
