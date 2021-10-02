import "./login.css"
import { withRouter } from "react-router-dom"
import { useState } from "react"
import { Container, Row, Col, Alert } from "react-bootstrap"
import logo from "../../assets/img/logoGeneral.png"
import { useDispatch, useSelector } from "react-redux"
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material"
import { VisibilityOff, Visibility } from "@mui/icons-material"
import { useFormik } from "formik"
import * as Yup from "yup"
import Loading from "../Loading/Loading"

// ========================================
import { loginAction } from "../../redux/usuarioDucks"

// ==========================================

// Validacion del formulario
const validate = Yup.object({
  email: Yup.string().email("Email Invalido").required("ingrese un correo"),
  pass: Yup.string()
    .required("Ingrese una contraseña")
    .min(8, "La contraseña es muy corta, Debe ser como minimo 8 Caracteres.")
    .matches(
      /^[a-zA-Z0-9_.-]*$/,
      "Password solo debe contener letras y numeros"
    ),
})

// ==========================================

const Login = ({ firebaseUser, history }) => {
  const [loadingClick, setlLoadingClick] = useState(false)
  const loading = useSelector((store) => store.usuario.loading)
  const error = useSelector((store) => store.usuario.error)
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    validationSchema: validate,
    onSubmit: (data) => {
      dispatch(loginAction(data.email, data.pass))
      setlLoadingClick(true)
      setTimeout(() => {
        setlLoadingClick(false)
        history.push("/admin")
      }, 3000)
    },
  })

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return firebaseUser !== false ? (
    <>
      {loadingClick ? (
        <Loading />
      ) : (
        <div
          className="d-flex align-items-center bg-primary"
          style={{ minHeight: "100vh" }}
        >
          <Container className="w-75 bg-primary rounded  shadow-lg ">
            <Row className="align-items-stretch">
              <Col
                className="bg-login d-none d-lg-block rounded"
                xs={6}
                md={5}
                lg={5}
              ></Col>
              <Col className="bg-white p-5 rounded-end">
                <div className="text-end ">
                  <a href="/">
                    <img src={logo} alt="Banner" width="48" />
                  </a>
                </div>
                <h2 className="fw-bold text-center py-3   ">Bienvenido 🥳</h2>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-4">
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                      label="Email Usuario"
                      variant="filled"
                    />
                  </div>
                  <div className="mb-4">
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel
                        htmlFor="pass"
                        variant="filled"
                        error={
                          formik.touched.pass && Boolean(formik.errors.pass)
                        }
                      >
                        Contraseña
                      </InputLabel>

                      <FilledInput
                        id="pass"
                        name="pass"
                        type={showPassword ? "text" : "password"}
                        value={formik.values.pass}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.pass && Boolean(formik.errors.pass)
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText
                        error={
                          formik.touched.pass && Boolean(formik.errors.pass)
                        }
                      >
                        {formik.touched.pass && formik.errors.pass}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className="d-grid mb-5">
                    <Button
                      variant="contained"
                      type="submit"
                      className="mt-4"
                      disabled={loading}
                    >
                      Iniciar Sesion
                    </Button>
                  </div>
                </form>
                {error && (
                  <Alert variant={"danger"} className="mt-4">
                    {error}
                  </Alert>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  ) : (
    <Loading />
  )
}

export default withRouter(Login)
