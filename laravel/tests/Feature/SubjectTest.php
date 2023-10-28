<?php

namespace Tests\Feature\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Subject;

class SubjectTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_save_subject()
    {
        $subject = Subject::factory()->make();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
        ])->post('api/subject/save', [
            'name' => $subject->name,
            'test_chamber' => $subject->test_chamber,
            'date_of_birth' => $subject->date_of_birth,
            'score' => $subject->score,
            'alive' => $subject->alive
        ]);

        $response->assertStatus(200);
    }

    public function test_update_subject()
    {
        $subject = Subject::factory()->make();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
        ])->post('api/subject/update/37', [
            'name' => $subject->name,
            'test_chamber' => $subject->test_chamber,
            'date_of_birth' => $subject->date_of_birth,
            'score' => $subject->score,
            'alive' => $subject->alive
        ]);

        $response->assertStatus(200);
    }
}
