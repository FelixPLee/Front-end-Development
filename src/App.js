import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import SeriesForm from './components/SerieForm/SerieForm';
import SeriesList from './components/SerieList/SerieList';

function App() {
  return (
    <div className="App">
      <NavBar />
      <SeriesForm />
      <SeriesList />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
