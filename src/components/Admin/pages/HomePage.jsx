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
                <Card.Title className="text-center">
                  BIENVENIDO A LA APP DEL TALLER 1.0 (Esteremos en Desarrollo)
                  🙌🥳{" "}
                </Card.Title>
                <Card.Text>
                  <Container>
                    <Row>
                      <Col className="text-center">
                        <h6>Cualquier cosa avisan a ESTEBAN!!</h6>
                      </Col>
                    </Row>
                  </Container>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomePage
