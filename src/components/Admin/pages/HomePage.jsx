import { useEffect } from "react"
import { Container, Row, Col, Card } from "react-bootstrap"

const HomePage = ({ setTitle }) => {
  useEffect(() => {
    localStorage.removeItem("cliente")
    const Title = () => {
      setTitle("Inicio")
    }
    Title()
  }, [])

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Body>
                <h4 className="text-center m-3">
                  BIENVENIDO A LA APP DEL TALLER 1.0 (Estamos en Desarrollo)
                  🙌🥳
                </h4>
                <h6 className="text-center">
                  Informacion o ayuda con Esteban!!
                </h6>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomePage
