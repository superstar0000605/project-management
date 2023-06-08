<?php

namespace App\Http\Controllers;

use App\Models\Developer;
use Illuminate\Http\Request;

class DeveloperController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $developers = Developer::all();

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

        $developer = Developer::insert(['name'=> $request->name, 'email'=>$request->email]);

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
      $request->validate([
        'name' => 'required',
        'email' => 'required|email|unique:developers'
      ]);
      
      $developer = Developer::findOrFail($id);
      $developer->update(['name'=> $request->name, 'email'=>$request->email]);

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
