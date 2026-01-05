import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
  };

  useEffect(()=>{
    fetchAPI();
    },[]);

  return (
    <>
      <div>
        <h1>UCVTS Lost and Found</h1>
        <p>oui oui bagel</p>
      </div>
      <div>
        <h2>Recently Lost</h2>
        <button>See all</button>
      </div>
      <div>
        <h2>Getting started?</h2>
        <p>[Youtube Video embed here]</p>
      </div>
    </>
  )
}

export default App
