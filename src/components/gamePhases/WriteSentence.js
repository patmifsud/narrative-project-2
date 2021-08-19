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

    props.dbAddSentance({
      'text': localSentence, 
      'postition': props.postition, 
      'username': props.player.name,
    })
    props.handleSubmitOrTimeout();
  };
  
  return (
    <div className="writeSentence phase">
      <PhaseBanner />
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