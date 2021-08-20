import React, { useEffect } from 'react';
// import { motion } from "framer-motion"
import {PhaseBanner} from '../ui/gameUi'; 

// story={story}
// players={players}
// player={players[player]}
// winningSentence={winningSentence}

// dbCyclePlayerRoles={dbCyclePlayerRoles}
// dbSetRoundCounterTo={dbSetRoundCounterTo}
// dbSetWinningSentence={dbSetWinningSentence}
// dbAddStory={dbAddStory}
// clearSentences={dbClearSentances}
// handleSubmitOrTimeout={handleSubmitOrTimeout}


function RevealScore(props) {
  // const player = props.players[props.player]
  useEffect(() => {
      props.setReadyAfter(4000)
  }, []);

  useEffect(() => {
    if (props.player === null){ console.log("it's null"); return }
    console.log(props.roundCounter)
    console.log(props.player.isHost)
    if (props.player.isHost){

      console.log('updating...')
          console.log(props.winningSentence)
          props.dbAddPointTo(props.winningSentence.position)
          props.dbAddStory(props.winningSentence)
          props.dbCyclePlayerRoles()
          props.dbSetRoundCounterTo()
          props.dbSetWinningSentence(' ')
          props.clearSentences(' ')
          // roundOfLastDbUpdate = props.roundCounter
    }
   }, []);

   return (
      <div className="revealScore phase">
         <div className="inner">
           <ul>
              { props.players.map( (playerData) =>  
                  <li key={playerData.id}> {playerData.name} : {playerData.score} pts </li>
              )}
         </ul>
        </div>
      </div>
      );
    }

export default RevealScore;