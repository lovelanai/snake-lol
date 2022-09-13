import { useEffect, useRef, useState } from "react";
import "./App.css";
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

  //Handle keydowns
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

  //Moves snake up
  const up = () => {
    setSnakePositionY(snakePositionY + 20);
    setSnakeRotation(-270);
  };
  //Moves snake down
  const down = () => {
    setSnakePositionY(snakePositionY + -20);

    setSnakeRotation(270);
  };
  //Moves snake left
  const left = () => {
    setSnakePositionX(snakePositionX + 20);

    setSnakeRotation(180);
  };
  //Moves snake right
  const right = () => {
    setSnakePositionX(snakePositionX - 20);
    setSnakeRotation(0);
  };

  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
    console.log(applePositionX, applePositionY);

    // snake cant go out left
    if (snakePositionX < 0) {
      setSnakePositionX(0);
    }

    // snake goes around Y axle
    if (snakePositionY > 760) {
      setSnakePositionY(-20);
    }

    if (snakePositionY < -100) {
      setSnakePositionY(700);
    }

    // snake gets fat
    if (snakeWidth > 20) {
      setIsSnakeFat(true);
    }

    // if snake isn't fat
    if (!isSnakeFat) {
      setFaceColor("rgb(155, 10, 168)");
      setBodyColor("rgb(155, 10, 168)");
      setSnakeHeight(2);
    }

    // if snake is fat
    if (isSnakeFat) {
      setFaceColor("red");
      setBodyColor("red");
      setSnakeHeight(4);
    }

    // collision between poophouse and snake
    if (isSnakeFat && snakePositionY >= 500 && snakePositionX <= 60) {
      setPooped(true);
      setSnakeWidth(8);
      console.log("jag sket");
    }

    // emtying snake
    if (pooped & (snakeWidth < 10)) {
      setIsSnakeFat(false);
    }
    // Collision
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

    // adds new apple
    renderAnotherApple();

    console.log(snakePositionX + "X");
    console.log(snakePositionY + "y");
  }, [
    snakePositionX,
    snakePositionY,
    applePositionX,
    applePositionY,
    isSnakeFat,
    pooped,
    snakeWidth,
  ]);

  let poopHouseX = "0";
  let poopHouseY = "0";

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
              <img alt="poophouse" src={poopHouse}></img>
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
            <img alt="apple" src={apple}></img>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
