import { useState } from "react"
import { Modal, Row, Col } from "react-bootstrap"
import { IconButton, Box, TextField, Alert } from "@mui/material"
import ErrorIcon from "@mui/icons-material/Error"
import { LoadingButton } from "@mui/lab"
import { FaSave, FaTimes, FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa"
import { useFormik } from "formik"
// Firebase
import { db } from "../../../../../firebase"
import { doc, updateDoc } from "firebase/firestore"
// SweetAlert2
import Swal from "sweetalert2"

import * as Yup from "yup"

const validate = Yup.object({
  nameFalla: Yup.string().required("No ingreso ninguna falla."),
})

const AddErrorsProd = ({ show, handleClose, data, setDataModal }) => {
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState(data.fallas)
  const [idFalla, setIdFalla] = useState(null)
  const [modo, setModo] = useState(0)

  const formik = useFormik({
    initialValues: {
      nameFalla: "",
    },
    validationSchema: validate,
    onSubmit: (data) => {
      const submitHandle = () => ACTION[modo](data)
      submitHandle()
    },
  })

  const handleSaveFallas = async () => {
    try {
      setLoading(true)
      const fallasUpdate = doc(db, "registrosTaller", data.uid)
      await updateDoc(fallasUpdate, {
        fallas: [...listData],
      })

      const updateErrorsArray = {
        ...data,
        fallas: [...listData],
      }

      setDataModal(updateErrorsArray)
    } catch (error) {
      console.log(error)
    }
    setLoading(true)
    handleClose()
  }

  const handleEdit = (item, index) => {
    setModo(1)
    setIdFalla(index)
    formik.setFieldValue("nameFalla", item)
  }

  const handleDelete = (id) => {
    if (listData.length > 1) {
      const arrayFiltrado = listData.filter((_, index) => index !== id)
      setListData(arrayFiltrado)
    } else {
      Swal.fire("Debe de haber al menos una falla registrada!", "", "warning")
    }
  }

  const ACTION = {
    0: (data) => {
      const arrayNew = [...listData, data.nameFalla.toUpperCase()]
      setListData(arrayNew)
      formik.handleReset()
    },
    1: (data) => {
      const arrayEdit = listData.map((item, index) =>
        index === idFalla ? data.nameFalla.toUpperCase() : item
      )
      setListData(arrayEdit)
      formik.handleReset()
      setModo(0)
      setIdFalla(null)
    },
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header>
          <Modal.Title>Agregar Fallas</Modal.Title>
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
              <Col lg={8} xs={10}>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <ErrorIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    style={{ color: "#ffb703" }}
                  />
                  <TextField
                    fullWidth
                    id="nameFalla"
                    name="nameFalla"
                    label="Agregar falla"
                    variant="standard"
                    value={formik.values.nameFalla}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.nameFalla &&
                      Boolean(formik.errors.nameFalla)
                    }
                    helperText={
                      formik.touched.nameFalla && formik.errors.nameFalla
                    }
                  />
                </Box>
              </Col>
              <Col lg={2} xs={2}>
                <IconButton
                  aria-label="add"
                  size="large"
                  className="d-flex  justify-content-end "
                  type="submit"
                >
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
              {listData.length ? (
                <ul>
                  {listData.map((item, index) => (
                    <li key={index}>
                      <Row>
                        <Col>{item}</Col>
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
                <Alert severity="warning">NO AGREGO NINGUNA FALLA!</Alert>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <LoadingButton
            endIcon={<FaSave />}
            onClick={handleSaveFallas}
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

export default AddErrorsProd
