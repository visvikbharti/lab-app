import React from 'react';
import './App.css';
import Welcome from './components/Welcome';
import Analyzer from './components/Analyzer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Lab App</h1>
        <Welcome />
        <Analyzer />
      </header>
    </div>
  );
}

export default App;
