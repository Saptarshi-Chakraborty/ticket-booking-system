import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="/" target="_blank" style={{ display: "none" }}>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="/" target="_self">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hello, Ruhii </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)} style={{ backgroundColor: "#4478" }}>
          Click to increase love
        </button>
        <p>
          {
            // render same number of heart as count
            Array(count + 1).join('💖')
          }
        </p>
      </div>
      <p className="read-the-docs">
        Let's promise to be best friends forever. &lt;3<br />
      </p>
    </>
  )
}

export default App
