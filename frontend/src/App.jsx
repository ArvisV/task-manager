import { useEffect, useState } from "react";
import api from "./services/api";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";

function App() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProjects();
  }, [search]);

  const fetchProjects = async () => {
    try {
      const response = await api.get(
        `/projects?search=${search}`
      );

      console.log(response.data);

      setProjects(response.data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  
  const createProject = async (name, description) => {
    try {
      await api.post("/projects", {
        name,
        description,
      });


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

  return (
  <div className="container">
    <h1>Task Manager</h1>
    <ProjectForm onCreate={createProject}/>

    <input
      type="text"
      placeholder="Search projects..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <ProjectList
      projects={projects}
      onDelete={deleteProject}
      onToggle={toggleProject}
      />
  </div>
);
}

export default App;