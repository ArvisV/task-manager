<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query();

        if ($request->has('completed')){
            $query->where('is_completed', (int) $request->completed);
        }

        return $query->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $project = Project::create($validated);

        return response()->json($project, 201);
    }

    public function destroy($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'message' => 'Project not found'
            ], 404);
        }

        $project->delete();

         return response()->json([
            'message' => 'Project deleted successfully'
         ]);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $project->update([
            'name' => $request->name,
            'description' => $request->description,
            'is_completed' => $request->is_completed ?? false,
        ]);

        return response()->json($project);
    }

    public function toggle($id)
    {
        $project = Project::findOrFail($id);

        $project->is_complited = !$project->is_completed;

        $project->save();

        return response()->json($project);
    }
}