<?php

namespace App\Http\Controllers;

use App\Models\Developer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class DeveloperController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $developers = Developer::all();
    $developerList = [];
    foreach ($developers as $developer) {
      $projects = $developer->projects;
      $developerList[] = [
        'id' => $developer->id,
        'name' => $developer->name,
        'email' => $developer->email,
        'projects' => $projects
      ];
    }
    return response()->json($developers);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required',
      'email' => 'required|email|unique:developers'
    ]);

    $result = Developer::insert(['name' => $request->name, 'email' => $request->email]);
    $developer = Developer::where('email', $request->email)->first();
    return response()->json($developer, 201);
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    $developer = Developer::findOrFail($id);

    return response()->json($developer);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    // check if the email already exists, except for the current developer
    $request->validate([
      'name' => 'required',
      'email' => [
        'required',
        'email',
        Rule::unique('developers')->where(function ($query) use ($id) {
          return $query->where('id', '<>', $id);
        })
      ],
    ]);
    $developer = Developer::findOrFail($id);
    $projects = $developer->projects;
    $developer->name = $request->input('name');
    $developer->email = $request->input('email');
    $developer->save();

    return response()->json($developer);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    $developer = Developer::findOrFail($id);
    $developer->delete();

    return response()->json(null, 204);
  }
}