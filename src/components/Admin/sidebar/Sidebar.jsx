import logo from "../../../assets/img/logo.svg"
import { FaBox, FaHome, FaClipboardList } from "react-icons/fa"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
  return (
    <>
      <div id="sidebar-wrapper">
        <div className="sidebar-heading text-center py-4  fs-4 ">
          <img src={logo} className="img-fluid" alt="logo" width="50" />
        </div>

        <div className="list-group list-group-flush my-3">
          <NavLink
            exact
            to="/admin"
            className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
          >
            <FaHome className="me-2" />
            Inicio
          </NavLink>

          <NavLink
            exact
            to="/admin/listRegistro"
            className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
          >
            <FaClipboardList className="me-2" />
            Lista de Registros
          </NavLink>

          <NavLink
            exact
            to="/admin/registroProducto"
            className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
          >
            <FaBox className="me-2" />
            Registro de Productos
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Sidebar
