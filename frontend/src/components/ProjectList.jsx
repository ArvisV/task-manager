import ProjectCard from "./ProjectCard";

function ProjectList({
  projects,
  onDelete,
  onToggle,
}) {
  const activeProjects = projects.filter(
    (project) => !project.is_completed
  );

  const completedProjects = projects.filter(
    (project) => project.is_completed
  );

  return (
    <>
      <h2>Active Projects</h2>

      {activeProjects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}

      <h2>Completed Projects</h2>

      {completedProjects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </>
  );
}

export default ProjectList;