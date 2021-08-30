import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import {motion} from 'framer-motion';

import Button from './components/Button';
import InputScreen from './components/InputScreen';

function App() {

  const [alertBox, setAlertBox] = useState({isVisible: false, content: "Error!"});
  const [result, setResult] = useState("0");

  const clearInput = () => {
    setAlertBox({ isVisible: false, content: alertBox.content});
    setResult("0");
  }
  const oppositeSignInput = () => {

    if( isInputContainOperator(result) )
      setAlertBox({ isVisible: true, content: "Please calculate the numbers on the screen before applying the opposite sign!" });
    else if( isInputContainError(result) )
      setAlertBox({ isVisible: true, content: "Please clear the screen(AC) and enter a number before applying the opposite sign!" });
    else {
      try {
        setAlertBox({ isVisible: false, content: alertBox.content });
        setResult( dotToComma( commaToDot(result)*-1 ) );
      }
      catch(err){
        setAlertBox({ isVisible: true, content: "An unknown error occurred while applying the opposite sign!"});
        setResult("Error!");
      }
    }
  }
  const percentageFromInput = () => {

    if( isInputContainOperator(result) )
      setAlertBox({ isVisible: true, content: "Please calculate the numbers on the screen before getting the percentage!" });
    else if( isInputContainError(result) )
      setAlertBox({ isVisible: true, content: "Please clear the screen(AC) and enter a number before getting the percentage!" });
    else {
      try {
        setAlertBox({ isVisible: false, content: alertBox.content });
        setResult( dotToComma(commaToDot(result) / 100) );
      }
      catch(err){
        setAlertBox({ isVisible: true, content: "An unknown error occurred while calculating the percentage!"});
        setResult("Error!");
      }
    }
  }


  const addToInput = (val) => {

    if( isInputContainError(result) )
      setAlertBox({ isVisible: true, content: "Please clear the screen(AC) and enter a number!"});
    else {
      setAlertBox({ isVisible: false, content: alertBox.content });
      setResult( (result) => result != "0" ? result + val : val );
    }
  }
  const removeFromInput = () => {
    if( !isInputContainError(result) )
    setResult( result.slice(0, -1) );
    else    
    setAlertBox({ isVisible: true, content: "Please clear the screen(AC) and enter a number before removing the number!" });
  }



  const calculateInput = () => {

    try {
      setResult( dotToComma( calcEval( commaToDot(result) ) ) );
    }
    catch(err){ 
      setAlertBox({ isVisible: true, content: "An unknown error occurred while calculating the numbers (incorrect operation usage)!"});
      setResult("Error!");
    }

  }

  const commaToDot = thisVal => thisVal.toString().replaceAll(',','.');
  const calcEval = thisVal => eval(thisVal);
  const dotToComma = thisVal => thisVal.toString().replace(".",",");
  const isInputContainOperator = thisVal => ((thisVal.includes('-') && thisVal.charAt(0) != ('-')) || thisVal.includes('+') || thisVal.includes('*') || thisVal.includes('/'));
  const isInputContainError = thisVal => thisVal.includes('Error!');
  
  const keydownListener = useCallback((e) => {
        // console.log(e.key);
        switch (e.key) {
          case "Backspace": removeFromInput(); break;
          case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": addToInput(e.key); break;
          case "-": case "+": case "*": case "/": case ",": addToInput(e.key); break;
          case "Enter":  e.preventDefault(); calculateInput(); break;
      }
  }, [result]);
  useEffect(() => {
      window.addEventListener('keydown', keydownListener);
      return () => window.removeEventListener('keydown', keydownListener);
  }, [keydownListener]);

  const animVariants = {
    visible: {
      opacity: 1,
      display: "block",
    },
    hidden: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
  }
  return (
    <div className="container">

      <motion.div
          initial="hidden"
          animate={alertBox.isVisible ? "visible" : "hidden"}
          transition={{ duration: 1 }}
          variants={animVariants}
      >
        <div className="alert alert-warning align-items-center mb-1 p-1 text-center" role="alert">
          <i className="bi bi-exclamation-triangle-fill"></i> 
          <span className="alert-text"> {alertBox.content}</span>
        </div>
      </motion.div>
  
      <div className="row justify-content-center">

        <div className="row col-10">
          <InputScreen result={result} col="10"/>
          <Button val="del" type="delete" col="2" btnOnClick={removeFromInput}/>
        </div>

        <div className="row col-10">
          <Button val="AC" type="process" btnOnClick={clearInput}/>
          <Button val="+/-" type="process" btnOnClick={oppositeSignInput}/>
          <Button val="%" type="process" btnOnClick={percentageFromInput}/>
          <Button val="/" type="operation" btnOnClick={addToInput}/>
        </div>

        <div className="row col-10">
          <Button val="7" btnOnClick={addToInput}/>
          <Button val="8" btnOnClick={addToInput}/>
          <Button val="9" btnOnClick={addToInput}/>
          <Button val="*" type="operation" btnOnClick={addToInput}/>
        </div>


        <div className="row col-10">
          <Button val="4" btnOnClick={addToInput}/>
          <Button val="5" btnOnClick={addToInput}/>
          <Button val="6" btnOnClick={addToInput}/>
          <Button val="-" type="operation" btnOnClick={addToInput}/>
        </div>

        <div className="row col-10">
          <Button val="1" btnOnClick={addToInput}/>
          <Button val="2" btnOnClick={addToInput}/>
          <Button val="3" btnOnClick={addToInput}/>
          <Button val="+" type="operation" btnOnClick={addToInput}/>
        </div>

        <div className="row col-10">
          <Button val="0" col="6" btnOnClick={addToInput}/>
          <Button val="," btnOnClick={addToInput}/>
          <Button val="=" type="operation" btnOnClick={calculateInput}/>
        </div>
      </div>
    </div>
  );
}

export default App;
