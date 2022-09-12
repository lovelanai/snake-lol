import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="gameContainer">
      <h1>Jånas the snake</h1>
      <div className="gameContent">
        <div className="snakeArea">
          <div className="jonerbroner">
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
    </div>
  );
}

export default App;
