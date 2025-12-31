import { useState } from "react";

interface DeleteProjectProps {
  projectId: number;
  onDelete: (id: number) => Promise<void>;
}

function DeleteProject({ projectId, onDelete }: DeleteProjectProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    setLoading(true);
    try {
      await onDelete(projectId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading} className="delete-project-btn">
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};
export {DeleteProject};