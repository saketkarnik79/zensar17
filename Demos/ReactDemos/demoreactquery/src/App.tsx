import './App.css';
import { Todos } from './Todos';

function App() {

  return (
    <>
      
    <div style={{ margin: '2rem auto', fontFamily: 'system-ui, Segoe UI, Arial' }}>
      <h1>TanStack Query (React Query) Demo</h1>
      <hr/>
      <p>Fetching, caching, mutations (with optimistic updates), pagination-friendly UI, and Devtools.</p>
      <Todos />
    </div>

    </>
  )
}

export default App;
