import { useState, useEffect } from "react"
import { Row, Col, Container } from "react-bootstrap"
import logo from "../../assets/img/logoGeneral.png"
import { useFormik } from "formik"
import { TextField, Button } from "@mui/material"
import * as Yup from "yup"
import { db } from "../../firebase"
import { doc, getDoc } from "firebase/firestore"

// ================================

// Validacion del Formulario
const validate = Yup.object({
  codeUser: Yup.string().required("Ingrese el codigo"),
})

//   =============Logica del componente

const CodeCard = ({ setEstadoRegistro, history }) => {
  const [loading, setLoading] = useState(false)
  const [codeServe, setCodeServe] = useState("")
  //   Inicializando Formik
  const formik = useFormik({
    initialValues: {
      codeUser: "",
    },
    validationSchema: validate,
    onSubmit: (data) => {
      setLoading(true)
      if (data.codeUser !== codeServe) {
        formik.setErrors({ codeUser: "Codigo Incorrecto" })
        setLoading(false)
        return
      }

      setEstadoRegistro(true)
    },
  })

  useEffect(() => {
    const obtnerCodigo = async () => {
      try {
        const docRef = doc(db, "codigoRegister", "t310rtdeK98VlgmIUZ4e")
        const data = await getDoc(docRef)
        setCodeServe(data.data().codigo)
      } catch (error) {
        console.log(error)
      }
    }

    obtnerCodigo()
  }, [])

  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col className="bg-white p-5 rounded-end   shadow-lg" xs={10} lg={6}>
            <div className="text-end ">
              <img src={logo} alt="Banner" width="48" />
            </div>
            <h2 className="fw-bold text-center py-3">
              Hola, Ingresa el codigo! 🙆‍♂️
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-2">
                <TextField
                  fullWidth
                  id="codeUser"
                  name="codeUser"
                  value={formik.values.codeUser}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.codeUser && Boolean(formik.errors.codeUser)
                  }
                  helperText={formik.touched.codeUser && formik.errors.codeUser}
                  label="Codigo de Registro"
                  variant="filled"
                />
              </div>

              <div className="d-grid mb-4">
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
            <span className="text-warning fw-bold">
              * El codigo esta en su correo
            </span>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CodeCard
