import { Modal, Button } from "react-bootstrap"

const ModalSignOut = ({ show, setShow, handleSignout }) => {
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title className="text-danger">Cerrar Sesion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Seguro que quiere cerrar sesion!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSignout}>
            Cerrar Sesion
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalSignOut
