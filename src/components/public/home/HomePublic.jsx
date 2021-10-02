import { Container, Row, Col } from "react-bootstrap"
import imgMain from "../../../assets/img/homeImg.png"
import { Button } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { Link } from "react-router-dom"

const HomePublic = () => {
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col
            lg={6}
            xs={12}
            className="text-center d-flex flex-column justify-content-center"
          >
            <h3 className="mt-5">HOLA 👋🥳</h3>
            <h4>
              Bienvenido a <span className="text-primary">TALLER</span> una web
              para hacer seguimiento del estado en el que se encuentra tu
              producto!
            </h4>
            <Link to="/public/buscador">
              <Button
                variant="contained"
                className="mt-3"
                endIcon={<SearchIcon />}
              >
                Buscar
              </Button>
            </Link>
          </Col>
          <Col lg={6} xs={12}>
            <img
              src={imgMain}
              alt="Imagen Principal"
              className="img-fluid"
              width="500px"
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomePublic
