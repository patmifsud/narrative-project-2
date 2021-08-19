import React from 'react'
import { auth } from '../services/firebase.js'

function Signout() {

    const handleClick = () => {
      auth.signOut()
      // remove all app artifacts from localstorage
      window.localStorage.clear()
      console.log('oAuth: Signed Out');
    }

    return (
        <div>
          <button onClick={ handleClick }>Sign Out</button>
        </div>
    )
}

export default Signout
