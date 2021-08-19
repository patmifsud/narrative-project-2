import React, { useEffect } from 'react';
import { motion } from "framer-motion"
// import {PhaseBanner} from '../ui/gameUi'; 

function RevealSentence(props) {

useEffect(() => {
  props.setReadyAfter(3000)
}, []);

   return (
      <div className="revealSentence phase">
         <div className="inner">
          <h4>Showing: RevealSentence</h4>
          <p>Winning Sentence:</p>
          <motion.div animate={{ scale: [0.1, 1] }} transition={{ duration: 1 }}>
            <h1>{props.winningSentence.text} by {props.winningSentence.username}</h1>
          </motion.div>

        </div>
      </div>
      );
    }

export default RevealSentence;