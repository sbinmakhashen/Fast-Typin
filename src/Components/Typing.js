import React from 'react';
import useTypingGame from '../hooks/useTypingGame';

function Typing() {
  const {
    handleChange,
    text,
    wordCount,
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

      <h1>Word count: {wordCount}</h1>
    </div>
  );
}

export default Typing;
