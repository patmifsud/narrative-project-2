import React, { useState, useEffect } from "react"
import { useLocation } from "react-router"
import { v4 as uuidv4 } from 'uuid'

import { db, auth } from "../services/firebase.js"
import {useAuthState} from "react-firebase-hooks/auth"
import { rules } from "../helpers/rules.js";
import {
  Loading,
  Intro,
  Lobby,
  WriteSentence,
  VoteSentence,
  RevealSentence,
  RevealScore,
  RevealFinalScore,
} from "./gamePhases/allPhases";

import { Bar } from "./ui/gameUi";
// const postition = Math.random().toString(36).substr(2, 5);
function Game() {
  const gameId = useLocation().pathname.split("/").pop();
  const [user] = useAuthState(auth)

  //--------------------------
  // STATES
  const [phase, setPhase] = useState("Loading");
  const [isArbitrator, setIsArbitrator] = useState("Loading");
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState('')
  const [sentences, setSentences] = useState([]);
  const [story, setStory] = useState([]);
  const [winningSentence, setWinningSentence] = useState([]);
  const [roundCounter, setRoundCounter] = useState(1);
  //--------------------------
  // PHASES
  // list of game phases and game phase components
  const phaseTable = {
    Loading:
    { component: <Loading />, next: "Lobby" },

    Lobby: {
      component: (
        <Lobby
         players={players}
         position={player}
         gameId={gameId}
         setPlayer={setPlayer}
         onCompletion={handleSubmitOrTimeout}
        />
      ),
      next: "Intro",
    },

    Intro: {
      component: <Intro
         handleSubmitOrTimeout={handleSubmitOrTimeout}
         setReadyAfter={setReadyAfter}
      />,
      next: "WriteSentence",
    },

    WriteSentence: {
      component: (
        <WriteSentence
         player={players[player]}
         story={story}
         setReadyAfter={setReadyAfter}
         dbAddSentance={dbAddSentance}
         handleSubmitOrTimeout={handleSubmitOrTimeout}
        />
      ),
      next: "VoteSentence",
    },
    VoteSentence: {
      component: (
        <VoteSentence
          story={story}
          sentences={sentences}
          setReadyAfter={setReadyAfter}
          dbSetWinningSentence={dbSetWinningSentence}
          handleSubmitOrTimeout={handleSubmitOrTimeout}
        />
      ),
      next: "RevealSentence",
    },
    RevealSentence: {
      component: (
        <RevealSentence
         winningSentence={winningSentence}
         sentences={sentences}
         setReadyAfter={setReadyAfter}
         handleSubmitOrTimeout={handleSubmitOrTimeout}
        />
      ),
      next: "RevealScore",
    },
    RevealScore: {
      component: (
        <RevealScore
          story={story}
          players={players}
          player={players[player]}
          winningSentence={winningSentence}
          roundCounter={roundCounter}
          setReadyAfter={setReadyAfter}
          dbCyclePlayerRoles={dbCyclePlayerRoles}
          dbSetRoundCounterTo={dbSetRoundCounterTo}
          dbSetWinningSentence={dbSetWinningSentence}
          dbAddStory={dbAddStory}
          clearSentences={dbClearSentances}
          handleSubmitOrTimeout={handleSubmitOrTimeout}
        />
      ),
      next: "WriteSentence",
    }, // <- loops
    RevealFinalScore: {
      component: <RevealFinalScore
         setReadyAfter={setReadyAfter}
         onCompletion={handleSubmitOrTimeout} />,
      next: "Lobby",
    },
  };

  function createPlayerId() {
     const uuid =  uuidv4()
     console.log("UUID: ",uuid);
     return uuid
   }

   // if user is not anoymous get auth.uid otherwie generate a uuid
   useEffect(() => {
     console.log('Game LS UID: ',localStorage.getItem("uid"))
     let pid = ''
    if(localStorage.getItem("uid") === null){
      pid = createPlayerId()
        console.log('Game LS UID: ',pid)
     setPlayer(pid)
     localStorage.setItem("uid", pid)
   } else setPlayer(localStorage.getItem("uid"))
    // console.log('onCompMount: ',uid);
   }, [])
   
  //--------------------------
  // 🔥 FIREBASE GET - AUTO UPDATE COMPONENT STATES when db changes:
  useEffect(() => {
    
    // 📅 🔥 update 'phase' in game state when 'phase' changes in db
    db.collection("games")
      .doc(gameId)
      .onSnapshot((snapshot) => {
        setPhase(snapshot.data().phase);
        setIsArbitrator(snapshot.data().isArbitrator);
        setWinningSentence(snapshot.data().winningSentence);
      });
    
    // 📖 🔥 update 'story' in game state when 'story' changes in db
    db.collection("games")
      .doc(gameId)
      .collection("story")
      .onSnapshot(function (querySnapshot) {
        let allStories = [];
        //Get stories from Firebase
        if (querySnapshot.docs.length > 0) {
          querySnapshot.docs.forEach((doc) => {
            allStories.push(doc.data());
          });
          //Set stories from fb as current state
          setStory(allStories);
        }
      });

    // 📖 🔥 update 'sentence' in game state when 'story' changes in db
    db.collection("games")
      .doc(gameId)
      .collection("sentences")
      .onSnapshot(function (querySnapshot) {
        let allSentences = [];
        //Get sentences from Firebase
        if (querySnapshot.docs.length > 0) {
          querySnapshot.docs.forEach((doc) => {
            allSentences.push(doc.data());
          });
          //Set sentences from fb as current state
          setSentences(allSentences);
        }
      });

    // 👤 🔥 update 'player' data in game state when 'player' changes in db
    db.collection("games")
      .doc(gameId)
      .collection("players")
      .onSnapshot(function (querySnapshot) {
        let allPlayers = [];
        //Get players from Firebase
        if (querySnapshot.docs.length > 0) {
          querySnapshot.docs.forEach((doc) => {
            allPlayers.push(doc.data());
          });
          //Set players from fb as current state
          setPlayers(allPlayers);
        } else console.log("no players yet");
      });
  }, [gameId]);

  //--------------------------
  // 🔥 FIREBASE POST FUNCTIONS
  const dbCollectionGame = db.collection("games").doc(gameId);
  const dbCollectionPlayers = db.collection("games").doc(gameId).collection("players");

  function dbSetThisPlayerReadyTo(bool) {
    const postition = player.toString();
    dbCollectionPlayers.doc(postition).update({ ready: bool });
  }

  function dbSetAllPlayersReadyTo(bool) {
    for (let i = 0; i < players.length; i++) {
      dbCollectionPlayers.doc(player).update({ ready: bool });
    }
  }

  function dbSetPhaseTo(phaseParam) {
    dbCollectionGame.update({ phase: phaseParam });
  }

  function dbSetRoundCounterTo(roundNo=roundCounter) {
      dbCollectionGame.update({ roundCounter: roundNo });
  }

  function dbCyclePlayerRoles() {
    //will do later
  }

  function dbAddSentance(data) {
      // if (data.text == null){
      //    dbCollectionGame.collection("sentences").doc()
      //       .set({ text: "and then, out of nowhere, there was an error in the game 😔", postition: player, username: "Error" }
      //    );
      // } else {
         console.log("GAME: about to add a SENTENCE during" + phase)
         console.log({text: data.text, postition: player, username: data.username});
         dbCollectionGame.collection("sentences").doc()
            .set({ text: data.text, postition: player, username: data.username }
         );
    }

  function dbAddStory(data) {
      // if (data.text == null){
      //    dbCollectionGame.collection("story").doc()
      //       .set({ text: "and then, out of nowhere, there was an error in the game 😔", postition: player, username: "Error" });
      // } else {
         console.log("GAME: about to add a STORY during" + phase)
         console.log({text: data.text, postition: player, username: data.username})
         console.log(" ")
         dbCollectionGame.collection("story").doc()
            .set({ text: data.text, postition: player, username: data.username });
      }

  function dbClearSentances() {
      dbCollectionGame.collection("sentences")
         .get()
         .then(res => {
            res.forEach(element => {
               element.ref.delete();
            });
         });
  }

  function dbSetWinningSentence(sentenceParam=' ') {
    dbCollectionGame.update({ winningSentence: sentenceParam });
  }

  // MOVE TO NEXT PHASE
  // when players state changes (pulled from db) check if all are ready.
  // If admin && if ready set db to next phase
  useEffect(() => {
    console.log('mvoe to next phase use effect is running')
    if (players.length > 0 && players[player]) {
      console.log('checking ' + player)
      if (players[player].isHost) {
        console.log('player ' + player + 'is a host')
        if (checkIfAllPlayersReady()) {
          hostNextGamePhase();
        }}}
  }, [players]);

  //--------------------------
  // FUNCTIONS: GAME PLAY
  function handleSubmitOrTimeout() {
    dbSetThisPlayerReadyTo(true);
  }

  function setReadyAfter(milliseconds='500') {
   setTimeout(function(){
      handleSubmitOrTimeout();
    }, milliseconds);
   }

  function checkIfAllPlayersReady() {
    for (let i = 0; i < players.length; i++) {
      if (players[i].ready !== true) return false;
    }
    return true;
  }

  function hostNextGamePhase() {
    console.log(
      "looks like everyones ready, so setting the game phase to:" +
        phaseTable[phase].next
    );
    dbSetAllPlayersReadyTo(false);
    if (phase === "RevealScore") {
      // get these two working with the DB
      dbSetRoundCounterTo(roundCounter + 1);
      dbCyclePlayerRoles();
      if (roundCounter >= rules.gameLength) {
        setPhase("RevealFinalScore");
        return;
      }
    }
    dbSetPhaseTo(phaseTable[phase].next);
  }

  return (
    <div className="game">
      {phaseTable[phase].component}
      <Bar />
​
      {/* Test pannel. TODO - environment var in netlify - show only on local */}
      <div className="container">
        <div className="inner">
          <h5>TEST PANNEL</h5>
          <br />
          <p> <b>Game id</b> is {gameId}</p>
          <p> <b>Player position</b> is {player}</p>
          <p> <b>Current phase:</b> {phase}</p>
          <p> <b>Current phase:</b> {phase}</p>

          <p> <b>Round:</b> {roundCounter} / {rules.gameLength}{" "} </p>
          <br />
          <div>
            <button
              className="medium"
              onClick={() => {
                dbSetAllPlayersReadyTo(true);
              }}
            >
              {" "}
              Set all players to ready{" "}
            </button>{" "}
            &nbsp;
            <button
              className="medium"
              onClick={() => {
                handleSubmitOrTimeout();
              }}
            >
              {" "}
              Set me to ready{" "}
            </button>
          </div>
​
          <div>
            <button
              className="medium"
              onClick={() => {
                db.collection("games")
                  .doc(gameId)
                  .collection("players")
                  .doc("1")
                  .set({
                    name: "Joe",
                    score: 0,
                    isArbitrator: false,
                    ready: false,
                    isHost: false,
                    postition: 1,
                  });
              }}
            >
              Add/ reset player 2
            </button>{" "}
            &nbsp;
            <button
              className="medium"
              onClick={() => {
                db.collection("games")
                  .doc(gameId)
                  .collection("players")
                  .doc("2")
                  .set({
                    name: "Mark",
                    score: 0,
                    isArbitrator: false,
                    ready: false,
                    isHost: false,
                    postition: 2,
                  });
              }}
            >
              Add/ reset player 3
            </button>
          </div>
          {/* <p>Current player ready: { playerIsReady ? "✅" : "❌"}</p>
               <p>All players ready: { testAllPlayersReady ? "✅" : "❌" }</p> */}
        </div>
      </div>
    </div>
  );
}

export default Game;