import React, { useState } from "react";
import pawPrint from "./paw-print.png";

const App = () => {
  const [nameList, setNameList] = useState([]);
  const [hideReveal, setHideReveal] = useState("Reveal");

  const submitName = (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("nameInput");
    const tempNameList = [...nameList];
    setNameList(tempNameList.concat(nameInput.value));
    nameInput.value = "";
  };

  const onEnter = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      submitName(e);
    }
  };

  const revealList = () => {
    randomizeNames();
    const nameList = document.querySelector(".nameList");
    if (nameList.classList.contains("invis")) {
      nameList.classList.remove("invis");
      setHideReveal("Hide");
    } else {
      nameList.classList.add("invis");
      setHideReveal("Reveal");
    }
  };

  const randomizeNames = () => {
    let randomNames = [];
    let indexTrack = [];
    const tempNameList = [...nameList];
    let i = 0;
    let index = Math.floor(Math.random() * nameList.length);
    while (i < nameList.length) {
      if (indexTrack.indexOf(index) >= 0) {
        index = Math.floor(Math.random() * nameList.length);
      } else {
        randomNames.push(tempNameList[index]);
        i += 1;
        indexTrack.push(index);
      }
    }
    setNameList(randomNames);
  };

  return (
    <div>
      <div className="header">
        <form>
          <input type="text" id="nameInput" placeholder="Enter Name"/>
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
        <div className="listText">Names entered: {nameList.length}</div>
        <br/>
        <div className="nameList invis">
          {nameList.map((item) => {
            return <li>{item}</li>;
          })}
        </div>
        <br/>
        <button onClick={revealList} id="revealButton">{hideReveal}</button>
      </div>
    </div>
  );
};

export default App;
