import { db, auth } from '../../services/firebase.js'


function Lobby(props) {
  console.log("Lobby: ", props);

  const handleSubmit = (e) => {
    e.preventDefault()

   // create player id for anonymous player 
   // pass the player id back to parent component(Game) <- how do we do this for the main player?
   const position = (props.players.length).toString()

   //  set the players position as 'player' prop in the game obj
   props.setPlayer(position)

   const pid = localStorage.getItem("uid")
   const uName = e.target[0].value
   const gc = props.gameId

   let isHostValue = false
   let isreadyValue = true
   let isArbitratorValue = false

   // if first player make then the host
   if (position === '0') {
      isHostValue = true
      isreadyValue = false
      isArbitratorValue = true
   }

   db.collection("games").doc(gc).collection('players').doc(position).set({
      name: uName, 
      score: 0, 
      isArbitrator: isArbitratorValue, 
      ready: isreadyValue, 
      isHost: isHostValue, 
      id:pid}
   )

    // handleSubmitOrTimeout()

   }

   return (
// ‼
// we need to set props.setPlayer(); in the game component to the player position for the game to work
// we need to do this for both the logged in and anon players
// right now i've disabled sign up to get it working for testing and am creating users here to solve this bug

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
