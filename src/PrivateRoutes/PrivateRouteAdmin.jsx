import { Route, Redirect } from "react-router-dom"

export const PrivateRouteAdmin = ({
  component,
  path,
  firebaseUser,
  exact,
  ...rest
}) => {
  if (localStorage.getItem("usuario")) {
    const usuarioStorage = JSON.parse(localStorage.getItem("usuario"))
    if (usuarioStorage.uid === firebaseUser.uid) {
      return <Route component={component} path={path} {...rest} />
    } else {
      return <Redirect to="/login" {...rest} />
    }
  } else {
    return <Redirect to="/login" {...rest} />
  }
}
