import { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Button, Box, TextField, IconButton } from "@mui/material"
import { AccountCircle, Fingerprint, PhoneAndroid } from "@mui/icons-material"
import { useFormik } from "formik"
import { FaIdCard } from "react-icons/fa"
import axios from "axios"
// Validacion del formulario
import * as Yup from "yup"
// Custom hooks
import useLocalStorage from "../../../../../hooks/useLocalStorage"

const validate = Yup.object({
  DNI: Yup.string()
    .required("Ingrese un DNI Valido")
    .min(8, "DNI INVALIDO")
    .max(8, "DNI INVALIDO")
    .matches(/^[0-9]*$/, "DNI INVALIDO"),
  fullName: Yup.string().required("Ingrese DNI valido."),
  phoneNumber: Yup.string()
    .required("Ingrese un numero de celular")
    .matches(/^[0-9]{9}$/, "Ingrese un numero de celular valido."),
})

const ClienteInfo = ({ steps, activeStep, handleNext }) => {
  // eslint-disable-next-line no-unused-vars
  const [cliente, setCliente] = useLocalStorage("cliente", null)
  const [stateManual, setStateManual] = useState(false)
  const [status, setStatus] = useState("")
  const [dni, setDni] = useState({})
  const formik = useFormik({
    initialValues: {
      DNI: "",
      fullName: "",
      phoneNumber: "",
    },
    validationSchema: validate,
    onSubmit: (data) => {
      setCliente(
        JSON.stringify({ ...data, fullName: data.fullName.toUpperCase() })
      )
      handleNext()
    },
  })

  const handleDNI = async () => {
    // formik.setValues("fullName", "")
    if (formik.touched.DNI === undefined || formik.errors.DNI) {
      formik.setFieldTouched("DNI", true)
      return
    }

    try {
      const res = await axios.get(
        `${process.env.API_DNI_ULR}${formik.values.DNI}${process.env.API_TOKEN}`
      )

      setDni(res.data)

      if (res.data.nombres !== "") {
        if (res.data.nombres === null) {
          setStatus(404)
          formik.setFieldValue("fullName", "")
          formik.setFieldValue("DNI", "")
          formik.setFieldTouched("DNI", true)
          setStateManual(true)
        } else {
          setStatus(200)
          formik.setFieldValue(
            "fullName",
            `${res.data.nombres} ${res.data.apellidoPaterno} ${res.data.apellidoMaterno}`
          )
        }
      } else {
        setStatus(404)
        formik.setFieldValue("DNI", "")
        formik.setFieldTouched("DNI", true)
      }
    } catch (error) {
      setStatus(error.response.status)
    }
  }

  //   Use Efecct
  useEffect(() => {
    // Limpear localstorage
    localStorage.removeItem("cliente")
    // return () => {

    // }
  }, [])

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Container className="mt-5 ">
          <Row className="mt-5">
            <Col className=" text-center">
              <h2>Hola 🙌 Ingresa todo la informacion del cliente</h2>
              <span className="text-warning">
                * Despues de llenar el DNI click en la huella
              </span>
            </Col>
          </Row>
          <Row className="mt-5 d-flex justify-content-center ">
            <Col lg={4} xs={10}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <PhoneAndroid sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Numero de Celular"
                  variant="standard"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                />
              </Box>
            </Col>
          </Row>
          <Row className="mt-5 d-flex justify-content-center ">
            <Col lg={4} xs={10}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  fullWidth
                  id="DNI"
                  name="DNI"
                  value={formik.values.DNI}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.DNI && Boolean(formik.errors.DNI)}
                  helperText={formik.touched.DNI && formik.errors.DNI}
                  label="DNI"
                  variant="standard"
                />
                <IconButton
                  aria-label="findDNI"
                  color="success"
                  onClick={handleDNI}
                >
                  <Fingerprint />
                </IconButton>
              </Box>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className=" text-center">
              {stateManual ? null : (
                <FaIdCard
                  style={{ fontSize: "45px" }}
                  className="me-3 text-primary"
                />
              )}
              {status === 200 ? (
                dni.success !== undefined ? (
                  <span style={{ fontSize: "15px" }}>{dni.message}</span>
                ) : (
                  <span style={{ fontSize: "15px" }}>
                    {dni.nombres} {dni.apellidoPaterno} {dni.apellidoMaterno}
                  </span>
                )
              ) : (
                <>
                  {status === 404 ? (
                    <>
                      {stateManual ? (
                        <TextField
                          fullWidth
                          id="fullName"
                          name="fullName"
                          label="Ingrese el Nombre Manualmente .."
                          variant="filled"
                          value={formik.values.fullName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.fullName &&
                            Boolean(formik.errors.fullName)
                          }
                          helperText={
                            formik.touched.fullName && formik.errors.fullName
                          }
                        />
                      ) : (
                        <span
                          style={{ fontSize: "15px" }}
                          className="text-warning fw-bold"
                        >
                          No se encontro resultados.(Error de servidor)
                        </span>
                      )}
                    </>
                  ) : (
                    <span
                      style={{ fontSize: "15px" }}
                      className="text-warning fw-bold"
                    >
                      Ingrese un DNI
                    </span>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Container>
        <Row className="mt-5">
          <Col>
            <Button variant="contained" color="primary" type="submit">
              {activeStep === steps.length - 1 ? "Terminar" : "Siguiente"}
            </Button>
          </Col>
        </Row>
      </form>
    </>
  )
}

export default ClienteInfo
