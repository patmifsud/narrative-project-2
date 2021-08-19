import { useHistory } from "react-router-dom";
import firebase from 'firebase'

import { db, auth } from '../services/firebase.js'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useState, useEffect} from 'react'


import Signin from './Signin'
import Signout from './Signout'


function Home() {
   const history = useHistory()
   const [user] = useAuthState(auth)

   const [userId, setUserId] = useState('')
   const [userPhoto, setUserPhoto] = useState('')
   const [userName, setUserName] = useState('')

   useEffect(() => {
     const u = localStorage.getItem("uid")
     const p = localStorage.getItem("photo")
     const n = localStorage.getItem("name")
     setUserId(u)
     setUserPhoto(p)
     setUserName(n)
   }, [])

   useEffect(() => {
     // console.log(user);
     if (user) {
        const { uid , photoURL , displayName } = user //auth.currentUser
        setUserId(uid)
        setUserPhoto(photoURL)
        setUserName(displayName)
        localStorage.setItem("uid", uid)
        localStorage.setItem("photo", photoURL)
        localStorage.setItem("name", displayName)
     }
   }, [user])

   function _startButtonHandler(){
      // show loading icon on start button

      // check if the user is logged in
         // if not signInWithGoogle()

      // if they are logged in,

         let gameCode= generateGameCode()
         createGame(gameCode)
      // try to create a game in db with id of 'gameCode'
      // if db returns success, do the following:
      //if not, error message
   }

   function generateGameCode() {
      return Math.random().toString(36).substr(2, 5);
   }

   async function createGame(gc) {
    // 5 digits. todo: duplicate testing/ prevention
    // const gc =  generateGameCode()
    // console.log('Game Code:', gc);

      await db.collection("games").doc(gc).set({
         // players: [{uid:1 ,  }],
         // sentences: [{ text: "Pizza", uid: 1, round: 1 }],
         // story: [{ text: "1st Text", uid: 1, round: 1 }],
         roundCounter: 1,
         phase: 'Lobby',
         createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      //SEED DATA
      // later i think we can remove the .doc onwards to just create the collections
      // adding a story collection
      // await db.collection("games").doc(gc).collection('story').doc('0').set({
      //    text: "Once apon a time:", uid: 1, username: "frank", round: 1
      // })
      // await db.collection("games").doc(gc).collection('sentences').doc('0').set({
      //    text: "Once apon a time:", uid: 1, username: "frank", round: 1
      // })
      // Add Game Creator as 0 player in the game
      // await db.collection("games").doc(gc).collection('players').doc('0').set({
      //    name: userName, score: 0, isArbitrator: false, ready: false, isHost: true, id:userId, position:0})

      history.push(`/play/${gc}`);

   }

  return (
    <div className="phase container">
      <div className="inner">
         <div className="marginMe"></div>
        <>

         { user ?
            <><img src={userPhoto} alt="avatar"/><button onClick={_startButtonHandler}> Create a game </button><Signout /></>
            : <Signin />
          }

        </>

      </div>
    </div>
  );
}

export default Home;
