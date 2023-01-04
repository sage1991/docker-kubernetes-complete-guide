import logo from './logo.svg';
import './App.css';
import { RootRouter } from "./routers"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <RootRouter />
      </header>
    </div>
  );
}

export default App;
