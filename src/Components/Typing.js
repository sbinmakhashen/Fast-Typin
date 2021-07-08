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
    textBox,
    isTimeRunning,
    numChange,
    inputNum,
    timeRemRef,
    showInput,
    removeEls,
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
        disabled={!isTimeRunning}
        placeholder={isTimeRunning ? 'Please start typing...' : 'Disabled'}
      />
      <input
        className='inputNum'
        type='number'
        name='num'
        id='num'
        value={timeRemaining}
        onChange={numChange}
        ref={inputNum}
      />
      {isTimeRunning ? (
        <h2 className='time'>{timeRemaining} seconds left</h2>
      ) : (
        <div
          className='time-container'
          onMouseEnter={showInput}
          onMouseLeave={removeEls}
        >
          <h2 className='time' ref={timeRemRef} onClick={displayInput}>
            Time remaining: {timeRemaining}s
          </h2>
        </div>
      )}

      <button onClick={startGame} className='btn' disabled={isTimeRunning}>
        {timeRemaining === 0 ? 'Try again' : 'START'}
      </button>

      {/* <img src={Counting} width='150' height='90' /> */}
      {isTimeRunning ? (
        <h1 className='gameOn' style={{ color: '#fff' }}>
          Counting...
          <img src={Counting} width='150' height='90' />
        </h1>
      ) : (
        ''
      )}

      {timeRemaining === 0 ? (
        <h1 style={{ color: 'lightgreen' }}>
          <strong>Results: </strong>
          {wordCount} words and {charCount} characters
        </h1>
      ) : (
        <h2 style={{ color: '#e0e0e0' }}>
          Typing results will show after typing
        </h2>
      )}
    </div>
  );
}

export default Typing;
