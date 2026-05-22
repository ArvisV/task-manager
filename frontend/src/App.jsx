import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");

      console.log(response.data);

      setProjects(response.data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  
  const createProject = async (e) => {
    e.preventDefault();

    try {
      await api.post("/projects", {
        name,
        description,
      });

      setName("");
      setDescription("");

      fetchProjects();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`);

      fetchProjects();
    }catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const toggleProject = async (id) => {
    try {
      await api.patch(`/projects/${id}/toggle`);

      fetchProjects();
    } catch (error) {
      console.error("Error toggling project:", error);
    }
  };

  const activeProject = projects.filter(
    (project) => !project.is_completed
  );

  const completedProjects = projects.filter(
    (project) => project.is_completed
  );

  return (
  <div>
    <h1>Task Manager</h1>

    <form onSubmit={createProject}>
      <div>
        <input
          type="text"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <textarea
          placeholder="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button type="submit">Create Project</button>
    </form>

    <h2>Active Projects</h2>

    {activeProject.map((project) => (
      <div key={project.id}>
        <input
          type="checkbox"
          checked={project.is_completed}
          onChange={() => toggleProject(project.id)}
        />

        <h3>{project.name}</h3>

        <p>{project.description}</p>

        <button onClick={() => deleteProject(project.id)}>
          Delete
        </button>
      </div>
    ))}

    <h2>Completed Projects</h2>

    {completedProjects.map((project) => (
      <div
        key={project.id}
        style={{
          opacity: 0.7,
          textDecoration: "line-through",
        }}
      >
        <input
          type="checkbox"
          checked={project.is_completed}
          onChange={() => toggleProject(project.id)}
        />

        <h3>{project.name}</h3>

        <p>{project.description}</p>

        <button onClick={() => deleteProject(project.id)}>
          Delete
        </button>
      </div>
    ))}
  </div>
);
}

export default App;