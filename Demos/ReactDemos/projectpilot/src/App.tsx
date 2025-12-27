import './App.css'
import { ProjectsPage } from './projects/ProjectsPage';

function App() {
  return (
    <>
      {/* <blockquote cite='Benjamin Franklin'>
        Tell me & I forget, teach me & I may remember, involve me & I learn.
      </blockquote> */}
      <div className='container'>
        <ProjectsPage />
      </div>
    </>
  );
};

export default App;