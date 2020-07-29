import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import randomColor from "randomcolor";


function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/playground">Playground</Link>
          </li>
          <li>
            <Link to="/name">Name</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/playground">
            <Playground />
          </Route>
          <Route path="/name">
            <Name />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}


function Playground() {
    const [count, setCount] = useState(0);

    const [color, setColor] = useState(null);
    useEffect(() => {
        setColor(randomColor());
    }, [count]);

    return (
        <div style={{ borderTop: `10px solid ${color}` }}>
            {count}
            <button onClick={() => setCount((currentCount) => currentCount - 1)}>
                -
            </button>
            <button onClick={() => setCount((currentCount) => currentCount + 1)}>
                +
            </button>
        </div>
    );
}


function Name() {
  const [name, setName] = useState("");
  return (
      <label className="App-header">
          <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onClick={(e) => e.target.setSelectionRange(0, e.target.value.length)}
              placeholder="Untitled"
          />
      </label>
  );
}

export default App;



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
