import { useState } from "react"
import { FaBars, FaSignOutAlt, FaUserAstronaut } from "react-icons/fa"
import { Button, Menu, MenuItem } from "@mui/material"
import { Col } from "react-bootstrap"
import ModalSignOut from "./ModalSignOut"
import { Link, withRouter } from "react-router-dom"
import { useDispatch } from "react-redux"

// ========================================
import { signoutAction } from "../../../redux/usuarioDucks"

const Navbar = ({ title, history, usuario }) => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const toogle = () => {
    const el = document.getElementById("wrapper")
    el.classList.toggle("toggled")
  }

  const handleShow = () => setShow(true)
  const handleSignout = () => {
    dispatch(signoutAction())
    setShow(false)
    history.push("/login")
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white py-4 px-4 d-flex justify-content-between"
      id="navbar-admin"
    >
      <Col>
        <div className="d-flex align-items-center" onClick={toogle}>
          <i className="primary-text fs-4 me-3" id="menu-toggle">
            <FaBars />
          </i>
          <h4 className="m-0">{title}</h4>
        </div>
      </Col>

      <Col className="d-flex justify-content-end">
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <span id="nameAvatar">
            {usuario.nombres} {usuario.apellidos}
          </span>
          <div
            className="ms-2"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#0077b6",
              overflow: "hidden",
              borderRadius: "35px",
            }}
          >
            <img
              src={usuario.photoUrl}
              alt="avatar"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Link to="/admin/profile" className="text-decoration-none text-black">
            <MenuItem onClick={handleClose}>
              <FaUserAstronaut className="me-2" />
              Perfil
            </MenuItem>
          </Link>
          <MenuItem onClick={handleShow}>
            <FaSignOutAlt className="me-2" />
            Cerrar Sesion
          </MenuItem>
        </Menu>
      </Col>
      <ModalSignOut
        show={show}
        setShow={setShow}
        handleSignout={handleSignout}
      />
    </nav>
  )
}

export default withRouter(Navbar)
