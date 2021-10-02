import { useEffect, useRef } from "react"
import { Container, Row, Col } from "react-bootstrap"
import Lottie from "lottie-web"
import animationData from "./loading.json"

const Loading = () => {
  const container = useRef(null)

  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    })
  }, [])

  return (
    <>
      <Container
        className="d-flex justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Row className="w-75">
          <Col ref={container}></Col>
        </Row>
      </Container>
    </>
  )
}

export default Loading
