<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Developer_project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ProjectController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $projects = Project::all();
    $projectList = [];
    foreach ($projects as $project) {
      $developers = $project->developers;
      $projectList[] = [
        'id' => $project->id,
        'title' => $project->title,
        'description' => $project->description,
        'developers' => $developers
      ];
    }

    return response()->json($projectList);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $request->validate([
      'title' => 'required | unique:projects',
      'description' => 'required'
    ]);

    $result = Project::create(['title' => $request->title, 'description' => $request->description]);
    $project = Project::where('title', $request->title)->first();
    return response()->json($project, 201);
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
    $project = Project::findOrFail($id);
    return response()->json($project);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    $project = Project::find($id);
    $developers = $project->developers;
    
     $validator = Validator::make($request->all(),[
      'title' => [
        'required',
        Rule::unique('projects')->where(function ($query) use ($id) {
          return $query->where('id', '<>', $id);
        })
      ],
      'description' => 'required'
    ]);

    if ($validator->fails()) {
      return response()->json([
        'errors' =>'This title is already exists'
      ], 422);
    }

    $project->title = $request->input('title');
    $project->description = $request->input('description');
    $project->save();

    return response()->json($project);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
    $project = Project::findOrFail($id);
    $project->delete();

    return response()->json(null, 204);
  }

  /**
   * Assign the project to the developers.
   */
  public function assign(Request $request, string $id)
  {
    //
    // $project = Project::findOrFail($id);
    // $project->update(['title'=> $request->title, 'description'=>$request->description]);
    $project = Developer_project::where('project_id', $id);
    $project->delete();
    $length = count($request->all());
    for ($i = 0; $i < $length; $i++) {
      Developer_project::create(['project_id' => $id, 'developer_id' => $request[$i]]);
    }
    $project = Project::findOrFail($id);
    $developers = $project->developers;
    $projectList = [
      'id' => $project->id,
      'title' => $project->title,
      'description' => $project->description,
      'developers' => $developers
    ];
    return response()->json($projectList);
  }
}