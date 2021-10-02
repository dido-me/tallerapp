import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import usuarioReducer, { readUserActivoAction } from "./usuarioDucks"

const rootRedeucer = combineReducers({
  usuario: usuarioReducer,
})

export default function generateStore() {
  const store = createStore(
    rootRedeucer,
    composeWithDevTools(applyMiddleware(thunk))
  )
  readUserActivoAction()(store.dispatch)
  return store
}
