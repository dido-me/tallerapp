import { Route, Redirect } from "react-router-dom"

const PrivateRoutePublic = ({ component, path, firebaseUser, ...rest }) => {
  if (localStorage.getItem("usuario")) {
    const usuarioStorage = JSON.parse(localStorage.getItem("usuario"))
    if (usuarioStorage.uid === firebaseUser.uid) {
      return <Redirect to="/admin" {...rest} />
    } else {
      return <Route component={component} path={path} {...rest} />
    }
  } else {
    return <Route component={component} path={path} {...rest} />
  }
}

export default PrivateRoutePublic
