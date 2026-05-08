<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return Project::all();
    }

    public function store(Request $request)
    {
        $project = Project::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->json($project, 201);
    }
}