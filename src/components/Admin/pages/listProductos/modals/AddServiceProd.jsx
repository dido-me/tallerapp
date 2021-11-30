import { useState } from "react"
import { Modal, Row, Col } from "react-bootstrap"
import { IconButton, Box, TextField, Alert } from "@mui/material"
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import { LoadingButton } from "@mui/lab"
import {
  FaSave,
  FaTimes,
  FaEdit,
  FaTrash,
  FaLongArrowAltRight,
  FaPlusCircle,
} from "react-icons/fa"
import { useFormik } from "formik"

// Firebase
import { db } from "../../../../../firebase"
import { doc, updateDoc } from "firebase/firestore"
// SweetAlert2
import Swal from "sweetalert2"

import * as Yup from "yup"

const validate = Yup.object({
  nameServicio: Yup.string().required("No ingreso ninguna Servicio."),
  costoServicio: Yup.string()
    .required("No ingreso ningun costo")
    .matches(/^[0-9]{0,6}(\.[0-9]{1,2})?$/, "Valor Incorrecto"),
})

export default function AddServiceProd({
  show,
  handleClose,
  data,
  setDataModal,
}) {
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState(data.servicios)
  const [idServicio, setIdServicio] = useState(null)
  const [modo, setModo] = useState(0)

  const formik = useFormik({
    initialValues: {
      nameServicio: "",
      costoServicio: "",
    },
    validationSchema: validate,
    onSubmit: (data) => {
      const submitHandle = () => ACTION[modo](data)
      submitHandle()
    },
  })

  const handleSave = async () => {
    try {
      setLoading(true)
      const servicioUpdate = doc(db, "registrosTaller", data.uid)
      await updateDoc(servicioUpdate, {
        servicios: {
          list: [...listData.list],
          total: listData.total,
        },
      })

      const updateServiciosArray = {
        ...data,
        servicios: {
          list: [...listData.list],
          total: listData.total,
        },
      }

      setDataModal(updateServiciosArray)
    } catch (error) {
      console.log(error)
    }
    setLoading(true)
    handleClose()
  }

  const handleEdit = (item, index) => {
    setModo(1)
    setIdServicio(index)
    formik.setFieldValue("nameServicio", item.name)
    formik.setFieldValue("costoServicio", item.precio)
  }

  const handleDelete = (id) => {
    if (listData.list.length > 1) {
      const arrayFiltrado = listData.list.filter((_, index) => index !== id)
      const preciosServicio = arrayFiltrado.map((item) => {
        return item.precio
      })

      const TotalDelete = preciosServicio.reduce((pre, next) => pre + next)
      setListData({ list: arrayFiltrado, total: TotalDelete })
    } else {
      Swal.fire("Debe de haber al menos un servicio registrada!", "", "warning")
    }
  }

  const ACTION = {
    0: (data) => {
      const arrayNew = {
        list: [
          ...listData.list,
          {
            name: data.nameServicio.toUpperCase(),
            precio: parseFloat(data.costoServicio),
          },
        ],

        total: listData.total + parseFloat(data.costoServicio),
      }
      setListData(arrayNew)
      formik.handleReset()
    },
    1: (data) => {
      const arrayEdit = listData.list.map((item, index) =>
        index === idServicio
          ? {
              name: data.nameServicio.toUpperCase(),
              precio: parseFloat(data.costoServicio),
            }
          : item
      )

      const preciosServicio = listData.list.map((item, index) =>
        index === idServicio
          ? parseFloat(data.costoServicio)
          : parseFloat(item.precio)
      )

      const TotalUpdate = preciosServicio.reduce((pre, next) => pre + next)

      setListData({ list: arrayEdit, total: TotalUpdate })
      formik.handleReset()
      setModo(0)
      setIdServicio(null)
    },
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header>
          <Modal.Title>Servicios</Modal.Title>
          <IconButton
            aria-label="close"
            size="large"
            color="error"
            onClick={handleClose}
            disabled={loading}
          >
            <FaTimes />
          </IconButton>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <Row className="mt-3 mb-3 d-flex justify-content-center ">
              <Col lg={10}>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <MiscellaneousServicesIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    style={{ color: "#198754" }}
                  />
                  <TextField
                    fullWidth
                    id="nameServicio"
                    name="nameServicio"
                    label="Agregar Servicio"
                    variant="standard"
                    value={formik.values.nameServicio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.nameServicio &&
                      Boolean(formik.errors.nameServicio)
                    }
                    helperText={
                      formik.touched.nameServicio && formik.errors.nameServicio
                    }
                  />
                </Box>
              </Col>
            </Row>
            <Row className="mt-3 mb-3 d-flex justify-content-center ">
              <Col lg={10}>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <MonetizationOnIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    style={{ color: "#198754" }}
                  />
                  <TextField
                    fullWidth
                    id="costoServicio"
                    name="costoServicio"
                    label="Agregar Costo del Servicio"
                    variant="standard"
                    value={formik.values.costoServicio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.costoServicio &&
                      Boolean(formik.errors.costoServicio)
                    }
                    helperText={
                      formik.touched.costoServicio &&
                      formik.errors.costoServicio
                    }
                  />
                </Box>
              </Col>
            </Row>
            <Row className="mt-3 mb-3 d-flex justify-content-center ">
              <Col lg={1}>
                <IconButton aria-label="add" size="large" type="submit">
                  {modo === 0 ? (
                    <FaPlusCircle style={{ color: "#198753" }} />
                  ) : (
                    <FaEdit style={{ color: "#ffbe0b" }} />
                  )}
                </IconButton>
              </Col>
            </Row>
          </form>
          <Row>
            <Col className="mt-3 mb-3">
              {listData.list.length ? (
                <ul>
                  {listData.list.map((item, index) => (
                    <li key={index}>
                      <Row>
                        <Col>
                          {item.name}
                          <FaLongArrowAltRight
                            style={{ fontSize: "30px", color: "#198753" }}
                            className="ms-2 me-2"
                          />
                          {new Intl.NumberFormat("es-PE", {
                            style: "currency",
                            currency: "PEN",
                          }).format(item.precio)}
                        </Col>
                        <Col lg={3} className="d-flex justify-content-center">
                          <IconButton
                            aria-label="delete"
                            size="small"
                            color="info"
                            onClick={() => {
                              handleEdit(item, index)
                            }}
                          >
                            <FaEdit />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            size="small"
                            color="error"
                            onClick={() => {
                              handleDelete(index)
                            }}
                          >
                            <FaTrash />
                          </IconButton>
                        </Col>
                      </Row>
                    </li>
                  ))}
                </ul>
              ) : (
                <Alert severity="warning">NO AGREGO NINGUNA SERVICIO!</Alert>
              )}
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col
              lg={11}
              className="mt-3 mb-3 border-success border-top d-flex justify-content-end"
            >
              <h6 className="mt-3">
                Total{": "}
                {new Intl.NumberFormat("es-PE", {
                  style: "currency",
                  currency: "PEN",
                }).format(listData.total)}
              </h6>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <LoadingButton
            endIcon={<FaSave />}
            onClick={handleSave}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            Guardar
          </LoadingButton>
        </Modal.Footer>
      </Modal>
    </>
  )
}
