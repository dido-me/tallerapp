import { Navbar, Container, Nav, Image } from "react-bootstrap"
import logo from "../../../assets/img/logoWhite.png"
import { NavLink } from "react-router-dom"

const NavbarPublic = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <NavLink exact to="/">
              <Image src={logo} fluid width="200px" />
            </NavLink>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={NavLink}
                to="/public/buscador"
                className="fw-bold fs-3 text-uppercase"
              >
                Buscar
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/login"
                className="fw-bold fs-3 text-uppercase"
              >
                Intranet
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarPublic
