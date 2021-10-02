import ReactDOM from "react-dom"
import { StrictMode } from "react"
import App from "./App"
import "bootstrap/scss/bootstrap.scss"
import "./assets/style/main.css"

import { Provider } from "react-redux"
import generateStore from "./redux/store"

const store = generateStore()

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
)
