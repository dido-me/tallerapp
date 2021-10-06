import { useState } from "react"
import { Button } from "@mui/material"
import { Row, Col, Container } from "react-bootstrap"
import ImprimirProducto from "../modals/ImprimirProducto"

const ImpimirBarcode = ({
  activeStep,
  handleBack,
  handleNext,
  steps,
  productos,
  setProductos,
}) => {
  const [modalShow, setModalShow] = useState(false)
  const [dataModal, setDataModal] = useState({})

  const handleOpen = (item) => {
    setModalShow(true)
    setDataModal(item)
  }

  const handleClose = () => {
    setModalShow(false)
    setDataModal({})
  }

  const TerminarProceso = () => {
    // Limpear localstorage
    localStorage.removeItem("cliente")
    setProductos([])
    handleNext()
  }

  return (
    <>
      {Object.entries(dataModal).length !== 0 && (
        <ImprimirProducto
          show={modalShow}
          onHide={handleClose}
          dataModal={dataModal}
        />
      )}
      <Container>
        <Row className="mt-5 d-flex justify-content-center">
          {productos.map((item, index) => (
            <Col
              key={index}
              lg={5}
              className="mt-3 mb-3 d-flex justify-content-center"
            >
              <Button
                variant="contained"
                onClick={() => {
                  handleOpen(item)
                }}
              >
                {item.tipoProducto} - {item.marcaProducto} -{" "}
                {item.modeloProducto}
              </Button>
            </Col>
          ))}
        </Row>
      </Container>

      <Row className="mt-5">
        <Col>
          <h6 className="text-info">
            HAGA CLICK EN EL PRODUCTO PARA IMPRIMIR!
          </h6>
        </Col>
      </Row>

      <hr />

      <div className="row mt-4">
        <div className="col-md">
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Atras
          </Button>
          <Button variant="contained" color="primary" onClick={TerminarProceso}>
            {activeStep === steps.length - 1 ? "Terminar" : "Siguiente"}
          </Button>
        </div>
      </div>
    </>
  )
}

export default ImpimirBarcode
