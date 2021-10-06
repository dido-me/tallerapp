import { useRef } from "react"
import { Modal, Button, Container, Row, Col } from "react-bootstrap"
import Barcode from "react-hooks-barcode"
import { useReactToPrint } from "react-to-print"

const index = ({ show, onHide, dataModal }) => {
  const componentRef = useRef()
  const config = {
    background: "#f5f5f5",
    marginTop: "20px",
    marginBottom: "20px",
    fontOptions: "italic",
    width: 1,
  }

  const formatoPeru = new Intl.DateTimeFormat("es-PE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  })

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header
          className="border-end border-start border-top border-info border-5"
          closeButton
        >
          <Modal.Title>
            {dataModal.tipoProducto} - {dataModal.marcaProducto} -{" "}
            {dataModal.modeloProducto}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container ref={componentRef}>
            <Row>
              <Col>
                <h5 className="text-center">COMPROBANTE DE REGISTRO</h5>
              </Col>
            </Row>

            <Row>
              <Col>
                <Row className="mt-3">
                  <Col>
                    <h6>Numero de contacto de la empresa:</h6>
                    <ul>
                      <li> (066) 32-6090 </li>
                      <li> 966550570 </li>
                    </ul>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <h6>Pagina de seguimiento de su producto:</h6>
                    <span> https://www.efsystemaseirl.xyz/ </span> <br />
                    <span className="fw-bold">
                      {" "}
                      Busca en la web tu producto con tu DNI o el codigo de
                      registro{" "}
                    </span>
                  </Col>
                </Row>
              </Col>
              <Col className="d-flex flex-column justify-content-center align-items-center">
                <h5>CODIGO DE REGISTRO</h5>
                <Barcode value={dataModal.uid} {...config} />
              </Col>
            </Row>

            <Row className="mt-5">
              <Col>
                <h5>Cliente : {dataModal.cliente.fullName}</h5>
                <h5>
                  Producto: {dataModal.tipoProducto} - {dataModal.marcaProducto}{" "}
                  - {dataModal.modeloProducto}
                </h5>
                <h5>Celular: {dataModal.cliente.phoneNumber}</h5>
                <h5>
                  Fecha de Registro:{" "}
                  {formatoPeru.format(dataModal.fechaRegistro)}
                </h5>
              </Col>
            </Row>

            <hr />

            <Row>
              <Col className="d-flex justify-content-center align-items-center">
                <Barcode value={dataModal.uid} {...config} />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handlePrint}>Imprimir</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default index
