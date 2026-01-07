import './App.css'
import { PostsList } from './features/PostsList';

function App() {

  return (
    <>
      <div style={{ padding: 24 }}>
        <h1>RTK Query Demo</h1>
        <p>Data fetching, caching, mutations, invalidations & optimistic updates.</p>
        <PostsList />
      </div>
    </>
  )
}

export default App;