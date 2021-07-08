import './App.css';
import './Components/Typing';
import Typing from './Components/Typing';
function App() {
  return (
    <div className='App'>
      <header>
        <h1 className='gameOn'>How fast can you type?</h1>
      </header>
      <main>
        <Typing />
      </main>
    </div>
  );
}

export default App;
