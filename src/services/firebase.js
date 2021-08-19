import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAiCtqO51t7aHNQnuyjDCpkmE5ZQzBGXnY",
  authDomain: "narrative-project-ga.firebaseapp.com",
  projectId: "narrative-project-ga",
  storageBucket: "narrative-project-ga.appspot.com",
  messagingSenderId: "65713869023",
  appId: "1:65713869023:web:bb8260cfe93a2f5a48996a"
})


const auth = firebaseApp.auth()
const db   = firebaseApp.firestore()

export {db , auth}
