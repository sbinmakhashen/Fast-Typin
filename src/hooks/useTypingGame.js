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
  const tooltip = useRef(null);
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

  function displayInput() {
    inputNum.current.style.display = 'block';
    tooltip.current.style.display = 'none';
  }

  // show this message when the user clicks the space keyword
  const parentEl = document.querySelector('.header');
  const newEl = document.createElement('strong');
  function errorMsg() {
    newEl.innerHTML = 'You cant start the timer with an empty string!!';
    newEl.classList.add('new-el');
    document.body.insertBefore(newEl, parentEl);
  }

  // when game starts run this function
  function startGame() {
    setIsTimeRunning(true);
    setWordCount(0);
    setCharCount(0);
    setText('');
    textBox.current.focus();
    inputNum.current.style.display = 'none';
    document.body.style.backgroundColor = 'green';
  }
  // when time isTimeremaing is equal to false then run function below
  function endGame() {
    setIsTimeRunning(false);
    setTimeRemaining(5);
    setCharCount(text.length);
    setWordCount(calcWordCount());
    textBox.current.focus();
    const textBoxDisabled = (textBox.current.disabled = true);
    textBoxDisabled;
    setTimeout(() => {
      textBox.current.disabled = false;
      textBox.current.focus();
    }, 3000);
    setText('');
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
    textBox.current.focus();
  }, [timeRemaining, isTimeRunning]);

  return {
    handleChange,
    text,
    wordCount,
    charCount,
    timeRemaining,
    startGame,
    endGame,
    errorMsg,
    textBox,
    isTimeRunning,
    numChange,
    inputNum,
    tooltip,
    timeRemRef,
    displayInput,
  };
}

export default useTypingGame;
