import HomeSeacrh from "./search/Home"
import NavbarPublic from "./navbar/NavbarPublic"
import HomePublic from "./home/HomePublic"
import { Switch, Route, Redirect } from "react-router-dom"
import ListSearch from "./search/ListSearch"
import ProductoState from "./productoState/ProductoState"

const index = () => {
  return (
    <>
      <NavbarPublic />

      <Switch>
        <Route exact path="/public" component={HomePublic} />
        <Route exact path="/public/buscador" component={HomeSeacrh} />
        <Route exact path="/public/buscador/:codigo" component={ListSearch} />
        <Route
          exact
          path="/public/producto/:codigo"
          component={ProductoState}
        />
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </>
  )
}

export default index
