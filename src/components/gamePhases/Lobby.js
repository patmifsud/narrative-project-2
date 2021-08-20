import { db, auth } from '../../services/firebase.js'
import React, { useEffect } from "react"


function Lobby(props) {

  const handleSubmit = (e) => {
    e.preventDefault()
    const pid = localStorage.getItem("uid")

   // create player id for anonymous player
   // pass the player id back to parent component(Game) <- how do we do this for the main player?
   const position = props.players.length

   props.setPlayer((position).toString())

   // checking if the player isn't a host
   if (position > 0) {
      //  set the players position as 'player' prop in the game obj
      console.log('creating user ' + position)

      // const pid = localStorage.getItem("uid")
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
    }
   }

   useEffect(() => {
      if (props.players.length === 0) {
         props.setPlayer('0')
      }
    }, [])

    const isHost = () => {
      const pid = localStorage.getItem("uid")
      let isHost = false
      if (props.players.length === 0) return true

      props.players.forEach((o) => {
      if (o.id ===  pid){
          isHost = o.isHost
        }
      })
      return isHost
    }



    // anony user joned the game ?
    const hasJoined = () => {
      const pid = localStorage.getItem("uid")
      let joined = false;

      if (props.players.length > 1){
        props.players.forEach((o) => {
          if (o.id ===  pid){
              console.log('getPos :',o);
              joined = true
          }
        })
      }
      return joined
    }


    console.log(hasJoined())
   return (
      <div className="lobby phase">
         <div className="inner">
          <h2>Game: {props.gameId.toUpperCase()}</h2>
          <h4>Lobby</h4>
          <p>Players:</p>
         {/* props.players[props.player] */}
         {/* name: "Theo", score: 0, isArbitrator: false, ready: false, isHost: true, id:0 */}
          <ul>
          { props.players.map( (playerData) =>
             <li key={playerData.id}> {playerData.name} </li>
         )}
         </ul>
         {isHost() ?
           <button onClick={props.onCompletion}>Start Game</button>
          :
           <>
           { !(hasJoined()) ?
             <form onSubmit={handleSubmit} >
                  <label>Player Name:</label>
                  <input type="text" name="name"/>
                  <button>Join Game</button>
              </form>
              : <h4>Waiting for game to start</h4>
            }
            </>
          }
        </div>
      </div>
      );
    }

export default Lobby;