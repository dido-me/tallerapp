import React from "react"
import {
  Row,
  Col,
  InputGroup,
  Button,
  FormControl,
  Form,
  ListGroup,
  Alert,
} from "react-bootstrap"
import { FaEdit, FaPlus, FaThumbtack, FaTrash } from "react-icons/fa"

const RecomendacionesModal = ({ formik }) => {
  const [error, setError] = React.useState(null)
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState("")
  const [listRecomend, setListRecomend] = React.useState([])
  const [recomend, setRecomend] = React.useState("")

  // Editar Objeto de Recomend
  const editar = (item, index) => {
    setModoEdicion(true)
    setRecomend(item)
    setId(index)
  }

  const editarRecomend = () => {
    if (!recomend.trim()) {
      setError("Campo Vacio")
      return
    }
    const arrayEditado = listRecomend.map((item, index) =>
      index === id ? recomend.toUpperCase() : item
    )
    formik.setFieldValue("recomends", arrayEditado)
    setListRecomend(arrayEditado)
    setModoEdicion(false)
    setRecomend("")
    setId("")
    setError(null)
  }

  // Eliminar Recomend
  const eliminarRecomend = (id) => {
    const arrayFiltrado = listRecomend.filter((_, index) => index !== id)
    formik.setFieldValue("recomends", arrayFiltrado)
    setListRecomend(arrayFiltrado)
  }

  // Agregar Recomend
  const agregarRecomend = () => {
    if (!recomend.trim()) {
      setError("Campo Vacio")
      return
    }
    setListRecomend([...listRecomend, recomend.toUpperCase()])
    formik.setFieldValue("recomends", [
      ...formik.values.recomends,
      recomend.toUpperCase(),
    ])
    setRecomend("")
    setError(null)
  }
  return (
    <>
      <Row className="mt-4 text-center">
        <Col sm={12}>
          <h6 className="text-info">
            * Puede agregar recomendaciones al producto. (Opcional)
          </h6>
        </Col>
      </Row>
      <Row className="mt-4 d-flex justify-content-center">
        <Col sm={10}>
          <InputGroup className="mb-3">
            <FormControl
              onChange={(e) => setRecomend(e.target.value)}
              value={recomend}
              placeholder="Agregar Recomendacion"
              aria-label="Agregar Recomendacion"
              aria-describedby="inputAgregar"
              className={error && "border border-danger"}
            />

            {modoEdicion ? (
              <Button
                variant="outline-info"
                id="inputAgregar"
                onClick={() => editarRecomend()}
              >
                <FaEdit />
              </Button>
            ) : (
              <Button
                variant="outline-success"
                id="inputAgregar"
                onClick={() => agregarRecomend()}
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
            {listRecomend.length ? (
              listRecomend.map((item, index) => (
                <ListGroup.Item key={index} className="border rounded">
                  <Row>
                    <Col sm={6}>
                      <FaThumbtack className="me-2 text-success" />
                      {item}
                    </Col>
                    <Col sm={6}>
                      <div className="d-flex flex-row-reverse bd-highlight">
                        <button
                          className="btn btn-danger btn-sm"
                          type="button"
                          onClick={() => eliminarRecomend(index)}
                          disabled={modoEdicion && true}
                        >
                          <FaTrash />
                        </button>
                        <button
                          type="button"
                          className="btn btn-info btn-sm me-3 "
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

export default RecomendacionesModal
