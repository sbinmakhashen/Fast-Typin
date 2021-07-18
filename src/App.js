import './App.css';
import './Components/Typing';
import Typing from './Components/Typing';
import useTypingGame from './hooks/useTypingGame';
function App() {
  const { sampleText } = useTypingGame();

  return (
    <div className='App'>
      <header className='header'>
        <h1 className='gameOn'>How fast can you type?</h1>
        <div className='error'>
          <strong className='errorMsg'>
            You can't start the timer with an empty string!!
          </strong>
        </div>
        <div id='sample-text'>
          <h3 className='p-title'>Sample Text</h3>
          <div id='p-sample-container'>
            <p class='p-sample'>
              When we talk about motivating others, the justification is the end
              result (either we want to avoid the pain or go towards pleasure)
              or what we want to get the person to do. How we achieve the end
              result, are our alternatives.
            </p>
          </div>
          <button onClick={sampleText} className='btn'>
            Change Text Sample
          </button>
        </div>
      </header>
      <div className='error'></div>
      <main>
        <Typing />
      </main>
    </div>
  );
}

export default App;
