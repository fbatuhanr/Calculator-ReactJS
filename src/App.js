import React, {useCallback, useEffect, useState} from 'react'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Button from './components/Button';
import InputScreen from './components/InputScreen';

function App() {

  const [result, setResult] = useState("0");

  const addToInput = (val) => {
    setResult( (result) => (result != "0" ? result + val : val) );
  }


  const removeFromInput = () => {
    console.log(result);
  }

  const clearInput = () => {
    setResult("0");
  }

  const calculateInput = () => {

    setResult(eval(result))
  }

  
  const eventListener = useCallback((e) => {

      // console.log(e.key);

      switch (e.key) {
        case "Backspace": removeFromInput(); break;
        case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": addToInput(e.key); break;
        case "-": case "+": case "*": case "/": addToInput(e.key); break;
        case "Enter": calculateInput(); break;
    }

  }, [result]);

  useEffect(() => {
    window.addEventListener('keydown', eventListener);
    return () => window.removeEventListener('keydown', eventListener);
}, [eventListener]);

  return (
    <div className="container">
      <div className="row justify-content-center">

        <div className="row col-10">
          <InputScreen result={result}/>
        </div>

        <div className="row col-10">
          <Button val="AC" type="process" btnOnClick={clearInput}/>
          <Button val="+/-" type="process"/>
          <Button val="%" type="process"/>
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
