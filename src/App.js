import { useEffect, useRef, useState } from "react";
import "./App.css";
import "./Canvas.css";
import apple from "./assets/pngegg.png";
import poopHouse from "./assets/poophouse.png";
import pixelapple from "./assets/pixelapple.png";
import Canvas from "./Canvas";
import crown from "./assets/crown.png";
import joint from "./assets/joint.gif";

function App() {
  const [snakePositionY, setSnakePositionY] = useState(0);
  const [snakePositionX, setSnakePositionX] = useState(0);
  const [snakeRotation, setSnakeRotation] = useState(0);
  const [snakeWidth, setSnakeWidth] = useState(8);
  const [snakeHeight, setSnakeHeight] = useState(2);
  const [appleHit, setAppleHit] = useState(false);
  const [applePositionX, setApplePositionX] = useState(400);
  const [applePositionY, setApplePositionY] = useState(400);
  const [isSnakeFat, setIsSnakeFat] = useState(false);
  const [faceColor, setFaceColor] = useState("rgb(155, 10, 168)");
  const [bodyColor, setBodyColor] = useState("rgb(155, 10, 168)");
  const [pooped, setPooped] = useState(false);
  const [toiletRotation, setToiletRotation] = useState(0);
  const [die, setDie] = useState(false);
  const [count, setCount] = useState(0);
  const [poopHouseX, setPoopHouseX] = useState(0);
  const [snakeWin, setSnakeWin] = useState(false);
  // new game
  const newGame = () => {
    window.location.reload();
  };

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
    if (event.keyCode === 13) {
      newGame();
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
    if (snakeWidth > 14) {
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

    // emptying snake
    if (pooped & (snakeWidth < 10)) {
      setIsSnakeFat(false);
    }
    if (pooped & (snakeWidth < 10) & (count > 9)) {
      setBodyColor("linear-gradient(rgb(137 40 3), rgb(114 85 23))");
      setFaceColor("linear-gradient(rgb(137 40 3), rgb(114 85 23)");
    }
    if (pooped & (snakeWidth < 10) & (count > 19)) {
      setBodyColor("linear-gradient(#70706F, #BEC0C2)");
      setFaceColor("linear-gradient(#70706F, #BEC0C2)");
    }
    if (pooped & (snakeWidth < 10) & (count > 29)) {
      setBodyColor("linear-gradient(#A57C01, #EDCB01, #DBB701)");
      setFaceColor("linear-gradient(#A57C01, #EDCB01, #DBB701)");
    }

    // Collision
    if (
      (snakePositionX >= applePositionX - 30) &
      (snakePositionX <= applePositionX + 30) &
      (snakePositionY >= applePositionY - 30) &
      (snakePositionY <= applePositionY + 30)
    ) {
      setSnakeWidth(snakeWidth + 3);
      setAppleHit(true);
      setCount(count + 1);

      let resultX = parseInt(Math.random() * 30) * 20;
      let resultY = parseInt(Math.random() * 30) * 20;

      setApplePositionX(resultX);
      setApplePositionY(resultY);
    }

    // snake dies
    if (isSnakeFat & (snakeWidth > 18)) {
      setDie(true);
    }

    //if snake is dead
    if (die) {
      setPoopHouseX(snakePositionX + -80);
      setToiletRotation(180);
      setSnakePositionY(200);
      setSnakeRotation(180);

      document.getElementById("toilet").classList.add("shaketoilet");
    }

    if ((count > 9) & !isSnakeFat) {
      setBodyColor("linear-gradient(rgb(137 40 3), rgb(114 85 23))");
      setFaceColor("linear-gradient(rgb(137 40 3), rgb(114 85 23)");
    }

    if ((count > 19) & !isSnakeFat) {
      setBodyColor("linear-gradient(#70706F, #BEC0C2)");
      setFaceColor("linear-gradient(#70706F, #BEC0C2)");
    }

    if ((count > 1) & !isSnakeFat) {
      setBodyColor("linear-gradient(#A57C01, #EDCB01, #DBB701)");
      setFaceColor("linear-gradient(#A57C01, #EDCB01, #DBB701)");
      setSnakeWin(true);
    }

    // adds new apple
    renderAnotherApple();
  }, [
    snakePositionX,
    snakePositionY,
    applePositionX,
    applePositionY,
    isSnakeFat,
    pooped,
    snakeWidth,
    die,
    count,
  ]);

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
        <div className="counter">
          <h1>{count}</h1>
          <div style={{ height: "2rem" }}>
            <img
              style={{ height: "100%" }}
              alt="pixelapple"
              src={pixelapple}
            ></img>
          </div>
        </div>
        {die ? (
          <>
            <div onKeyDown={newGame} className="dead">
              <h1>GAME OVER</h1>
              <p>SNAKE DEAD!</p>
              <button onClick={newGame}>NEW GAME</button>
              <p style={{ fontSize: ".5rem" }}>press enter</p>
            </div>
          </>
        ) : (
          <></>
        )}
        {isSnakeFat ? (
          <>
            <div
              id="toilet"
              style={{
                top: `${poopHouseY}rem`,
                left: `${poopHouseX}px`,
                rotate: `${toiletRotation}deg`,
                zIndex: "10",
              }}
              className="poopHouse"
            >
              <img alt="poophouse" src={poopHouse}></img>
            </div>
          </>
        ) : (
          <></>
        )}

        {isSnakeFat & !die ? (
          <div className="full">
            <h1>SNAKE IS FULL</h1>
            <p>USE TOILET!</p>
          </div>
        ) : (
          <></>
        )}

        {die ? (
          <>
            <div
              className="cont"
              style={{
                left: `${snakePositionX - 60}px`,
                position: "absolute",
                width: "7rem",
                zIndex: "4",
              }}
            >
              <Canvas />
            </div>

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
                  className="jonerbronerdead"
                  ref={ref}
                  tabIndex={-1}
                  onKeyDown={handleKeyDown}
                  style={{ zIndex: "1" }}
                >
                  <div
                    style={{ zIndex: "1", background: "gray" }}
                    className="facedead"
                  >
                    {isSnakeFat ? <div className="svett"></div> : <></>}
                    <div className="eyes">
                      <div className="left-eyedead"></div>
                      <div className="right-eyedead"></div>
                    </div>
                    <div className="mundead"></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
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
                  {snakeWin ? (
                    <>
                      <div className="crown">
                        <img
                          style={{ height: "100%" }}
                          src={crown}
                          alt="crown"
                        ></img>
                      </div>
                      <div className="joint">
                        <img
                          style={{ height: "100%" }}
                          src={joint}
                          alt="joint"
                        ></img>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
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
        )}

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
