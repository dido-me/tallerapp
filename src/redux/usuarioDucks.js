import { auth, db } from "../firebase"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

// data
const dataStart = {
  loading: false,
  activo: false,
  error: null,
}

// types

const LOADING = "LOADING"
const USER_OK = "USER_OK"
const USER_ERROR = "USER_ERROR"
const SIGNOUT_USER = "SIGNOUT_USER"

// reducer

export default function usuarioReducer(state = dataStart, action) {
  const ACTION_REDUCER = {
    LOADING: { ...state, loading: true },
    USER_OK: {
      ...state,
      loading: false,
      activo: true,
      user: action.payload,
    },
    USER_ERROR: { ...dataStart, error: action.payload },
    SIGNOUT_USER: { ...dataStart },
  }

  const ACTION_DEFAULT = { ...state }

  return ACTION_REDUCER[action.type] || ACTION_DEFAULT
}

// action
export const loginAction = (email, pass) => async (dispatch) => {
  dispatch({
    type: LOADING,
  })

  try {
    const res = await signInWithEmailAndPassword(auth, email, pass)
    const docRef = doc(db, "usuarios", res.user.uid)
    const dataUser = await getDoc(docRef)
    dispatch({
      type: USER_OK,
      payload: {
        uid: res.user.uid,
        email: dataUser.data().email,
        apellidos: dataUser.data().apellidos,
        nombres: dataUser.data().nombres,
        empresa: dataUser.data().empresa,
      },
    })

    await localStorage.setItem(
      "usuario",
      JSON.stringify({
        uid: res.user.uid,
        email: dataUser.data().email,
        apellidos: dataUser.data().apellidos,
        nombres: dataUser.data().nombres,
        empresa: dataUser.data().empresa,
      })
    )
  } catch (error) {
    console.log(error)
    const NAME_EROR = {
      "auth/wrong-password": "Contraseña o Email incorrecto",
      "auth/user-not-found": "Usuario no registrado",
      "auth/too-many-requests":
        "Inhabilitado Temporalmente, muchos intentos fallidos",
    }

    const NAME_DEFAULT = "Error de Servidor"

    dispatch({
      type: USER_ERROR,
      payload: NAME_EROR[error.code] || NAME_DEFAULT,
    })
  }
}

export const readUserActivoAction = () => (dispatch) => {
  if (localStorage.getItem("usuario")) {
    dispatch({
      type: USER_OK,
      payload: JSON.parse(localStorage.getItem("usuario")),
    })
  }
}

export const signoutAction = () => (dispatch) => {
  signOut(auth)
  dispatch({
    type: SIGNOUT_USER,
  })

  localStorage.removeItem("usuario")
}
