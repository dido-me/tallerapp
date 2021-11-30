import React from "react"
import {
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  ListGroup,
  Form,
  Alert,
} from "react-bootstrap"
import { FaEdit, FaExclamationCircle, FaPlus, FaTrash } from "react-icons/fa"

const FallasModal = ({ formik }) => {
  const [error, setError] = React.useState(null)
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState("")
  const [fallas, setFallas] = React.useState([])
  const [falla, setFalla] = React.useState("")

  // Editar Falla
  const editar = (item, index) => {
    setModoEdicion(true)
    setFalla(item)
    setId(index)
  }

  const editarFalla = () => {
    if (!falla.trim()) {
      setError("Campo Vacio")
      return
    }
    const arrayEditado = fallas.map((item, index) =>
      index === id ? falla.toUpperCase() : item
    )
    formik.setFieldValue("fallas", arrayEditado)
    setFallas(arrayEditado)
    setModoEdicion(false)
    setFalla("")
    setId("")
    setError(null)
  }

  // Eliminar Fallas
  const eliminarfalla = (id) => {
    const arrayFiltrado = fallas.filter((_, index) => index !== id)
    formik.setFieldValue("fallas", arrayFiltrado)
    setFallas(arrayFiltrado)
  }
  // Agregar Falla
  const agregarFalla = () => {
    if (!falla.trim()) {
      console.log("Campo Vacio")
      return
    }
    setFallas([...fallas, falla.toUpperCase()])
    formik.setFieldValue("fallas", [
      ...formik.values.fallas,
      falla.toUpperCase(),
    ])
    setFalla("")
  }

  return (
    <>
      <Row className="mt-4 d-flex justify-content-center">
        <Col sm={10}>
          <InputGroup className="mb-3">
            <FormControl
              onChange={(e) => setFalla(e.target.value)}
              value={falla}
              placeholder="Agregar falla del producto"
              aria-label="Agregar Fallas"
              aria-describedby="inputAgregar"
            />
            {modoEdicion ? (
              <Button
                variant="outline-info"
                id="inputAgregar"
                onClick={() => editarFalla()}
              >
                <FaEdit />
              </Button>
            ) : (
              <Button
                variant="outline-success"
                id="inputAgregar"
                onClick={() => agregarFalla()}
              >
                <FaPlus />
              </Button>
            )}
          </InputGroup>
          {error && <Form.Text className="text-danger ms-3">{error}</Form.Text>}
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col sm={12}>
          <ListGroup variant="flush" className="mt-3">
            {fallas.length ? (
              fallas.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col sm={6}>
                      <FaExclamationCircle
                        className="text-warning me-2 "
                        style={{ fontSize: "18px" }}
                      />
                      {item}
                    </Col>
                    <Col sm={6}>
                      <div className="d-flex flex-row-reverse bd-highlight">
                        <button
                          className="btn btn-danger btn-sm"
                          type="button"
                          onClick={() => eliminarfalla(index)}
                          disabled={modoEdicion && true}
                        >
                          <FaTrash />
                        </button>
                        <button
                          type="button"
                          className="btn btn-info btn-sm me-2 "
                          onClick={() => editar(item, index)}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            ) : (
              <Alert variant="warning" className="text-center">
                No ha registrado ninguna falla (Obligatorio)
              </Alert>
            )}
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default FallasModal
