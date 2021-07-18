import React from 'react';
import useTypingGame from '../hooks/useTypingGame';
import Counting from '../img/counting.gif';
function Typing() {
  const {
    handleChange,
    text,
    wordCount,
    charCount,
    timeRemaining,
    startGame,
    errorMsg,
    textBox,
    isTimeRunning,
    numChange,
    closeNumInput,
    inputNum,
    tooltip,
    timeRemRef,
    displayInput,
  } = useTypingGame();
  return (
    <div className='typing'>
      <textarea
        name='text'
        id='text'
        cols='40'
        rows='10'
        onChange={handleChange}
        value={text}
        ref={textBox}
        onKeyUp={(e) =>
          text.length === 1 && e.code === 'Space' ? errorMsg() : startGame()
        }
        // onInput={startGame}
        placeholder='Timer will start when you start typing...'
      />
      {/* for changing the remaining seconds */}
      <input
        className='inputNum'
        type='number'
        name='num'
        id='num'
        value={timeRemaining}
        onChange={numChange}
        ref={inputNum}
      />
      {/* for closing the input */}
      <p onClick={closeNumInput} className='num-close'>
        X
      </p>

      {isTimeRunning ? (
        <h2 className='time'>{timeRemaining} seconds left</h2>
      ) : (
        <div id='container'>
          <div className='time-container'>
            <h2 className='time' ref={timeRemRef} onClick={displayInput}>
              Time remaining: {timeRemaining}s
            </h2>
          </div>
          <p className='tooltip' ref={tooltip}>
            <span
              onClick={() => document.querySelector('.tooltip').remove()}
              className='close'
            >
              X
            </span>
            Please click on "Time remaining" above to increase remaining
            seconds'. The timer is set to 5 sec by default
          </p>
        </div>
      )}
      {isTimeRunning ? (
        <h1 className='gameOn' style={{ color: '#fff' }}>
          Counting...
          <img src={Counting} width='150' height='90' />
        </h1>
      ) : (
        ''
      )}

      {!isTimeRunning ? (
        <h1 className='typin-results' style={{ color: 'lightgreen' }}>
          <strong>Results: </strong>
          {wordCount} words and {charCount} characters
        </h1>
      ) : (
        <h2 className='typin-results' style={{ color: '#e0e0e0' }}>
          Typing results will show after typing
        </h2>
      )}
    </div>
  );
}

export default Typing;
