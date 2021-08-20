// import React, { useState, useEffect } from 'react';
import {PhaseBanner} from '../ui/gameUi'; 

function VoteSentence(props) {
  
  function handleClick(data) {
    props.dbSetWinningSentence(data)
    props.handleSubmitOrTimeout()
  }

   return (

    
      <div className="voteSentence phase">
        <PhaseBanner emoji={'🗳'} text={"Which sentence should be added to the story? Vote for your favorite."}/>

        <div className="contianer">
          <div className="inner">
            <h4>Showing: VoteSentence</h4>
            { props.sentences.map( (sentence) =>  
              <button onClick={() => {handleClick(sentence)}} > {sentence.text} </button>
          )}
         </div>
        </div>
      </div>
      );
    }

export default VoteSentence;