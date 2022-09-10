<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;
use App\Models\Class_;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ClassRecord>
 */
class ClassRecordFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        // $user_id=User::all()->random()->id;
        $user_id=1;
        return [
            'user_id' => $user_id,
            'class_id' => Class_::all()->where("user_id",$user_id)->random()->id,
            'date' => fake()->date(),
            'start_time' => fake()->time(),
            'end_time' => fake()->time(),

        ];
    }
}
