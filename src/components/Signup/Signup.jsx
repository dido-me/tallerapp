import "./signup.css"
import { useState } from "react"
import CodeCard from "./CodeCard"
import RegisterCard from "./RegisterCard"
import Loading from "../Loading/Loading"

const Signup = ({ firebaseUser }) => {
  const [estadoRegistro, setEstadoRegistro] = useState(false) // cambiar a false

  return firebaseUser !== false ? (
    <>
      <div
        className="d-flex align-items-center bg-primary"
        style={{ minHeight: "100vh" }}
      >
        {estadoRegistro ? (
          <RegisterCard />
        ) : (
          <CodeCard setEstadoRegistro={setEstadoRegistro} />
        )}
      </div>
    </>
  ) : (
    <Loading />
  )
}

export default Signup
