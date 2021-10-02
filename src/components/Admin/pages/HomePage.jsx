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
              <Card.Header>Home</Card.Header>
              <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional
                  content.
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
