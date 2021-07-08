import React, { useState, useEffect, useRef } from 'react';

function useTypingGame() {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const textBox = useRef(null);
  const inputNum = useRef(null);
  const timeRemRef = useRef(null);
  function handleChange(e) {
    const { value } = e.target;
    setText(value);
  }

  function calcWordCount() {
    const wLength = text.trim().split(' ');
    return wLength.filter((word) => word !== '').length;
  }

  function numChange(e) {
    const { value } = e.target;
    value < 0 ? 0 : setTimeRemaining(value);
  }

  const newEl = document.createElement('h4');
  const aboveIcon = document.createElement('i');
  function showInput() {
    const timeContianer = document.querySelector('.time-container');
    newEl.className = 'newEL';
    newEl.innerHTML =
      ' Please click on "Time remaining" above to increase remaining seconds';
    aboveIcon.className = 'far fa-hand-point-up';

    timeContianer.appendChild(aboveIcon);
    timeContianer.appendChild(newEl);
  }

  function removeEls() {
    newEl.remove();
    aboveIcon.remove();
  }
  function displayInput() {
    inputNum.current.style.display = 'block';
  }
  // when game starts run this function
  function startGame() {
    setIsTimeRunning(true);
    setWordCount(0);
    setCharCount(0);
    inputNum.current.value <= 0
      ? setTimeRemaining(5)
      : setTimeRemaining(inputNum.current.value);
    setText('');
    textBox.current.disabled = false;
    textBox.current.focus();
    inputNum.current.style.display = 'none';
    document.body.style.backgroundColor = 'green';
  }
  // when time remaining is equal to 0 then run function below
  function endGame() {
    setIsTimeRunning(false);
    setTimeRemaining(0);
    setCharCount(text.length);
    setWordCount(calcWordCount());
    textBox.current.disabled = true;
    document.body.style.backgroundColor = '#282c34';
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isTimeRunning]);

  return {
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
  };
}

export default useTypingGame;
