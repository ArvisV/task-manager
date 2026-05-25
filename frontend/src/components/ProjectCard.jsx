function ProjectCard({
  project,
  onDelete,
  onToggle,
}) {
  return (
    <div
      className={`project-card ${
        project.is_completed ? "completed" : ""
      }`}
    >
      <div className="project-header">
        <input
          type="checkbox"
          checked={project.is_completed}
          onChange={() => onToggle(project.id)}
        />

        <h3>{project.name}</h3>
      </div>

      <p>{project.description}</p>

      <button
        className="delete-button"
        onClick={() => onDelete(project.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default ProjectCard;