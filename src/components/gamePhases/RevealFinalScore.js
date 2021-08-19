import React, { useEffect } from 'react';
function RevealFinalScore(props) {

  useEffect(() => {
    props.setReadyAfter(3000)
  }, []);

   return (
     
      <div className="revealFinalScore phase">
         <div className="inner">
          <h4>RevealFinalScore</h4>
        </div>
      </div>
      );
    }

export default RevealFinalScore;