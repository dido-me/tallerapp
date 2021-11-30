import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Image, Spinner } from "react-bootstrap"
import { editarFotoAction } from "../../../../redux/usuarioDucks"
import { useDispatch, useSelector } from "react-redux"

export default function index({ setTitle, usuario }) {
  const [error, setError] = useState(false)
  const loading = useSelector((store) => store.usuario.loading)
  const dispatch = useDispatch()

  const seleccionarArchivo = (imagen) => {
    const imagenUser = imagen.target.files[0]

    if (imagenUser === undefined) {
      console.log("No se selecciono imagen")
      return
    }

    if (
      imagenUser.type === "image/jpeg" ||
      imagenUser.type === "image/png" ||
      imagenUser.type === "image/jpg"
    ) {
      dispatch(editarFotoAction(imagenUser))
      setError(false)
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    const Title = () => {
      setTitle("Perfil del Usuario")
    }
    Title()
  }, [])
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Header as="h5">Informacion del Usuario</Card.Header>
              <Card.Body>
                <Container className="mb-5">
                  <Row>
                    <Col className="d-flex justify-content-center">
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                          width: "300px",
                          height: "300px",
                          backgroundColor: "whitesmoke",
                          overflow: "hidden",
                          borderRadius: "150px",
                        }}
                      >
                        {loading ? (
                          <Spinner
                            animation="grow"
                            style={{ width: "200px", height: "200px" }}
                          />
                        ) : (
                          <Image
                            src={usuario.photoUrl}
                            alt="Foto de Perfil"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col className="text-center">
                      <h4>
                        Nombres y Apellidos:{" "}
                        <span className="text-black-50">
                          {usuario.nombres} {usuario.apellidos}
                        </span>
                      </h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <h4>
                        Correo:{" "}
                        <span className="text-black-50">{usuario.email}</span>
                      </h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <h4>
                        Empresa:{" "}
                        <span className="text-black-50">
                          {usuario.empresa === "EF" ? "EF SYSTEMAS" : "SAYOR"}
                        </span>
                      </h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {error && (
                        <div className="alert alert-warning mt-2">
                          Solo archivos .png o .jpge
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="input-group mb-3 d-flex justify-content-center">
                        <label
                          className="btn btn-dark mt-2"
                          htmlFor="subirImagen"
                        >
                          Actualizar Imagen
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={(e) => seleccionarArchivo(e)}
                          id="subirImagen"
                          style={{ display: "none" }}
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
