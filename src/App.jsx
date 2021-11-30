import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { useState, useEffect } from "react"
import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"
import Admin from "./components/Admin"
import Public from "./components/public"
import NotFound from "./components/NotFound"
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"

import PrivateRoutePublic from "./PrivateRoutes/PrivateRoutePublic"
import { PrivateRouteAdmin } from "./PrivateRoutes/PrivateRouteAdmin"

const App = () => {
  const [firebaseUser, setFirebaseUser] = useState(false)

  useEffect(() => {
    const fetchUser = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFirebaseUser(user)
        } else {
          setFirebaseUser(null)
        }
      })
    }

    fetchUser()
  }, [])

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouteAdmin path="/admin" firebaseUser={firebaseUser}>
            <Admin />
          </PrivateRouteAdmin>
          <Route component={Public} path="/public" />
          <PrivateRoutePublic exact path="/login" firebaseUser={firebaseUser}>
            <Login firebaseUser={firebaseUser} />
          </PrivateRoutePublic>
          <PrivateRoutePublic exact path="/signup" firebaseUser={firebaseUser}>
            <Signup firebaseUser={firebaseUser} />
          </PrivateRoutePublic>
          <Route exact component={NotFound} path="/404" />
          <Route exact path="/">
            <Redirect to="/public" />
          </Route>
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
