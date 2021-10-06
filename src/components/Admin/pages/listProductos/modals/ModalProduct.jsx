import { useState } from "react"
import ImprimirDatos from "./ImprimirDatos"
import NumberPhone from "./NumberPhone"
import { Modal, Container, Row, Col } from "react-bootstrap"
import { IconButton, CircularProgress, Button } from "@mui/material"

import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop"
// SweetAlert2
import Swal from "sweetalert2"
// Firebase
import { doc, updateDoc, setDoc } from "firebase/firestore"
import { db } from "../../../../../firebase"
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
  FaPeopleCarry,
  FaDollyFlatbed,
  FaCalendarCheck,
  FaSave,
  FaEdit,
  FaPlusCircle,
} from "react-icons/fa"
import AddErrorsProd from "./AddErrorsProd"

const ModalProduct = ({
  show,
  handleClose,
  dataModal,
  setDataModal,
  datafull,
  index,
  setData,
}) => {
  const [modalShow, setModalShow] = useState(false)
  const [dataPrint, setDataPrint] = useState({})
  const [dataFallas, setDataFallas] = useState({})
  const [stateProd, setStateProd] = useState(dataModal.stateProducto)
  const [stateClick, setStateClik] = useState(false)
  const [loading, setLoading] = useState(false)
  const [okChage, setOkChage] = useState(false)

  // Modal Cell
  const [showCell, setShowCell] = useState(false)
  const handleCloseCell = () => {
    setShowCell(false)
  }
  const handleShowCell = () => {
    setShowCell(true)
  }
  // Fin Modal Cell

  // Modal Add Erros
  const [showErrorsAdd, setShowErrorsAdd] = useState(false)
  const handleCloseErrorsAdd = () => {
    setShowErrorsAdd(false)
    setDataFallas({})
  }
  const handleShowErrorsAdd = () => {
    setShowErrorsAdd(true)
    setDataFallas(dataModal)
  }

  // Fin Modal

  const handlePrintOpen = () => {
    setModalShow(true)
    setDataPrint(dataModal)
  }

  const handlePrintClose = () => {
    setModalShow(false)
    setDataPrint({})
  }

  const formatoPeru = new Intl.DateTimeFormat("es-PE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  })

  const ICON_STATE = {
    0: <FaPeopleCarry className="fs-2   text-white" />,
    1: <FaTools className="fs-2   text-white" />,
    2: <FaDollyFlatbed className="fs-2   text-white" />,
    3: <FaCalendarCheck className="fs-2   text-white" />,
  }

  const COLOR_STATE = {
    0: "#ffbe0b",
    1: "#fb5607",
    2: "#8338ec",
    3: "#3a86ff",
  }

  const NAME_STATE = {
    0: "REGISTRADO",
    1: "EN REVISION",
    2: "TERMINADO",
    3: "ENTREGADO",
  }

  const handleStateProd = () => {
    setStateClik(true)
    if (stateProd < 3) {
      setStateProd(stateProd + 1)
    } else {
      setStateProd(0)
    }
  }

  const handleSave = () => {
    Swal.fire({
      icon: "info",

      showCancelButton: true,
      confirmButtonColor: "#4e73df",
      cancelButtonColor: "#e74a3b",
      title: "Cambio correctamente el estado?",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true)
          const washingtonRef = doc(db, "registrosTaller", dataModal.uid)

          await updateDoc(washingtonRef, {
            stateProducto: stateProd,
          })
          const arrayUpdate = datafull.map((item, i) =>
            i === index ? { ...item, estado: stateProd } : item
          )

          setData(arrayUpdate)

          if (stateProd === 3) {
            const cityRef = doc(db, "registrosTaller", dataModal.uid)
            setDoc(cityRef, { fechaEntrega: Date.now() }, { merge: true })
            setDataModal({ ...dataModal, fechaEntrega: Date.now() })
            setOkChage(true)
          }

          setStateClik(false)
          setLoading(false)
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  return (
    <>
      {Object.entries(dataModal).length !== 0 && (
        <>
          <NumberPhone
            show={showCell}
            handleCloseCell={handleCloseCell}
            phoneData={dataModal}
            setDataModal={setDataModal}
          />
        </>
      )}

      {Object.entries(dataFallas).length !== 0 && (
        <>
          <AddErrorsProd
            show={showErrorsAdd}
            handleClose={handleCloseErrorsAdd}
            data={dataFallas}
            setDataModal={setDataModal}
          />
        </>
      )}
      {Object.entries(dataPrint).length !== 0 && (
        <>
          <ImprimirDatos
            show={modalShow}
            onHide={handlePrintClose}
            dataModal={dataPrint}
          />
        </>
      )}

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
                        onClick={
                          dataModal.stateProducto === 3 || okChage === true
                            ? null
                            : handleStateProd
                        }
                        style={{
                          width: "80px",
                          height: "80px",
                          background: COLOR_STATE[stateProd],
                          cursor: "pointer",
                        }}
                      >
                        {ICON_STATE[stateProd]}
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <h5 className="text-center">
                          Estado: {NAME_STATE[stateProd]}
                          {stateClick && (
                            <>
                              {loading ? (
                                <CircularProgress
                                  color="inherit"
                                  size={30}
                                  className="ms-2"
                                />
                              ) : (
                                <IconButton
                                  aria-label="delete"
                                  size="small"
                                  className="ms-2"
                                  onClick={handleSave}
                                >
                                  <FaSave className="text-white" />
                                </IconButton>
                              )}
                            </>
                          )}
                        </h5>
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
                        {formatoPeru.format(dataModal.fechaEntrega)}
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
                  <h6 className="text-center mt-3 mb-3">
                    CELULAR:{" "}
                    <span>
                      {dataModal.cliente.phoneNumber
                        ? dataModal.cliente.phoneNumber
                        : "No registrado."}
                    </span>
                    <span className="ms-2">
                      <IconButton
                        aria-label="editCell"
                        size="small"
                        color="info"
                        className="ms-2"
                        onClick={handleShowCell}
                      >
                        <FaEdit />
                      </IconButton>
                    </span>
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
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <IconButton
                    aria-label="addErrors"
                    size="large"
                    onClick={handleShowErrorsAdd}
                  >
                    <FaPlusCircle />
                  </IconButton>
                  {dataModal.fallas.map((item, index) => (
                    <h6 className="text-center mb-4 " key={index}>
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
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            variant="contained"
            onClick={handlePrintOpen}
            startIcon={<LocalPrintshopIcon />}
          >
            Imprimir Comprobante
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalProduct
