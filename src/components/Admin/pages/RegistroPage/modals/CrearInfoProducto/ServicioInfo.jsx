import React from "react"
import { Row, Col, Card, Alert } from "react-bootstrap"
import { TextField, InputAdornment, Button } from "@mui/material"
import { SettingsApplications } from "@mui/icons-material"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"

const ServicioModal = ({ formik }) => {
  const [errors, setErrors] = React.useState({})
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState("")
  const [listServicio, setListServicio] = React.useState({
    list: [],
    total: 0,
  })
  const [nombreServicio, setNombreServicio] = React.useState("")
  const [precioServicio, setPrecioServicio] = React.useState("")

  // Editar Servicio
  const editar = (item, index) => {
    setModoEdicion(true)
    setNombreServicio(item.name)
    setPrecioServicio(String(item.precio))
    setId(index)
  }

  const editarServicio = () => {
    if (!nombreServicio.trim()) {
      setErrors({ name: "Campo Vacio" })
      return
    }
    if (!precioServicio.trim()) {
      setErrors({ precio: "Campo Vacio" })
      return
    }

    if (!/^[0-9]{0,6}(\.[0-9]{1,2})?$/.test(precioServicio.trim())) {
      setErrors({ precio: "Solo numeros" })
      return
    }

    const arrayEditado = listServicio.list.map((item, index) =>
      index === id
        ? {
            name: nombreServicio.toUpperCase(),
            precio: parseFloat(precioServicio),
          }
        : item
    )

    const objEditado = listServicio.list.filter((_, index) => index === id)

    const totalEditado = listServicio.total - objEditado[0].precio

    formik.setFieldValue("servicios", {
      list: arrayEditado,
      total: parseFloat(totalEditado) + parseFloat(precioServicio),
    })
    setListServicio({
      list: arrayEditado,
      total: parseFloat(totalEditado) + parseFloat(precioServicio),
    })
    setModoEdicion(false)
    setNombreServicio("")
    setPrecioServicio("")
    setId("")
    setErrors({})
  }

  // Eliminar Custodia
  const eliminarServicio = (id) => {
    const arrayFiltrado = listServicio.list.filter((_, index) => index !== id)

    const objEliminado = listServicio.list.filter((_, index) => index === id)

    formik.setFieldValue("servicios", {
      list: arrayFiltrado,

      total: listServicio.total - objEliminado[0].precio,
    })

    setListServicio({
      list: arrayFiltrado,
      total: listServicio.total - objEliminado[0].precio,
    })
  }

  // Agregar Servicio
  const agregarServicio = () => {
    if (!nombreServicio.trim()) {
      setErrors({ name: "Campo Vacio" })
      return
    }
    if (!precioServicio.trim()) {
      setErrors({ precio: "Campo Vacio" })
      return
    }

    if (!/^[0-9]{0,6}(\.[0-9]{1,2})?$/.test(precioServicio.trim())) {
      setErrors({ precio: "Solo numeros" })
      return
    }

    const number = parseFloat(precioServicio)

    const total = listServicio.total ? listServicio.total : 0

    setListServicio({
      list: [
        ...listServicio.list,
        {
          name: nombreServicio.toUpperCase(),
          precio: parseFloat(precioServicio),
        },
      ],

      total: total + number,
    })
    formik.setFieldValue("servicios", {
      list: [
        ...listServicio.list,
        {
          name: nombreServicio.toUpperCase(),
          precio: parseFloat(precioServicio),
        },
      ],

      total: total + number,
    })

    setNombreServicio("")
    setPrecioServicio("")
    setErrors({})
  }
  return (
    <>
      <Row className="mt-3">
        <Col sm={9} className="mt-3">
          <TextField
            fullWidth
            error={Boolean(errors.name)}
            helperText={Boolean(errors.name) && errors.name}
            id="input-with-icon-textfield"
            label="NOMBRE DEL SERVICIO"
            value={nombreServicio}
            onChange={(e) => setNombreServicio(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SettingsApplications color="primary" />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </Col>
        <Col sm={3} className="mt-3">
          <TextField
            fullWidth
            helperText={Boolean(errors.precio) && errors.precio}
            label="PRECIO"
            error={Boolean(errors.precio)}
            id="precioServicio"
            value={precioServicio}
            onChange={(e) => setPrecioServicio(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className="text-success">S/</span>
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </Col>
      </Row>
      <Row className="mt-4 ">
        <Col sm={12} className="d-flex justify-content-end">
          {modoEdicion ? (
            <Button
              variant="contained"
              color="info"
              onClick={() => editarServicio()}
              startIcon={<FaEdit />}
            >
              Editar
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={() => agregarServicio()}
              startIcon={<FaPlus />}
            >
              Agregar
            </Button>
          )}
        </Col>
      </Row>
      <hr />
      <h4>Lista de Servicios</h4>
      <Row className="mt-3">
        {listServicio.list.length ? (
          listServicio.list.map((item, index) => (
            <Col sm={12} className="mt-3" key={index}>
              <Card>
                <Card.Body>
                  <Row className="text-dark">
                    <Col sm={9}>{item.name}</Col>
                    <Col sm={3}>
                      {new Intl.NumberFormat("es-PE", {
                        style: "currency",
                        currency: "PEN",
                      }).format(item.precio)}
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-info btn-sm me-3"
                    onClick={() => editar(item, index)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-danger btn-sm "
                    type="button"
                    onClick={() => eliminarServicio(index)}
                    disabled={modoEdicion && true}
                  >
                    <FaTrash />
                  </button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col sm={12}>
            <Alert variant="warning" className="text-center">
              No ha registrado ningun servicio (Obligatorio)
            </Alert>
          </Col>
        )}
      </Row>
      <hr />
      <Row>
        <Col sm={6}>
          <h4>Total</h4>
        </Col>
        <Col sm={6} className="text-end text-dark">
          {new Intl.NumberFormat("es-PE", {
            style: "currency",
            currency: "PEN",
          }).format(listServicio.total)}
        </Col>
      </Row>
    </>
  )
}

export default ServicioModal
