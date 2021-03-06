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

  // sample text
  function sampleText() {
    const sampleMessages = [
      'As a manager, we need to understand the other person justification and then come up with alternatives.',
      'We may then choose the right alternative. However, in general, we choose the first or the emotionally satisfying one. Typically people stop at this level of analysis and start to act.',
      'But a good manager would think of the following also: Will the action guarantee the consequence? What about other unintended consequences? This requires a certain experience.',
      'Are we capable of doing this action? Intention and the selection of the most ideal alternative do not guarantee execution, if we do not have the skills and the experience. Most motivational tactics fail, because without execution capability, they is only wishful thinking.',
    ];
    const randomNum = Math.floor(Math.random() * sampleMessages.length);
    document.getElementById(
      'p-sample-container'
    ).innerHTML = `<p class='p-sample'>${sampleMessages[randomNum]}</p>`;
  }

  function numChange(e) {
    const { value } = e.target;
    value < 0 ? 0 : setTimeRemaining(value);
  }

  function closeNumInput() {
    inputNum.current.style.display = 'none';
    document.querySelector('.num-close').style.display = 'none';
    document.querySelector('.gameOn').style.display = 'block';
  }

  function displayInput() {
    inputNum.current.style.display = 'block';
    tooltip.current.style.display = 'none';
    document.querySelector('.num-close').style.display = 'block';
    document.querySelector('.gameOn').style.display = 'none';
    console.log(document.querySelector('.gameOn'));
  }

  // show this message when the user clicks the space keyword
  function errorMsg() {
    const error = document.querySelector('.errorMsg');
    error.style.display = 'block';
    textBox.current.disabled = true;
    setText('');
    textBox.current.placeholder = 'Please wait 3 seonds....';
    console.log('error ');
    document.querySelector('.gameOn').style.display = 'none';
    setTimeout(() => {
      error.style.display = 'none';
      textBox.current.disabled = false;
      textBox.current.placeholder = 'Timer will start when you strat typing...';
      document.querySelector('.gameOn').style.display = 'block';
      textBox.current.focus();
      setIsTimeRunning(false);
      setText('');
    }, 3000);
  }
  // when game starts run this function
  function startGame() {
    setIsTimeRunning(true);
    setWordCount(0);
    setCharCount(0);
    textBox.current.focus();
    inputNum.current.style.display = 'none';
    document.querySelector('.gameOn').style.display = 'none';
    document.querySelector('.num-close').style.display = 'none';
    document.body.style.backgroundColor = 'green';
  }
  // when time isTimeremaing is equal to false then run function below
  function endGame() {
    setIsTimeRunning(false);
    setTimeRemaining(5);
    setCharCount(text.length);
    setWordCount(calcWordCount());
    textBox.current.focus();
    textBox.current.disabled = true;
    textBox.current.placeholder = 'Please wait 3 seonds....';
    document.querySelector('.gameOn').style.display = 'block';
    setTimeout(() => {
      textBox.current.disabled = false;
      textBox.current.focus();
      textBox.current.placeholder = 'Timer will start when you start typing...';
    }, 3000);
    setText('');
    document.body.style.backgroundColor = '#282c34';
  }

  useEffect(() => {
    if (textBox.current) {
      textBox.current.focus();
    }
  }, []);

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
    sampleText,
    wordCount,
    charCount,
    timeRemaining,
    startGame,
    endGame,
    errorMsg,
    textBox,
    isTimeRunning,
    numChange,
    closeNumInput,
    inputNum,
    tooltip,
    timeRemRef,
    displayInput,
  };
}

export default useTypingGame;
