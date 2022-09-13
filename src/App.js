import logo from "./logo.svg";
import "./App.css";
import { useRef, useEffect, useState } from "react";
import apple from "./assets/pngegg.png";
import poopHouse from "./assets/poophouse.png";

function App() {
  const [snakePositionY, setSnakePositionY] = useState(0);
  const [snakePositionX, setSnakePositionX] = useState(0);
  const [snakeRotation, setSnakeRotation] = useState(0);
  const [snakeWidth, setSnakeWidth] = useState(8);
  const [snakeHeight, setSnakeHeight] = useState(2);
  const [appleHit, setAppleHit] = useState(false);
  const [applePositionX, setApplePositionX] = useState(100);
  const [applePositionY, setApplePositionY] = useState(100);
  const [isSnakeFat, setIsSnakeFat] = useState(false);
  const [faceColor, setFaceColor] = useState("rgb(155, 10, 168)");
  const [bodyColor, setBodyColor] = useState("rgb(155, 10, 168)");
  const [pooped, setPooped] = useState(false);

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
    console.log(applePositionX, applePositionY);

    if (snakePositionX < 0) {
      setSnakePositionX(0);
    }

    if (snakePositionY > 760) {
      setSnakePositionY(-20);
    }
    if (snakePositionY < -100) {
      setSnakePositionY(700);
    }

    if (snakeWidth > 10) {
      setIsSnakeFat(true);
    }

    if (!isSnakeFat) {
      setFaceColor("rgb(155, 10, 168)");
      setBodyColor("rgb(155, 10, 168)");
      setSnakeHeight(2);
    }

    if (isSnakeFat) {
      setFaceColor("red");
      setBodyColor("red");
      setSnakeHeight(4);
    }

    if (isSnakeFat && snakePositionY >= 500 && snakePositionX <= 60) {
      setPooped(true);
      setSnakeWidth(8);
      console.log("jag sket");
    }

    if (pooped & (snakeWidth < 10)) {
      setIsSnakeFat(false);
    }

    collision();

    console.log(snakePositionX + "X");
    console.log(snakePositionY + "y");
  }, [snakePositionX, snakePositionY]);

  let poopHouseX = "0";
  let poopHouseY = "0";

  const collision = () => {
    if (
      (snakePositionX === applePositionX) &
      (snakePositionY === applePositionY)
    ) {
      setSnakeWidth(snakeWidth + 3);
      setAppleHit(true);

      let resultX = parseInt(Math.random() * 30) * 20;
      let resultY = parseInt(Math.random() * 30) * 20;

      setApplePositionX(resultX);
      setApplePositionY(resultY);
    }
    renderAnotherApple();
    /* if */
  };

  const renderAnotherApple = () => {
    setAppleHit(false);
  };

  return (
    <div className="gameContainer">
      <h1 className="name">
        Jånas the <br></br>parkour god snake
      </h1>
      <div className="gameContent">
        {isSnakeFat ? (
          <>
            <div
              style={{ top: `${poopHouseY}rem`, left: `${poopHouseX}rem` }}
              className="poopHouse"
            >
              <img src={poopHouse}></img>
            </div>
            <div className="full">
              <h1>SNAKE IS FULL</h1>
              <p>USE TOILET!</p>
            </div>
          </>
        ) : (
          <></>
        )}
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
              style={{
                width: `${snakeWidth}rem`,
                height: `${snakeHeight}rem`,
                background: `${bodyColor}`,
              }}
            >
              <div style={{ background: `${faceColor}` }} className="face">
                {isSnakeFat ? <div className="svett"></div> : <></>}
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
