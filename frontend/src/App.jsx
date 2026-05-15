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

      {projects.map((project) => (
        <div key={project.id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;