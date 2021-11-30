import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { Alert, Container, Row, Col } from "react-bootstrap"
import logo from "../../assets/img/logoGeneral.png"
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Autocomplete,
} from "@mui/material"
import { VisibilityOff, Visibility } from "@mui/icons-material"
import * as Yup from "yup"
import { auth, db } from "../../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc, collection, getDocs } from "firebase/firestore"
import { withRouter } from "react-router-dom"

// ================================
// Validacion del Formulario
const validate = Yup.object({
  nombres: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, "Ingrese un nombre valido")
    .required("Ingrese Nombres"),
  apellidos: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, "Ingrese un apellido valido")
    .required("Ingrese Apellidos"),
  email: Yup.string().email("Correo invalido").required("Ingrese su Correo"),
  pass1: Yup.string()
    .required("Ingrese una contraseña")
    .min(8, "La contraseña es muy corta, Debe ser como minimo 8 Caracteres.")
    .matches(
      /^[a-zA-Z0-9_.-]*$/,
      "Password solo debe contener lestras y numeros"
    ),
  pass2: Yup.string().oneOf(
    [Yup.ref("pass1"), null],
    "No coinciden la contraseña"
  ),
  empresa: Yup.string().required("Selecione una empresa"),
})

const RegisterCard = (props) => {
  const [empresas, setEmpresas] = useState([])
  const [showPassword1, setShowPassword1] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const formik = useFormik({
    initialValues: {
      nombres: "",
      apellidos: "",
      email: "",
      pass1: "",
      pass2: "",
      empresa: "",
    },
    validationSchema: validate,
    onSubmit: async (data) => {
      setLoading(true)
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.pass2
        )

        const dataClean = {
          nombres: data.nombres,
          apellidos: data.apellidos,
          email: data.email,
          pass: data.pass2,
          fechaCreate: Date.now(),
          empresa: data.empresa,
          photoUrl: process.env.FOTO_URL,
        }
        const dataRef = doc(db, "usuarios", res.user.uid)
        await setDoc(dataRef, dataClean)
        formik.resetForm()
        setLoading(false)
        props.history.push("/login")
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setError("Usuario ya registrado...")
          setTimeout(() => {
            setError(null)
            formik.resetForm()
          }, 4000)
          setLoading(false)
          return
        }
        if (error.code === "auth/invalid-email") {
          setError("Email no válido")
          setTimeout(() => {
            setError(null)
          }, 4000)
          setLoading(false)
          return
        }
        console.log(error)
      }
    },
  })

  const handleClickShowPassword = () => {
    setShowPassword1(!showPassword1)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  useEffect(() => {
    const getEmpresas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "empresas"))
        const arrayMarcasProductos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setEmpresas(arrayMarcasProductos)
      } catch (error) {
        console.log(error)
      }
    }

    getEmpresas()
  }, [])

  return (
    <>
      <Container className="w-75 bg-primary rounded  shadow-lg ">
        <Row className="align-items-stretch">
          <Col
            className="bg d-none d-lg-block rounded"
            xs={6}
            md={5}
            lg={5}
          ></Col>
          <Col className="bg-white p-5 rounded-end">
            <div className="text-end ">
              <img src={logo} alt="Banner" width="48" />
            </div>
            <h2 className="fw-bold text-center py-3   ">
              Hey, Bienvenido a TALLER 😎{" "}
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <TextField
                  fullWidth
                  id="nombres"
                  name="nombres"
                  value={formik.values.nombres}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.nombres && Boolean(formik.errors.nombres)
                  }
                  helperText={formik.touched.nombres && formik.errors.nombres}
                  label="Nombres Completos"
                  variant="filled"
                />
              </div>
              <div className="mb-4">
                <TextField
                  fullWidth
                  id="apellidos"
                  name="apellidos"
                  value={formik.values.apellidos}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.apellidos && Boolean(formik.errors.apellidos)
                  }
                  helperText={
                    formik.touched.apellidos && formik.errors.apellidos
                  }
                  label="Apellidos Completos"
                  variant="filled"
                />
              </div>
              <div className="mb-4">
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Propio"
                  variant="filled"
                />
              </div>
              <div className="mb-4">
                <Row>
                  <Col>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel
                        htmlFor="pass1"
                        variant="filled"
                        error={
                          formik.touched.pass1 && Boolean(formik.errors.pass1)
                        }
                      >
                        Contraseña
                      </InputLabel>

                      <FilledInput
                        id="pass1"
                        name="pass1"
                        type={showPassword1 ? "text" : "password"}
                        value={formik.values.pass1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.pass1 && Boolean(formik.errors.pass1)
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword1 ? (
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
                          formik.touched.pass1 && Boolean(formik.errors.pass1)
                        }
                      >
                        {formik.touched.pass1 && formik.errors.pass1}
                      </FormHelperText>
                    </FormControl>
                  </Col>
                  <Col>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel
                        htmlFor="pass2"
                        variant="filled"
                        error={
                          formik.touched.pass2 && Boolean(formik.errors.pass2)
                        }
                      >
                        Repita Contraseña
                      </InputLabel>

                      <FilledInput
                        id="pass2"
                        name="pass2"
                        type={showPassword1 ? "text" : "password"}
                        value={formik.values.pass2}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.pass2 && Boolean(formik.errors.pass2)
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword1 ? (
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
                          formik.touched.pass2 && Boolean(formik.errors.pass2)
                        }
                      >
                        {formik.touched.pass2 && formik.errors.pass2}
                      </FormHelperText>
                    </FormControl>
                  </Col>
                </Row>
              </div>

              <div className="mb-4">
                <Row>
                  <Col>
                    <Autocomplete
                      id="empresa"
                      name="empresa"
                      options={empresas}
                      fullWidth
                      getOptionLabel={(option) => option.name}
                      onChange={(_, value) =>
                        formik.setFieldValue("empresa", value?.id || "")
                      }
                      onBlur={formik.handleBlur}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(
                            formik.touched.empresa && formik.errors.empresa
                          )}
                          helperText={
                            formik.touched.empresa && formik.errors.empresa
                          }
                          label="Empresa"
                          variant="filled"
                        />
                      )}
                    />
                  </Col>
                </Row>
              </div>

              <div className="d-grid mb-5">
                <Button
                  variant="contained"
                  type="submit"
                  className="mt-4"
                  disabled={loading}
                >
                  Registrar Usuario
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
    </>
  )
}

export default withRouter(RegisterCard)
