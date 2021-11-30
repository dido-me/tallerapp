import "./admin.css"
import { useState, useEffect } from "react"

import Sidebar from "./sidebar/Sidebar"
import Navbar from "./navbar/Navbar"

import { auth } from "../../firebase"
import { onAuthStateChanged } from "firebase/auth"

import Scroll from "./scroll/Scroll"
import HomePage from "./pages/HomePage"
import Profile from "./pages/Profile"
import RegistroPage from "./pages/RegistroPage/RegistroPage"
import Loading from "../Loading/Loading"
import { PrivateRouteAdmin } from "../../PrivateRoutes/PrivateRouteAdmin"
import { Switch, Route, Redirect } from "react-router-dom"
import ListProductos from "./pages/listProductos/ListProductos"
import { useSelector } from "react-redux"

const index = () => {
  const [title, setTitle] = useState("")

  const [firebaseUser, setFirebaseUser] = useState(false)
  const usuario = useSelector((store) => store.usuario.user)

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
    return () => {
      setFirebaseUser(null)
    }
  }, [])

  return firebaseUser !== false ? (
    <>
      <div className="d-flex" id="wrapper">
        <Sidebar />
        <div id="page-content-wrapper">
          <Navbar title={title} usuario={usuario} />

          <div className="container-fluid px-4">
            <Switch>
              <PrivateRouteAdmin
                exact
                path="/admin"
                firebaseUser={firebaseUser}
              >
                <HomePage setTitle={setTitle} />
              </PrivateRouteAdmin>
              <PrivateRouteAdmin
                exact
                path="/admin/profile"
                firebaseUser={firebaseUser}
              >
                <Profile setTitle={setTitle} usuario={usuario} />
              </PrivateRouteAdmin>
              <PrivateRouteAdmin
                exact
                path="/admin/registroProducto"
                firebaseUser={firebaseUser}
              >
                <RegistroPage setTitle={setTitle} />
              </PrivateRouteAdmin>
              <PrivateRouteAdmin
                exact
                path="/admin/listRegistro"
                firebaseUser={firebaseUser}
              >
                <ListProductos setTitle={setTitle} />
              </PrivateRouteAdmin>
              <Route path="*">
                <Redirect to="/404" />
              </Route>
            </Switch>
            <Scroll />
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  )
}

export default index
