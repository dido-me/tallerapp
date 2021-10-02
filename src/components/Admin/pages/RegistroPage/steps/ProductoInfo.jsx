import { useState } from "react"
import { Container, Row, Col, Card, Alert } from "react-bootstrap"
import { Button, IconButton } from "@mui/material"
import { ControlPoint, Delete } from "@mui/icons-material"
// SweetAlert2
import Swal from "sweetalert2"
// Firebase
import { db } from "../../../../../firebase"
import { doc, deleteDoc } from "firebase/firestore"

// ModalComponent
import CrearInfoProducto from "../modals/CrearInfoProducto"
import {
  FaCog,
  FaCube,
  FaExclamationCircle,
  FaLongArrowAltRight,
} from "react-icons/fa"

// ============ Logica del Componente ===========

const ProductoInfo = ({
  activeStep,
  steps,
  handleNext,
  productos,
  setProductos,
  handleBack,
}) => {
  // Modal
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  // Colores
  const colors = ["#2364aa", "#3da5d9", "#73bfb8", "#e76f51"]
  // Error
  const [error, setError] = useState(false)
  // Eliminar Producto
  const eliminarProducto = (id, uid) => {
    Swal.fire({
      icon: "warning",
      iconColor: "#e74a3b",
      showCancelButton: true,
      confirmButtonColor: "#4e73df",
      cancelButtonColor: "#e74a3b",
      title: "Eliminar?",
      text: "Accion irréversible!!",
      confirmButtonText: "Si, eliminarlo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "registrosTaller", uid))
          const arrayFiltrado = productos.filter((_, index) => index !== id)
          setProductos(arrayFiltrado)
          Swal.fire("Eliminado!", "", "success")
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  // Verificar Productos Existentes
  const NextButton = () => {
    if (!productos.length) {
      setError(true)
      return
    }
    handleNext()
  }

  return (
    <>
      {/* Modales */}
      {show && (
        <CrearInfoProducto
          show={show}
          handleClose={handleClose}
          setProductos={setProductos}
          productos={productos}
        />
      )}

      {/* Fin de Modal */}
      <Container className="mt-5">
        <Row className="mt-5">
          <Col className=" text-center">
            <h3 className="text-dark">Productos</h3>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col className=" text-center">
            <Button
              variant="contained"
              onClick={handleShow}
              startIcon={<ControlPoint />}
            >
              Agregar
            </Button>
          </Col>
        </Row>
        {/* Contenido  */}
        <Row>
          {productos.length ? (
            productos.map((item, index) => (
              <Col sm={4} className="mt-3" key={index}>
                <Card style={{ borderColor: colors[index % 4] }}>
                  <Card.Header
                    className="text-center text-white"
                    style={{
                      borderColor: colors[index % 4],
                      background: colors[index % 4],
                    }}
                  >
                    <h5 className="mt-2">{item.tipoProducto}</h5>
                  </Card.Header>
                  <Card.Body>
                    <Card.Subtitle className=" text-dark fw-bold text-center">
                      {item.marcaProducto} - {item.modeloProducto}
                    </Card.Subtitle>
                    <hr style={{ borderColor: colors[index % 4] }} />

                    {item.custodia.length ? (
                      <>
                        <Card.Text className="text-dark fw-bold">
                          Custodia:
                        </Card.Text>
                        {item.custodia.map((cus, indCus) => (
                          <Card.Text key={indCus}>
                            <FaCube className="me-2 text-primary" />
                            {cus}
                          </Card.Text>
                        ))}
                      </>
                    ) : (
                      ""
                    )}

                    <Card.Text className="text-dark fw-bold">Fallas:</Card.Text>
                    {item.fallas.map((ite, ind) => (
                      <Card.Text key={ind}>
                        <FaExclamationCircle className="text-warning me-2" />
                        {ite}
                      </Card.Text>
                    ))}

                    <Card.Text className="text-dark fw-bold">
                      Servicio:
                    </Card.Text>
                    {item.servicios.list.map((ser, indSer) => (
                      <Card.Text key={indSer}>
                        <FaCog className="text-info me-2" />
                        {ser.name}
                        <FaLongArrowAltRight className="ms-3 text-success" />
                        <span className="ms-3 text-primary">
                          {new Intl.NumberFormat("es-PE", {
                            style: "currency",
                            currency: "PEN",
                          }).format(ser.precio)}
                        </span>
                      </Card.Text>
                    ))}

                    <hr style={{ borderColor: colors[index % 4] }} />
                    <Row>
                      <Col
                        sm={12}
                        className="d-flex justify-content-between fw-bold"
                        style={{ color: colors[index % 4] }}
                      >
                        <span>TOTAL</span>
                        <span>
                          {new Intl.NumberFormat("es-PE", {
                            style: "currency",
                            currency: "PEN",
                          }).format(item.servicios.total)}
                        </span>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer
                    className="d-flex justify-content-end"
                    style={{
                      borderColor: colors[index % 4],
                      background: colors[index % 4],
                    }}
                  >
                    <IconButton
                      onClick={() => eliminarProducto(index, item.uid)}
                      aria-label="eliminar"
                      style={{ color: "whitesmoke" }}
                    >
                      <Delete />
                    </IconButton>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          ) : (
            <Col sm={12} className="text-center mt-4 mb-4">
              <Alert variant={error ? "danger" : "warning"}>
                No ha registrado ningun producto
              </Alert>
            </Col>
          )}
        </Row>

        <Row className="mt-5">
          <Col>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Atras
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={NextButton}
            >
              {activeStep === steps.length - 1 ? "Terminar" : "Siguiente"}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ProductoInfo
