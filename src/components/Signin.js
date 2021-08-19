import React from 'react'
import firebase from 'firebase'
import { auth } from '../services/firebase.js'


function Signin () {
  function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
    )
}

export default Signin
