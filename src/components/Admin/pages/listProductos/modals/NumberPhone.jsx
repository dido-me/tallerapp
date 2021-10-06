import { useState } from "react"
import { Modal, Row, Col } from "react-bootstrap"
import { Box, TextField, IconButton } from "@mui/material"
import * as React from "react"
import { LoadingButton } from "@mui/lab"
import { FaSave, FaTimes } from "react-icons/fa"
import { PhoneAndroid } from "@mui/icons-material"
import * as Yup from "yup"
import { useFormik } from "formik"
// Firebase
import { db } from "../../../../../firebase"
import { doc, updateDoc } from "firebase/firestore"

const validate = Yup.object({
  phoneNumber: Yup.string()
    .required("Ingrese un numero de celular")
    .matches(/^[0-9]{9}$/, "Ingrese un numero de celular valido."),
})

const NumberPhone = ({ show, handleCloseCell, phoneData, setDataModal }) => {
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      phoneNumber:
        phoneData.cliente.phoneNumber === undefined
          ? ""
          : phoneData.cliente.phoneNumber,
    },
    validationSchema: validate,
    onSubmit: async (data) => {
      setLoading(true)
      try {
        const cellCliente = doc(db, "registrosTaller", phoneData.uid)
        await updateDoc(cellCliente, {
          cliente: {
            ...phoneData.cliente,
            phoneNumber: data.phoneNumber,
          },
        })

        const updateCellArray = {
          ...phoneData,
          cliente: {
            ...phoneData.cliente,
            phoneNumber: data.phoneNumber,
          },
        }
        setDataModal(updateCellArray)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
      handleCloseCell()
    },
  })
  return (
    <>
      <Modal show={show} onHide={handleCloseCell} centered backdrop="static">
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header>
            <Modal.Title>Editando celular del cliente</Modal.Title>
            <IconButton
              aria-label="close"
              size="large"
              color="error"
              onClick={handleCloseCell}
              disabled={loading}
            >
              <FaTimes />
            </IconButton>
          </Modal.Header>
          <Modal.Body>
            <Row className="mt-3 mb-3 d-flex justify-content-center ">
              <Col lg={8} xs={10}>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <PhoneAndroid
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    fullWidth
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Numero de Celular"
                    variant="standard"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                  />
                </Box>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <LoadingButton
              type="submit"
              endIcon={<FaSave />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              Guardar Celular
            </LoadingButton>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default NumberPhone
