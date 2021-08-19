import React, { useEffect } from 'react';

function Intro(props) {
  useEffect(() => {
    props.setReadyAfter(3000)
  }, []);

   return (
      <div className="intro phase">
        <div className="container largeCenteredText">
         <div className="inner">
            <h1>Welcome to StoryStack</h1>
          </div>
        </div>
      </div>
      );
    }

export default Intro;