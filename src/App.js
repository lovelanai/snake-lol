import logo from "./logo.svg";
import "./App.css";
import { useRef, useEffect, useState } from "react";
import apple from "./assets/pngegg.png";

function App() {
  const [snakePositionY, setSnakePositionY] = useState(10);
  const [snakePositionX, setSnakePositionX] = useState(10);
  const [snakeRotation, setSnakeRotation] = useState(0);

  const handleKeyDown = (event) => {
    if (event.keyCode === 38) {
      up();
    }
    if (event.keyCode === 40) {
      down();
    }

    if (event.keyCode === 39) {
      right();
    }

    if (event.keyCode === 37) {
      left();
    }
  };

  const up = () => {
    setSnakePositionY(snakePositionY + 20);
    console.log(snakePositionY);
    setSnakeRotation(270);
  };

  const down = () => {
    setSnakePositionY(snakePositionY - 20);
    console.log(snakePositionY);
    setSnakeRotation(-270);
  };

  const left = () => {
    setSnakePositionX(snakePositionX - 20);
    console.log(snakePositionX);
    setSnakeRotation(180);
  };

  const right = () => {
    setSnakePositionX(snakePositionX + 20);
    console.log(snakePositionX);
    setSnakeRotation(0);
  };

  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div className="gameContainer">
      <h1 className="name">
        Jånas the <br></br>parkour god snake
      </h1>
      <div className="gameContent">
        <div
          style={{
            bottom: `${snakePositionY}px`,
            left: `${snakePositionX}px`,
            rotate: `${snakeRotation}deg`,
          }}
          className="snakeArea"
        >
          <div
            className="jonerbroner"
            ref={ref}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
          >
            <div className="face">
              <div className="eyes">
                <div className="left-eye"></div>
                <div className="right-eye"></div>
              </div>
              <div className="mun"></div>
            </div>
          </div>
        </div>

        <div
          style={{
            height: "3rem",
            position: "absolute",
          }}
          className="apple"
        >
          <img src={apple}></img>
        </div>
      </div>
    </div>
  );
}

export default App;
