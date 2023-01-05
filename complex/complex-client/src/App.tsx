import logo from './logo.svg';
import './App.css';
import { RootRouter } from "./routers"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Fib calculator</h1>
        <RootRouter />
      </header>
    </div>
  );
}

export default App;
