import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAM5mqVKTy3X3ilphVDx9zoNW3sYXj6uaA",
  authDomain: "tallerapp-f608b.firebaseapp.com",
  projectId: "tallerapp-f608b",
  storageBucket: "tallerapp-f608b.appspot.com",
  messagingSenderId: "877109858071",
  appId: "1:877109858071:web:2283c959ecbd38692db152",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { app, db, auth, storage }
