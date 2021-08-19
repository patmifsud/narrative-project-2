// import React, { useState, useEffect } from 'react';

function VoteSentence(props) {
  
  function handleClick(data) {
    props.dbSetWinningSentence(data)
    props.handleSubmitOrTimeout()
  }

   return (
      <div className="voteSentence phase">
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