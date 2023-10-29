<?php

namespace Tests\Feature\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Subject;
use Laravel\Sanctum\Sanctum;
use App\Models\User;

class SubjectTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_save_subject_without_auth()
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

        $response->assertStatus(401);
    }

    public function test_update_subject_without_auth()
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

        $response->assertStatus(401);
    }

    public function test_get_subject_without_auth()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
        ])->get('api/subject/37');

        $response->assertStatus(401);
    }

    public function test_save_subject()
    {
        Sanctum::actingAs(
            User::factory()->create(),
            ['*']
        );

        $subject = Subject::factory()->create();

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

        $subject->delete();
    }

    public function test_update_subject()
    {
        Sanctum::actingAs(
            User::factory()->create(),
            ['*']
        );

        $subject = Subject::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
        ])->post('api/subject/update/' . $subject->id, [
            'name' => $subject->name,
            'test_chamber' => $subject->test_chamber,
            'date_of_birth' => $subject->date_of_birth,
            'score' => $subject->score,
            'alive' => $subject->alive
        ]);

        $response->assertStatus(200);

        $subject->delete();
    }

    public function test_subject_show(){
        Sanctum::actingAs(
            User::factory()->create(),
            ['*']
        );

        $subject = Subject::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
        ])->get('api/subject/' . $subject->id);

        $this->assertEquals($response['id'],$subject->id);
        $this->assertEquals($response['name'],$subject->name);
        $this->assertEquals($response['test_chamber'],$subject['test_chamber']);
        $this->assertEquals($response['score'],$subject['score']);
        $this->assertEquals($response['alive'],$subject['aliive']);

        $subject->delete();
    }
}
