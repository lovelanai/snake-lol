import logo from "./logo.svg";
import "./App.css";
import { useRef, useEffect, useState } from "react";
import apple from "./assets/pngegg.png";

function App() {
  const [snakePositionY, setSnakePositionY] = useState(0);
  const [snakePositionX, setSnakePositionX] = useState(0);
  const [snakeRotation, setSnakeRotation] = useState(0);
  const [snakeWidth, setSnakeWidth] = useState(8);
  const [appleHit, setAppleHit] = useState(false);

  const handleKeyDown = (event) => {
    if (event.keyCode === 38) {
      up();
    }
    if (event.keyCode === 40) {
      down();
    }

    if (event.keyCode === 37) {
      right();
    }

    if (event.keyCode === 39) {
      left();
    }
  };

  const up = () => {
    setSnakePositionY(snakePositionY + 20);
    setSnakeRotation(-270);
  };

  const down = () => {
    setSnakePositionY(snakePositionY + -20);

    setSnakeRotation(270);
  };

  const left = () => {
    setSnakePositionX(snakePositionX + 20);

    setSnakeRotation(180);
  };

  const right = () => {
    setSnakePositionX(snakePositionX - 20);

    setSnakeRotation(0);
  };

  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
    collision();
    console.log(snakePositionY);
    console.log(snakePositionX);
    if (snakePositionX < 0) {
      setSnakePositionX(0);
    }

    if (snakePositionY > 760) {
      setSnakePositionY(-20);
    }
    if (snakePositionY < -100) {
      setSnakePositionY(700);
    }
  }, [snakePositionX, snakePositionY]);

  const collision = () => {
    // let x = snakePositionX === applePositionX;
    // let y = snakePositionY === applePositionY;

    if (
      (snakePositionX === applePositionX) &
      (snakePositionY === applePositionY)
    ) {
      setSnakeWidth(snakeWidth + 3);
      setAppleHit(true);
      console.log("fetare");
    }
  };

  const applePositionX = 100;

  const applePositionY = 100;

  return (
    <div className="gameContainer">
      <h1 className="name">
        Jånas the <br></br>parkour god snake
      </h1>
      <div className="gameContent">
        <div className="snakeArea">
          <div
            className="hitbox"
            style={{
              bottom: `${snakePositionY}px`,
              left: `${snakePositionX}px`,
              rotate: `${snakeRotation}deg`,
            }}
          >
            <div
              className="jonerbroner"
              ref={ref}
              tabIndex={-1}
              onKeyDown={handleKeyDown}
              style={{ width: `${snakeWidth}rem` }}
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
        </div>
        {appleHit ? (
          <></>
        ) : (
          <div
            style={{
              height: "3rem",
              position: "absolute",
              bottom: `${applePositionY}px`,
              left: `${applePositionX}px`,
              background: "blue",
            }}
            className="apple"
          >
            <img src={apple}></img>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
