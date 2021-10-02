import { useEffect, useState } from "react"
import { FaBars, FaSignOutAlt, FaUserAstronaut } from "react-icons/fa"
import { Button, Menu, MenuItem } from "@mui/material"
import { Col } from "react-bootstrap"
import ModalSignOut from "./ModalSignOut"
import { useDispatch } from "react-redux"

// ========================================
import { signoutAction } from "../../../redux/usuarioDucks"

const Navbar = ({ title }) => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const [user, setUser] = useState({})
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
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("usuario"))
    setUser(data)
  }, [])

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
            {user.nombres} {user.apellidos}
          </span>
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            className="ms-2 rounded-circle"
            alt="avatar"
            width="50"
          />
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
          <MenuItem onClick={handleClose}>
            <FaUserAstronaut className="me-2" />
            Perfil
          </MenuItem>
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

export default Navbar
