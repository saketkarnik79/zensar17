import { useState } from 'react';
import { type Todo } from './models/Todo';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  fetchTodos,
  fetchTodo,
  createTodo,
  toggleTodo,
  deleteTodo,
  } from './services/todoAPI';
function Todos() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState('');

  // List query (page-aware)
  const {
    data: todos,
    isLoading,
    isError,
    error,
    isFetching, // background refetch indicator
  } = useQuery({
    queryKey: ['todos', page],
    // Query function receives an object -> use its `signal` for cancellation
    queryFn: ({ signal }) => fetchTodos({ page, limit: 10, signal }),
    // Keep the previous page data to avoid flicker when `page` changes
    // In v5, use placeholderData to show something while the new query fetches
    placeholderData: (prev) => prev,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });

  // Prefetch a todo’s details when hovering a row
  const prefetchTodo = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ['todo', id],
      queryFn: ({ signal }) => fetchTodo({ id, signal }),
      staleTime: 60_000,
    });
  };

  // Detail query (dependent: only runs when selectedId is set)
  const {
    data: selectedTodo,
    isFetching: isFetchingDetail,
  } = useQuery({
    queryKey: ['todo', selectedId],
    queryFn: ({ queryKey, signal }) => {
      const [, id] = queryKey as [string, number | null];
      if (!id) throw new Error('No todo id'); // won’t run when disabled
      return fetchTodo({ id, signal });
    },
    enabled: !!selectedId,
    staleTime: 60_000,
  });

  // Create
  const createMutation = useMutation({
    mutationFn: createTodo,
    // Optimistic update: add a temporary item to the current page
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ['todos', page] });

      const prev = queryClient.getQueryData<Todo[]>(['todos', page]);
      const optimistic: Todo = {
        id: Date.now(), // temp id
        title: variables.title,
        completed: false,
      };

      queryClient.setQueryData<Todo[]>(['todos', page], (old) => {
        return old ? [optimistic, ...old] : [optimistic];
      });

      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(['todos', page], ctx.prev);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // Toggle complete
  const toggleMutation = useMutation({
    mutationFn: toggleTodo,
    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey: ['todos', page] });
      const prev = queryClient.getQueryData<Todo[]>(['todos', page]);

      queryClient.setQueryData<Todo[]>(['todos', page], (old) =>
        (old ?? []).map((t) => (t.id === id ? { ...t, completed } : t))
      );

      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(['todos', page], ctx.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      if (selectedId) {
        queryClient.invalidateQueries({ queryKey: ['todo', selectedId] });
      }
    },
  });

  // Delete
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ['todos', page] });
      const prev = queryClient.getQueryData<Todo[]>(['todos', page]);

      queryClient.setQueryData<Todo[]>(['todos', page], (old) =>
        (old ?? []).filter((t) => t.id !== id)
      );

      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(['todos', page], ctx.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createMutation.mutate({ title: newTitle.trim() });
    setNewTitle('');
  };

  if (isLoading) return <p>Loading todos…</p>;
  if (isError) return <p style={{ color: 'red' }}>{(error as Error).message}</p>;

  return (
    <div>
      <form onSubmit={handleAdd} style={{ marginBottom: '1rem' }}>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New todo title"
          style={{ padding: '0.5rem', width: '60%' }}
        />
        <button type="submit" style={{ marginLeft: '0.5rem' }}>
          Add
        </button>
        {createMutation.isPending && <span style={{ marginLeft: 10 }}>Saving…</span>}
      </form>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h2 style={{ margin: 0 }}>Todos (Page {page})</h2>
            {isFetching && <small>Refreshing…</small>}
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {(todos ?? []).map((t) => (
              <li
                key={t.id}
                onMouseEnter={() => prefetchTodo(t.id)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                }}
              >
                <span onClick={() => setSelectedId(t.id)}>
                  {t.completed ? '✅' : '⬜️'} {t.title}
                </span>
                <span style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() =>
                      toggleMutation.mutate({ id: t.id, completed: !t.completed })
                    }
                  >
                    Toggle
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate({ id: t.id })}
                    style={{ color: 'red' }}
                  >
                    Delete
                  </button>
                </span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
            <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              ← Prev
            </button>
            <button onClick={() => setPage((p) => p + 1)}>Next →</button>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ marginTop: 0 }}>Todo Detail</h2>
          {!selectedId && <p>Select a todo to view details.</p>}
          {selectedId && (
            <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: 6 }}>
              {isFetchingDetail ? (
                <p>Loading detail…</p>
              ) : selectedTodo ? (
                <>
                  <p><strong>ID:</strong> {selectedTodo.id}</p>
                  <p><strong>Title:</strong> {selectedTodo.title}</p>
                  <p>
                    <strong>Status:</strong> {selectedTodo.completed ? 'Completed' : 'Incomplete'}
                  </p>
                </>
              ) : (
                <p>No data</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export {Todos};