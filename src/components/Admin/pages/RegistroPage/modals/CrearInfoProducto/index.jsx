import { useState } from "react"
import { useFormik } from "formik"
import { Modal, Button, Tab, Row, Col, Nav, Spinner } from "react-bootstrap"
import { IconButton } from "@mui/material"
import { HighlightOff } from "@mui/icons-material"

// Validacion del formulario
import * as Yup from "yup"

// Firebase
import { db } from "../../../../../../firebase"
import { collection, setDoc, doc } from "firebase/firestore"

// Components
import InfoProducto from "./InfoProducto"
import Custodia from "./Custodia"
import Fallas from "./Fallas"
import ServicioInfo from "./ServicioInfo"
import Recomendaciones from "./Recomendaciones"

// ====================================================

// Validacion
const validate = Yup.object({
  marcaProducto: Yup.string().required("Selecione Marca del Producto"),
  tipoProducto: Yup.string().required("Selecione Tipo del Producto"),
  modeloProducto: Yup.string().required("Selecione Modelo del Producto"),
  fallas: Yup.array().min(1, "Ingrese una falla como minimo"),
  servicios: Yup.object().shape({
    total: Yup.number()
      .min(0.1, "Agregue un servicio como minimo")
      .required("Ingrese un servicio como minimo"),
  }),
})

// =========== Logica del Componente ======
const index = ({ show, handleClose, setProductos, productos }) => {
  const [spinner, setSpinner] = useState(false)
  const formik = useFormik({
    initialValues: {
      marcaProducto: "",
      tipoProducto: "",
      modeloProducto: "",
      custodia: [],
      fallas: [],
      servicios: {},
      recomends: [],
    },
    validationSchema: validate,
    onSubmit: async (data) => {
      try {
        setSpinner(true)

        const newDataRef = doc(collection(db, "registrosTaller"))
        const cliente = JSON.parse(localStorage.getItem("cliente"))
        const personal = JSON.parse(localStorage.getItem("usuario"))
        const dataFull = {
          ...data,
          cliente,
          personal,
          fechaRegistro: Date.now(),
          stateProducto: 0,
          uid: newDataRef.id,
        }
        setProductos([...productos, dataFull])
        await setDoc(newDataRef, dataFull)
        setSpinner(false)
        handleClose()
      } catch (error) {
        console.log(error)
      }
    },
  })
  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false} size="lg">
        <Modal.Header>
          <Modal.Title className="text-primary">AGREGAR PRODUCTO</Modal.Title>
          <Modal.Title>
            <IconButton
              disabled={spinner}
              color="error"
              aria-label="close"
              onClick={() => {
                handleClose()
              }}
            >
              <HighlightOff />
            </IconButton>
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Tab.Container id="infoProducto" defaultActiveKey="infoProd">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link
                        eventKey="infoProd"
                        style={
                          (formik.touched.modeloProducto &&
                            formik.errors.modeloProducto) ||
                          (formik.touched.tipoProducto &&
                            formik.errors.tipoProducto) ||
                          (formik.touched.marcaProducto &&
                            formik.errors.marcaProducto)
                            ? {
                                background: "#f50057",
                                color: "whitesmoke",
                              }
                            : {}
                        }
                      >
                        Info. Producto
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="custodia">Custodia</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="fallas"
                        style={
                          formik.touched.fallas &&
                          formik.errors.fallas && {
                            background: "#f50057",
                            color: "whitesmoke",
                          }
                        }
                      >
                        Fallas
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="servicio"
                        style={
                          formik.touched.servicios &&
                          formik.errors.servicios && {
                            background: "#f50057",
                            color: "whitesmoke",
                          }
                        }
                      >
                        Servicio
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="recomend">Recomendaciones</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="infoProd">
                      <InfoProducto formik={formik} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="custodia">
                      <Custodia formik={formik} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="fallas">
                      <Fallas formik={formik} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="servicio">
                      <ServicioInfo formik={formik} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="recomend">
                      <Recomendaciones formik={formik} />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" disabled={spinner}>
              {spinner ? (
                <div className="d-flex align-items-center">
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ml-lg-2">Cargando...</span>
                </div>
              ) : (
                "Terminar Registro"
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default index
