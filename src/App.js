import React from "react";
import { Link } from "react-router-dom";
import pawPrint from "./paw-print.png";

const App = (props) => {
  // const [hideReveal, setHideReveal] = useState("Reveal");

  const submitName = (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("nameInput");
    const tempNameList = [...props.nameList];
    if (tempNameList.indexOf(nameInput.value) >= 0) {
      alert("You've entered a duplicate!");
    } else {
      props.nameListHandler(tempNameList.concat(nameInput.value));
    }
    nameInput.value = "";
  };

  const onEnter = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      submitName(e);
    }
  };

  // const revealList = () => {
  //   randomizeNames();
  //   const nameList = document.querySelector(".nameList");
  //   if (nameList.classList.contains("invis")) {
  //     nameList.classList.remove("invis");
  //     setHideReveal("Hide");
  //   } else {
  //     nameList.classList.add("invis");
  //     setHideReveal("Reveal");
  //   }
  // };

  return (
    <div>
      <div className="header">
        <form>
          <input type="text" id="nameInput" placeholder="Enter Name" />
          <button
            className="pawButton"
            onClick={submitName}
            onKeyPress={onEnter}
          >
            <img src={pawPrint} alt="Paw print" />
          </button>
        </form>
      </div>
      <div className="main">
        <div className="listText">Names entered: {props.nameList.length}</div>
        <br />
        <div className="nameList invis">
          {props.nameList.map((item) => {
            return <div className="nameItem">{item}</div>;
          })}
        </div>
        <br />
        {/* <button onClick={revealList} id="revealButton">
          {hideReveal}
        </button> */}
        <button id="votingButton">
          <Link id="votingLink" to="/puppy-name-picker/Voting">Voting</Link>
        </button>
      </div>
    </div>
  );
};

export default App;
