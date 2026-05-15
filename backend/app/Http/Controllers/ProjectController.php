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

        if ($request->has('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%" );
            });
        }

        $allowedSort = ['name', 'created_at', 'is_completed'];

        $sort = $request->get('sort', 'created_at');

        $direction = $request->get('direction', 'desc');

        if (!in_array($sort, $allowedSort)) {
            $sort = 'created_at';
        }
        if (!in_array($direction, ['asc', 'desc'])) {
            $direction = 'desc';
        }

        $query->orderBy($sort, $direction);

        $perPage = $request->get('per_page', 10);

        $perPage = min($perPage, 50);

        return $query->paginate($perPage);
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

        $project->is_completed = !$project->is_completed;

        $project->save();

        return response()->json($project);
    }
}