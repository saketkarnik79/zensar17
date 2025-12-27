// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Post } from './post';
import { Hello } from './Hello';

import './App.css'

function App() {
  
const data: string ="This is some paragraph";
  return (
    <>
      <h1>
        Hello React
      </h1>
      <p className='democlass'>{data}</p>
      <hr/>
      <Post />
      <hr/>
      <Post />
      <hr />
      <Hello/>
    </>
  );
}

export default App;