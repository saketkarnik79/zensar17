import { useState, useId } from "react";

interface Project {
  id: number;
  name: string;
  description: string;
}

interface CreateProjectProps {
  onCreate: (project: Omit<Project, "id">) => Promise<void>;
}

function CreateProject({ onCreate }: CreateProjectProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const nameId = useId();
  const descId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Project name is required");

    setLoading(true);
    try {
      await onCreate({ name, description });
      setName("");
      setDescription("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-project-form">
      <h3>Create New Project</h3>
      <label htmlFor={nameId}>Project Name</label>
      <input
        id={nameId}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />

      <label htmlFor={descId}>Description</label>
      <textarea
        id={descId}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
};

export { CreateProject };