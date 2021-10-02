import { useRef } from "react"
import { Button, IconButton } from "@mui/material"
import PrintIcon from "@mui/icons-material/Print"
import { Row, Col, Card, Container } from "react-bootstrap"
import Barcode from "react-hooks-barcode"
import { useReactToPrint } from "react-to-print"

const ImpimirBarcode = ({
  activeStep,
  handleBack,
  handleNext,
  steps,
  productos,
  setProductos,
}) => {
  const config = {
    marginTop: "20px",
    marginBottom: "20px",
    width: 1,
    lineColor: "#2364aa",
  }
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const TerminarProceso = () => {
    // Limpear localstorage
    localStorage.removeItem("cliente")
    setProductos([])
    handleNext()
  }

  return (
    <>
      <Container ref={componentRef}>
        {productos.map((item, index) => (
          <Row key={index} className="d-flex justify-content-center">
            <Col sm={8} className="mt-4">
              <Card>
                <Card.Header
                  className="d-flex justify-content-between text-white"
                  style={{ background: "#2364aa" }}
                >
                  <span>{item.tipoProducto}</span> -
                  <span>{item.modeloProducto}</span>
                </Card.Header>
                <Card.Body className="d-flex justify-content-center">
                  <Barcode value={item.uid} {...config} />
                </Card.Body>
                <Card.Footer>
                  <Row>
                    <Col sm={12}>Fecha de Registro: {item.fechaRegistro}</Col>
                    <hr />
                    <Col sm={12}>
                      <span className="text-info">
                        * Haz seguimiento en nuestra pagina con el codigo de
                        barras o tu DNI
                      </span>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>

      <hr />
      <Row>
        <Col sm={12} className="d-flex justify-content-center">
          <IconButton aria-label="print" onClick={handlePrint} color="primary">
            <PrintIcon fontSize="large" className="mr-2" /> Imprimir
          </IconButton>
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
