import './App.css'
import { ProjectsPage } from './projects/ProjectsPage';
import { HomePage } from './HomePage';
import { RouteNotFound } from './RouteNotFound';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router';
import { ProjectPage } from './projects/ProjectPage';

function App() {
  return (
    <>
      {/* <blockquote cite='Benjamin Franklin'>
        Tell me & I forget, teach me & I may remember, involve me & I learn.
      </blockquote> */}
      <BrowserRouter>
        <header className='sticky'>
          <span className='logo'>
            <NavLink to="/">
              <img src="/assets/logo-3.svg" alt="Projects List" width="49" height="99" />
            </NavLink>
          </span>
          <NavLink to="/home" className="button rounded">
            <span className='icon-home'></span>
            Home
          </NavLink>
          <NavLink to="/projects" className="button rounded">
            Projects
          </NavLink>
        </header>
        <div className='container'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/projects' element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route path='*' element={<RouteNotFound />} /> 
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;