import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Voting = (props) => {
  const [voteList, setVoteList] = useState([]);
  const [hideReveal, setHideReveal] = useState("Reveal");
  const [roundNum, setRoundNum] = useState(1);

  useEffect(() => {
    let randomNames = [];
    let indexTrack = [];
    const tempNameList = [...props.nameList];
    let i = 0;
    let index = Math.floor(Math.random() * props.nameList.length);
    while (i < props.nameList.length) {
      if (indexTrack.indexOf(index) >= 0) {
        index = Math.floor(Math.random() * props.nameList.length);
      } else {
        randomNames.push(tempNameList[index]);
        i += 1;
        indexTrack.push(index);
      }
    }
    props.nameListHandler(randomNames);
  }, []);

  function voteSelection(e) {
    if (e.target.classList.contains("voteItem")) {
      e.target.classList.remove("voteItem");
    } else {
      e.target.classList.add("voteItem");
    }
  }

  function voteSubmission() {
    let tempVoteList = [...voteList];
    const voteNodeList = document.querySelectorAll(".voteItem");
    voteNodeList.forEach((elem) => {
      if (tempVoteList.indexOf(elem.innerHTML) >= 0) {
        elem.classList.remove("voteItem");
      } else {
        tempVoteList.push(elem.innerHTML);
        elem.classList.remove("voteItem");
      }
    });
    setVoteList(tempVoteList);
  }

  function voteReveal() {
    const nameList = document.querySelector(".nameList");
    const voteList = document.querySelector(".voteList");
    const lockVoteButton = document.querySelector(".lockVotesButton");
    if (voteList.classList.contains("invis")) {
      nameList.classList.add("invis");
      voteList.classList.remove("invis");
      lockVoteButton.classList.remove("hidden");
      setHideReveal("Hide");
    } else {
      nameList.classList.remove("invis");
      voteList.classList.add("invis");
      lockVoteButton.classList.add("hidden");
      setHideReveal("Reveal");
    }
  }

  function lockVotes() {
    props.nameListHandler(voteList);
    setVoteList([]);
    voteReveal();
    setRoundNum(roundNum + 1);
  }

  return (
    <div>
      <div className="votingHeader">Voting Time <br/>Round {roundNum}</div>
      <div className="main">
        <div className="nameList">
          {props.nameList.map((item) => {
            return (
              <div className="nameItem" onClick={voteSelection}>
                {item}
              </div>
            );
          })}
        </div>
        <div className="voteList invis">
          {voteList.map((item) => {
            return <div className="nameItem">{item}</div>;
          })}
        </div>
        <br />
        <button onClick={voteSubmission} id="voteSubmitButton">
          Submit Votes
        </button>
        <button onClick={voteReveal} id="voteRevealButton">
          {hideReveal} Votes
        </button>
        <br />
        <br />
        <button onClick={lockVotes} className="lockVotesButton hidden">
          Lock Votes
        </button>
        <br />
        <br />
        <button id="homeButton">
          <Link id="homeLink" to="/puppy-name-picker">
            Home
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Voting;
