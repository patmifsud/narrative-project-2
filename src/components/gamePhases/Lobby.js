import { db, auth } from '../../services/firebase.js'


function Lobby(props) {

  // useEffect(() => {
      // if players.length is 0 then host = true
      // if (props.players.length === 1)
  // }, [])
  console.log("Lobby: ", props);

  const handleSubmit = (e) => {
    e.preventDefault()
    // create player id for anonymous player
    // pass the player id back to parent component(Game)
    const position = (props.players.length).toString()
    const pid = localStorage.getItem("uid")
    const uName = e.target[0].value
    const gc = props.gameId
    console.log('POSITION: ',position);
    // Add Game Creator as 0 player in the game
    db.collection("games").doc(gc).collection('players').doc(position).set({
       name: uName, score: 0, isArbitrator: false, ready: true, isHost: false, id:pid})

    // handleSubmitOrTimeout()

  }
  // add player to the players in current game
  // set state 'player' in game component to equal player:id

  // if player id is present hide form after joining

   return (

         //   useEffect(() => {
         // props.players[props.player]
         //     if (props.player.isHost) {
         //  }}, []);

         // Params
         // onCompletion={handleSubmitOrTimeout} players={players}  postition={player}

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
