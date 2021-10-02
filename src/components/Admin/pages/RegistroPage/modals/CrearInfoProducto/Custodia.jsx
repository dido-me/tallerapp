import React from "react"
import {
  InputGroup,
  FormControl,
  Button,
  Row,
  Col,
  ListGroup,
  Form,
  Alert,
} from "react-bootstrap"
import { FaEdit, FaPlus, FaCube, FaTrash } from "react-icons/fa"

const CustodiaModel = ({ formik }) => {
  const [error, setError] = React.useState(null)
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState("")
  const [objetos, setObjetos] = React.useState([])
  const [obj, setObj] = React.useState("")

  // Editar Objeto de custodia
  const editar = (item, index) => {
    setModoEdicion(true)
    setObj(item)
    setId(index)
  }

  const editarObj = () => {
    if (!obj.trim()) {
      setError("Campo Vacio")
      return
    }
    const arrayEditado = objetos.map((item, index) =>
      index === id ? obj.toUpperCase() : item
    )
    formik.setFieldValue("custodia", arrayEditado)
    setObjetos(arrayEditado)
    setModoEdicion(false)
    setObj("")
    setId("")
    setError(null)
  }

  // Eliminar Custodia
  const eliminarObj = (id) => {
    const arrayFiltrado = objetos.filter((_, index) => index !== id)
    formik.setFieldValue("custodia", arrayFiltrado)
    setObjetos(arrayFiltrado)
  }

  // Agregar Custodia
  const agregarCustodia = () => {
    if (!obj.trim()) {
      setError("Campo Vacio")
      return
    }
    setObjetos([...objetos, obj.toUpperCase()])
    formik.setFieldValue("custodia", [
      ...formik.values.custodia,
      obj.toUpperCase(),
    ])
    setObj("")
    setError(null)
  }
  return (
    <>
      <Row className="mt-4 text-center">
        <Col sm={12}>
          <h6 className="text-info">
            * Agregue objetos que el cliente esta dejando con el producto.
            (Opcional)
          </h6>
        </Col>
      </Row>
      <Row className="mt-4 d-flex justify-content-center">
        <Col sm={10}>
          <InputGroup className="mb-3">
            <FormControl
              onChange={(e) => setObj(e.target.value)}
              value={obj}
              placeholder="Agregar objeto"
              aria-label="Agregar Objetos"
              aria-describedby="inputAgregar"
              className={error && "border border-danger"}
            />

            {modoEdicion ? (
              <Button
                variant="outline-info"
                id="inputAgregar"
                onClick={() => editarObj()}
              >
                <FaEdit />
              </Button>
            ) : (
              <Button
                variant="outline-success"
                id="inputAgregar"
                onClick={() => agregarCustodia()}
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
            {objetos.length ? (
              objetos.map((item, index) => (
                <ListGroup.Item key={index} className="border rounded">
                  <Row>
                    <Col sm={6}>
                      <FaCube className="me-2 text-success" />
                      {item}
                    </Col>
                    <Col sm={6}>
                      <div className="d-flex flex-row-reverse bd-highlight">
                        <button
                          className="btn btn-danger btn-sm"
                          type="button"
                          onClick={() => eliminarObj(index)}
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
                No ha registrado ningun objeto que este dejando el cliente.
              </Alert>
            )}
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default CustodiaModel
