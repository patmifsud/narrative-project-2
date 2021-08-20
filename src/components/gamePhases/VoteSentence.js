// import React, { useState, useEffect } from 'react';
import {PhaseBanner} from '../ui/gameUi'; 

function VoteSentence(props) {
  
  function handleClick(data) {
    props.dbSetWinningSentence(data)
    props.handleSubmitOrTimeout()
  }


  // function phaseBannerHeader(){
  //   if (!props.player) return
  //   if (props.player.ready){
  //     return (
  //       <PhaseBanner 
  //       emoji={'⌛️'} 
  //       text={"Waiting for the other players to finish. Feel free to edit your answer in the meantime"}/> 
  //     )}
  //   return (
  //     <PhaseBanner 
  //       emoji={'✏️'} 
  //       text={"What happens next in the story? Write your idea below:"}/> 
  //   );
  // }
   return (

    
      <div className="voteSentence phase">
        <PhaseBanner emoji={'✏️'} text={"What happens next in the story? Write your idea below:"}/> 
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