import React, { useState} from 'react';
// import Sentence from '..../helpers/globals.js';
import {Story, SentenceInputForm} from '../ui/gameUi'; 
import {PhaseBanner} from '../ui/gameUi'; 


function WriteSentence(props) {
  const [localSentence, setLocalSentence] = useState('')

  function handleTextEntry(text){
    setLocalSentence(text)
  }


  // send submition from child SentenceInputForm to 'Sentences' in db
  function handleSubmit(){
  console.log(props.player);
    props.dbAddSentance({

      'text': localSentence, 
      'position': props.position, 
      'username': props.player.name,
    })
    props.handleSubmitOrTimeout();
  };

  let playerReady = ''

  function phaseBannerHeader(){
    if (!props.player) return
    if (props.player.ready){
      playerReady = 'ready'
      return (
        <PhaseBanner 
        emoji={'⌛️'} 
        text={"Waiting for the other players to finish. Feel free to edit your answer in the meantime"}/> 
      )}
    playerReady = ''
    return (
      <PhaseBanner 
        emoji={'✏️'} 
        text={"What happens next in the story? Write your idea below:"}/> 
    );
  }
  
  return (
    <div className={`writeSentence phase ${playerReady}`}>
      
        {phaseBannerHeader()}

        <div className="inner">
        <Story story={props.story}/>
        <SentenceInputForm 
          onChange={handleTextEntry}
          onSubmit={handleSubmit}
          />
      </div>
    </div>
    );
  }

export default WriteSentence;