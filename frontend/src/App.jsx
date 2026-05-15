import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [projects, setProjects] = useState([]);

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

  return (
    <div>
      <h1>Task Manager</h1>

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