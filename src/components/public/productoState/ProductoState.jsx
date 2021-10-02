import { useEffect, useState } from "react"
import { Container, Row, Col, Alert } from "react-bootstrap"
import { useParams, Link } from "react-router-dom"
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  StepContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Button,
} from "@mui/material"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import SearchIcon from "@mui/icons-material/Search"
import {
  FaPeopleCarry,
  FaTools,
  FaDollyFlatbed,
  FaCalendarCheck,
  FaDiceD6,
  FaCube,
  FaLongArrowAltRight,
} from "react-icons/fa"

// Firebase
import { db } from "../../../firebase"
import { doc, getDoc } from "firebase/firestore"

const steps = [
  {
    label: "Registrado",
    description: `El Producto se encuentra registrado en nuestro TALLER.`,
  },
  {
    label: "En Revision",
    description:
      "Los Tecnicos de la tienda se encuentran trabajando con su producto.",
  },
  {
    label: "Terminado",
    description: `EL prodcuto ha sido arreglado y esta listo para su entrega en el local correpodiente.`,
  },
  {
    label: "Entregado",
    description: `El producto se entrego.`,
  },
]

const ProductoState = () => {
  const { codigo } = useParams()

  const [spinner, setSpinner] = useState(false)
  const [data, setData] = useState({})
  const formatoPeru = new Intl.DateTimeFormat("es-PE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  })

  const COLORSTATE = {
    0: "#ffbe0b",
    1: "#fb5607",
    2: "#8338ec",
    3: "#3a86ff",
  }

  const activeStep = data.stateProducto

  useEffect(() => {
    const getData = async () => {
      setSpinner(true)
      const docRef = doc(db, "registrosTaller", codigo)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setData(docSnap.data())
      } else {
        setData({})
      }
      setSpinner(false)
    }

    getData()
  }, [codigo])

  return (
    <>
      <Container className="mt-5">
        {spinner ? (
          <Row className="mt-5">
            <Col className="d-flex justify-content-center mt-5">
              <CircularProgress color="success" className="mt-5" />
            </Col>
          </Row>
        ) : (
          <>
            {Object.entries(data).length === 0 ? (
              <>
                <Alert variant={"danger"} className="text-center">
                  NO HAY REGISTRO DE ESTE PRODUCTO VUELVA A BUSCAR
                </Alert>

                <Col className="d-flex justify-content-center">
                  <Button
                    component={Link}
                    to="/public/buscador"
                    variant="contained"
                    startIcon={<SearchIcon />}
                  >
                    Buscar
                  </Button>
                </Col>
              </>
            ) : (
              <>
                <Row>
                  <Col className="text-lg-end ">
                    <h4>
                      Monto Total:{" "}
                      {new Intl.NumberFormat("es-PE", {
                        style: "currency",
                        currency: "PEN",
                      }).format(data.servicios.total)}
                    </h4>
                  </Col>
                </Row>
                <Row
                  className="mt-4 text-white"
                  style={
                    data.personal.empresa === "EF"
                      ? { backgroundColor: "#1789FC" }
                      : { backgroundColor: "#7209b7" }
                  }
                >
                  <Col lg={4} className="text-center mt-3 mb-3">
                    <h4 className="fw-bold">Fecha de Registro</h4>
                    <h6>{formatoPeru.format(data.fechaRegistro)}</h6>
                  </Col>
                  <Col lg={4} className="text-center mt-3 mb-3">
                    <h4 className="fw-bold">Fecha de Entrega</h4>
                    {data.fechaEntrega ? (
                      <h6>{formatoPeru.format(data.fechaEntrega)}</h6>
                    ) : (
                      <h6 className="text-white-50">NO SE ENTREGO</h6>
                    )}
                  </Col>
                  <Col lg={4} className="text-center mt-3 mb-3">
                    <h4 className="fw-bold">Empresa</h4>
                    <h6>
                      {data.personal.empresa === "EF" ? "EF SYSTEMAS" : "SAYOR"}
                    </h6>
                  </Col>
                </Row>
                <Row className="border-bottom border-top mt-5 border-3 ">
                  <Col
                    lg={4}
                    className="border-end border-3 d-flex align-content-center flex-wrap"
                  >
                    <h6 className="mt-3 mb-3 fw-bold border-primary border-bottom  text-center">
                      INFORMACION DEL REGISTRO
                    </h6>
                    <h6 className="fw-bold mt-2 mb-3 ">
                      Cod. Registro:{" "}
                      <span style={{ color: "gray" }}>{data.uid}</span>
                    </h6>
                    <h6 className="fw-bold mt-2 mb-3 ">
                      Cliente:{" "}
                      <span style={{ color: "gray" }}>
                        {data.cliente.fullName}
                      </span>
                    </h6>
                  </Col>

                  <Col lg={8} className="">
                    <h6 className="text-center mt-4 text-uppercase fw-bold">
                      Estado de su Producto
                    </h6>
                    <Box className="mb-5 mt-5 d-flex justify-content-center">
                      <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                          <Step key={step.label}>
                            <StepLabel>
                              {index === 0 && (
                                <FaPeopleCarry
                                  className="fs-1 me-3 "
                                  style={
                                    activeStep >= 0 && {
                                      color: COLORSTATE[activeStep],
                                    }
                                  }
                                />
                              )}
                              {index === 1 && (
                                <FaTools
                                  className="fs-1 me-3 "
                                  style={
                                    activeStep >= 1 && {
                                      color: COLORSTATE[activeStep],
                                    }
                                  }
                                />
                              )}
                              {index === 2 && (
                                <FaDollyFlatbed
                                  className="fs-1 me-3 "
                                  style={
                                    activeStep >= 2 && {
                                      color: COLORSTATE[activeStep],
                                    }
                                  }
                                />
                              )}
                              {index === 3 && (
                                <FaCalendarCheck
                                  className="fs-1 me-3 "
                                  style={
                                    activeStep >= 3 && {
                                      color: COLORSTATE[activeStep],
                                    }
                                  }
                                />
                              )}
                              {step.label}
                            </StepLabel>

                            <StepContent>
                              <Typography>{step.description}</Typography>
                            </StepContent>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>
                  </Col>
                </Row>
                <Row className="mt-5 d-flex justify-content-around ">
                  <Col lg={5} className="mb-5">
                    <Row className="border-bottom border-3 border-primary">
                      <Col>
                        <h6 className="text-center fw-bold">
                          INFORMACION DEL PRODUCTO
                        </h6>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="border-end border-3 text-center">
                        <FaDiceD6
                          style={{ fontSize: "80px", color: "#c59b6d" }}
                          className="mt-5"
                        />
                        <h6 className="fw-bold mt-5 mb-3 ">
                          Tipo de Producto:{" "}
                          <span style={{ color: "gray" }}>
                            {data.tipoProducto}
                          </span>
                        </h6>
                      </Col>
                      <Col className="d-flex flex-column justify-content-center">
                        <Row>
                          <h6 className="fw-bold mt-5 mb-5 text-center ">
                            Marca:{" "}
                            <span style={{ color: "gray" }}>
                              {data.marcaProducto}
                            </span>
                          </h6>
                        </Row>
                        <Row className="border-top border-3 ">
                          <h6 className="fw-bold mt-5 mb-5 text-center">
                            Modelo:{" "}
                            <span style={{ color: "gray" }}>
                              {data.modeloProducto}
                            </span>
                          </h6>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={5} className="mb-5">
                    <Row className="border-bottom border-3 border-primary">
                      <Col>
                        <h6 className="text-center fw-bold">
                          ACCESORIOS RECEPCIONADOS
                        </h6>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="d-flex justify-content-center">
                        <Grid item>
                          <List>
                            {data.custodia.length ? (
                              data.custodia.map((item, index) => (
                                <ListItem key={index}>
                                  <ListItemIcon>
                                    <FaCube className="text-primary" />
                                  </ListItemIcon>
                                  <ListItemText primary={item} />
                                </ListItem>
                              ))
                            ) : (
                              <ListItem>
                                <ListItemIcon>
                                  <FaCube className="text-primary" />
                                </ListItemIcon>
                                <ListItemText
                                  primary={"No ha dejado ningun objeto"}
                                />
                              </ListItem>
                            )}
                          </List>
                        </Grid>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="mt-5 d-flex justify-content-around ">
                  <Col lg={5} className="mb-5">
                    <Row className="border-bottom border-3 border-primary">
                      <Col>
                        <h6 className="text-center fw-bold">
                          INFORMACION DEL SERVICIO
                        </h6>
                      </Col>
                    </Row>
                    <Row>
                      <Row>
                        <Col className="text-center">
                          <h6 className="fw-bold mt-4">FALLAS</h6>
                          <Grid item>
                            <List>
                              {data.fallas.map((item, index) => (
                                <ListItem key={index}>
                                  <ListItemIcon>
                                    <ErrorOutlineIcon className="text-warning" />
                                  </ListItemIcon>
                                  <ListItemText primary={item} />
                                </ListItem>
                              ))}
                            </List>
                          </Grid>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="d-flex flex-column justify-content-center">
                          <h6 className="text-center fw-bold mt-4">SERVICIO</h6>
                          <Grid item>
                            <List>
                              {data.servicios.list.map((item, index) => (
                                <ListItem key={index}>
                                  <ListItemIcon>
                                    <SettingsApplicationsIcon className="text-info" />
                                  </ListItemIcon>
                                  <ListItemText primary={item.name} />
                                  <ListItemIcon>
                                    <FaLongArrowAltRight className="text-success" />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={new Intl.NumberFormat("es-PE", {
                                      style: "currency",
                                      currency: "PEN",
                                    }).format(item.precio)}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Grid>
                          <hr className="text-primary" />
                          <div className="d-flex justify-content-between">
                            <h6>Total:</h6>
                            <h6>
                              {new Intl.NumberFormat("es-PE", {
                                style: "currency",
                                currency: "PEN",
                              }).format(data.servicios.total)}
                            </h6>
                          </div>
                        </Col>
                      </Row>
                    </Row>
                  </Col>
                  <Col lg={5} className="mb-5">
                    <Row className="border-bottom border-3 border-primary">
                      <Col>
                        <h6 className="text-center fw-bold">OBSERVACIONES</h6>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="d-flex justify-content-center">
                        <Grid item>
                          <List>
                            {data.recomends.length ? (
                              data.recomends.map((item, index) => (
                                <ListItem key={index}>
                                  <ListItemIcon>
                                    <RemoveRedEyeIcon className="text-success" />
                                  </ListItemIcon>
                                  <ListItemText primary={item} />
                                </ListItem>
                              ))
                            ) : (
                              <ListItem>
                                <ListItemIcon>
                                  <RemoveRedEyeIcon className="text-success" />
                                </ListItemIcon>
                                <ListItemText
                                  primary={"No hay ninguna observacion"}
                                />
                              </ListItem>
                            )}
                          </List>
                        </Grid>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>
            )}
          </>
        )}
      </Container>
    </>
  )
}

export default ProductoState
