import React, {useState, useEffect} from 'react';

function App() {
  const [count, setCount] = useState(1200);
  const [isActive, setIsActive] = useState(false);
  const [isClosed, setIsClosed] = useState(true); //modal box: true when count hits 0
  const seconds = count % 60;
  const secondString = seconds.toString().padStart(2, '0');
  const minutes = Math.floor(count / 60);
  let interval = null;

  let checkZero= () =>{
    if (count <= 0) {
      pause();
      close();
    }
  }
  useEffect(() =>{
    if (isActive) {
      interval = setInterval(() => {
        setCount(prevCount => prevCount - 1)
      }, 1000);
      checkZero();
    }
    return () => clearInterval(interval)
  }, [isActive, count])

  function start() {
    setIsActive(true)
  }

  function pause() {
    setIsActive(!isActive)
  }

  function reset() {
    setCount(1200);
    setIsActive(false);
  }

  function addTime() {
    if (!isActive) {
      setCount(prevCount => prevCount + 60)
    }
  }

  function decreaseTime() {
    if (!isActive) {
      setCount(prevCount => prevCount - 60)
    }
    if (count <= 59) {
      setCount(0)
    }
  }

  function close() {
    setIsClosed(!isClosed)
  }

  console.log("isClosed", isClosed);
  //console.log("isActive", isActive);
  //console.log("click", click)

  return (
      <div>
        <h1>{minutes} : {secondString}</h1>
        <button onClick={start}>start</button>
        <button onClick={pause}>pause</button>
        <button onClick={reset}>reset</button>
        <button onClick={addTime}>+</button>
        <button onClick={decreaseTime}>-</button>
        <div style={{display : isClosed ? 'none' : 'block'}} id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={close}>&times;</span>
            <p>Take a break</p>
          </div>
        </div>
      </div>
  );
}

export default App;