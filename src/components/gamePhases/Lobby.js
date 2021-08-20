import { db, auth } from '../../services/firebase.js'
import React, { useEffect } from "react"


function Lobby(props) {
  console.log("Lobby: ", props);

  const handleSubmit = (e) => {
    e.preventDefault()

   // create player id for anonymous player 
   // pass the player id back to parent component(Game) <- how do we do this for the main player?
   const position = props.players.length

   props.setPlayer(position)

   // checking if the player isn't a host
   if (position > 0) {
      //  set the players position as 'player' prop in the game obj
      console.log('creating user ' + position)

      const pid = localStorage.getItem("uid")
      const uName = e.target[0].value
      const gc = props.gameId

      db.collection("games").doc(gc).collection('players').doc(position.toString()).set({
         name: uName, 
         score: 0, 
         isArbitrator: false, 
         position: position,
         ready: true, 
         isHost: false, 
         id:pid}
      )

    // handleSubmitOrTimeout()
      }
   }

   useEffect(() => {
      if (props.players.length === 0) {
         props.setPlayer('0')
      }
    }, [])


   return (
      <div className="lobby phase">
         <div className="inner">
          <h4>Lobby</h4>
          <p>Players:</p>
         {/* props.players[props.player] */}
         {/* name: "Theo", score: 0, isArbitrator: false, ready: false, isHost: true, id:0 */}
          <ul>
          { props.players.map( (playerData) =>
             <li key={playerData.id}> {playerData.name} </li>
         )}
         </ul>
         <form onSubmit={handleSubmit} >
            <label>Player Name:</label>
            <input type="text" name="name"/>
            <button>Join Game</button>
         </form>
        </div>
      </div>
      );
    }

export default Lobby;
