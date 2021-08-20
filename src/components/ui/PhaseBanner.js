// import React, { useState} from 'react';
// import {Story, SentenceInputForm} from '../ui/gameUi'; 

function PhaseBanner(props) {
  
   return (
      <div className="phaseBanner container">
         <div className="inner">
            <div className="emoji">{props.emoji}</div> <p>{props.text}</p>
         </div>
      </div>
      );
    }

export default PhaseBanner;