import { Modal, Container, Row, Col } from "react-bootstrap"
import {
  FaTools,
  FaUserCircle,
  FaDiceD6,
  FaMoneyBillAlt,
  FaInfoCircle,
  FaCircle,
  FaCogs,
  FaLongArrowAltRight,
  FaHome,
} from "react-icons/fa"

const ModalProduct = ({ show, handleClose, dataModal }) => {
  const formatoPeru = new Intl.DateTimeFormat("es-PE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  })
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>INFORMACION DEL REGISTRO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="m-3 rounded rounded-3 bg-primary shadow-lg text-white">
              <Col>
                <Row>
                  <Col>
                    <Row className="m-3 d-flex justify-content-center">
                      <Col
                        lg={2}
                        className="rounded-circle d-flex justify-content-center align-items-center shadow-lg"
                        style={{
                          width: "80px",
                          height: "80px",
                          background: "#ffbe0b",
                        }}
                      >
                        <FaTools className="fs-2   text-white" />
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <h5 className="text-center">Estado: Registrado</h5>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row className="m-3 d-flex justify-content-center">
                      <Col
                        lg={2}
                        className="rounded-circle d-flex justify-content-center bg-success align-items-center shadow-lg"
                        style={{
                          width: "80px",
                          height: "80px",
                        }}
                      >
                        <FaMoneyBillAlt className="fs-2   text-white" />
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <h5 className="text-center">
                          Pago Total:{" "}
                          {new Intl.NumberFormat("es-PE", {
                            style: "currency",
                            currency: "PEN",
                          }).format(dataModal.servicios.total)}
                        </h5>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <hr />
                <Row className="mt-4 mb-4">
                  <Col>
                    <h6 className="text-center text-uppercase fw-bold">
                      Fecha de Registro
                    </h6>

                    <h6 className="text-center ">
                      {formatoPeru.format(dataModal.fechaRegistro)}
                    </h6>
                  </Col>
                  <Col>
                    <h6 className="text-center text-uppercase fw-bold">
                      Fecha de Entrega
                    </h6>

                    {dataModal.fechaEntrega ? (
                      <h6 className="text-center ">
                        {formatoPeru.format(dataModal.fechaRegistro)}
                      </h6>
                    ) : (
                      <h6 className="text-center text-white-50">
                        NO SE ENTREGO
                      </h6>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row
              className="m-3 rounded rounded-3  shadow-lg text-white"
              style={{ backgroundColor: "#8338ec" }}
            >
              <Row>
                <Col
                  lg={2}
                  xs={4}
                  className="border-end border-3 d-flex justify-content-center align-items-center shadow-lg"
                >
                  <FaUserCircle className="fs-1 m-3 " />
                </Col>
                <Col lg={10} xs={8}>
                  <h6 className="text-center mt-4 mb-3">
                    CLIENTE: <span>{dataModal.cliente.fullName}</span>
                  </h6>
                  <h6 className="text-center mt-3 mb-3">
                    DNI: <span>{dataModal.cliente.DNI}</span>
                  </h6>
                </Col>
              </Row>
            </Row>
            <Row
              className="m-3 rounded rounded-3  shadow-lg text-white"
              style={{ backgroundColor: "#8338ec" }}
            >
              <Row>
                <Col
                  lg={2}
                  xs={4}
                  className="border-end border-3 d-flex justify-content-center align-items-center shadow-lg"
                >
                  <FaDiceD6 className="fs-1 m-3 " />
                </Col>
                <Col lg={10} xs={8}>
                  <h6 className="text-center mt-4 mb-3">
                    PRODUCTO: <span>{dataModal.tipoProducto}</span>
                  </h6>
                  <h6 className="text-center mt-3 mb-3">
                    MARCA: <span>{dataModal.marcaProducto}</span>
                  </h6>
                  <h6 className="text-center mt-3 mb-3">
                    MODELO: <span>{dataModal.modeloProducto}</span>
                  </h6>
                </Col>
              </Row>
            </Row>
            <Row
              className="m-3 rounded rounded-3  shadow-lg text-white"
              style={{ backgroundColor: "#8338ec" }}
            >
              <Row>
                <Col
                  lg={2}
                  xs={4}
                  className="border-end border-3 d-flex justify-content-center align-items-center shadow-lg"
                >
                  <FaHome className="fs-1 m-3 " />
                </Col>
                <Col lg={10} xs={8}>
                  <h6 className="text-center mt-4 mb-3">
                    <span>
                      {dataModal.personal.empresa === "EF"
                        ? "EF SYSTEMAS - Jr. Bellido 485"
                        : "SAYOR - Jr. Libertad 511"}
                    </span>
                  </h6>
                </Col>
              </Row>
            </Row>
            <Row className="m-3 rounded rounded-3  shadow-lg text-white bg-danger">
              <Row>
                <Col
                  lg={2}
                  xs={4}
                  className="border-end border-3 d-flex justify-content-center align-items-center shadow-lg"
                >
                  <FaInfoCircle className="fs-1 m-3 " />
                </Col>
                <Col
                  lg={10}
                  xs={8}
                  className="d-flex justify-content-center align-items-center"
                >
                  {dataModal.fallas.map((item, index) => (
                    <h6 className="text-center " key={index}>
                      <FaCircle className="me-2" /> {item}
                    </h6>
                  ))}
                </Col>
              </Row>
            </Row>
            <Row className="m-3 rounded rounded-3  shadow-lg text-white bg-success">
              <Row>
                <Col
                  lg={2}
                  xs={4}
                  className="border-end border-3 d-flex justify-content-center align-items-center shadow-lg"
                >
                  <FaCogs className="fs-1 m-3 " />
                </Col>
                <Col
                  lg={10}
                  xs={8}
                  className="d-flex justify-content-center align-items-center"
                >
                  {dataModal.servicios.list.map((item, index) => (
                    <h6 className="text-center mt-3 mb-3 " key={index}>
                      <FaCircle className="me-2" /> {item.name}{" "}
                      <FaLongArrowAltRight />{" "}
                      {new Intl.NumberFormat("es-PE", {
                        style: "currency",
                        currency: "PEN",
                      }).format(item.precio)}
                    </h6>
                  ))}
                </Col>
              </Row>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalProduct
