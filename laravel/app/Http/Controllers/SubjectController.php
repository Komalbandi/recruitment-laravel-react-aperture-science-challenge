<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\SubjectRequest;
use App\Models\Subject;
use Illuminate\Support\Facades\Log;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subjects = Subject::all();

        return $subjects;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SubjectRequest $request)
    {
        try {
            $subject = new Subject;
            $subject->name = $request->name;
            $subject->test_chamber = $request->test_chamber;
            $subject->date_of_birth = $request->date_of_birth;
            $subject->score = $request->score;
            $subject->alive = $request->alive;
            $subject->save();
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['message' => 'Error saving subject'], 500);
        }

        return ['OK'];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $subject = Subject::where('id', $id);
        return $subject;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(SubjectRequest $request,int $id)
    {
        try {
            $subject = Subject::find($id);
            $subject->name = $request->name;
            $subject->test_chamber = $request->test_chamber;
            $subject->date_of_birth = $request->date_of_birth;
            $subject->score = $request->score;
            $subject->alive = $request->alive;
            $subject->save();
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['message' => 'Error saving subject'], 500);
        }

        return ['OK'];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $subject = Subject::where('id', $id)->delete();
        return $subject;
    }
}
