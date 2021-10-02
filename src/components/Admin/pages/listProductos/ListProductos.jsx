import { useEffect, useState, useMemo } from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import { CircularProgress, IconButton } from "@mui/material"
import FilterComponent from "./FilterComponent"
import { FaCircle, FaDiagnoses } from "react-icons/fa"

import DataTable from "react-data-table-component"

// Firebase
import { collection, getDocs, doc, getDoc } from "firebase/firestore"
import { db } from "../../../../firebase"
import ModalProduct from "./ModalProduct"

const ListProductos = ({ setTitle }) => {
  const [data, setData] = useState([])
  const [index, setIndex] = useState("")
  const [show, setShow] = useState(false)
  const [dataModal, setDataModal] = useState({})
  const [spinnerModal, setSpinnerModal] = useState(false)
  const [loadingIndex, setLoadingIndex] = useState("")

  const handleClose = () => {
    setShow(false)
    setDataModal({})
  }

  const dataOpen = async (codigo, index) => {
    setLoadingIndex(index)
    setSpinnerModal(true)
    setShow(true)
    const docRef = doc(db, "registrosTaller", codigo)
    const docSnap = await getDoc(docRef)
    setDataModal(docSnap.data())
    setIndex(index)
    setSpinnerModal(false)
  }

  const [pending, setPending] = useState(false)
  const [filterText, setFilterText] = useState("")
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
  const filteredItems = data.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  )

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText("")
      }
    }

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    )
  }, [filterText, resetPaginationToggle])

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  }

  const formatoPeru = new Intl.DateTimeFormat("es-PE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  })

  const COLORSTATE = {
    0: "#ffbe0b",
    1: "#fb5607",
    2: "#8338ec",
    3: "#3a86ff",
  }

  const columns = [
    {
      cell: (row, index) =>
        spinnerModal ? (
          <>
            {index === loadingIndex ? (
              <CircularProgress color="success" />
            ) : (
              <IconButton aria-label="changeState" disabled>
                <FaDiagnoses />
              </IconButton>
            )}
          </>
        ) : (
          <IconButton
            aria-label="changeState"
            color="info"
            onClick={() => dataOpen(row.uid, index)}
          >
            <FaDiagnoses />
          </IconButton>
        ),
      allowOverflow: true,
      button: true,
      width: "56px",
    },
    {
      name: "Estado",
      cell: (row) => (
        <FaCircle style={{ color: COLORSTATE[row.estado] }} className="fs-4" />
      ),
      width: "80px",
      center: true,
    },
    {
      name: "Empresa",
      selector: (row) => row.empresa,
      center: true,
      sortable: true,
    },
    {
      name: "UID",
      selector: (row) => row.uid,
    },
    {
      name: "DNI",
      selector: (row) => row.dni,
    },
    {
      name: "Cliente",
      selector: (row) => row.cliente,
    },
    {
      name: "Fecha Reg.",
      selector: (row) => formatoPeru.format(row.fecha),
      sortable: true,
    },
    {
      name: "Producto",
      selector: (row) => row.producto,
    },
  ]

  useEffect(() => {
    localStorage.removeItem("cliente")
    const Title = () => {
      setTitle("Lista De Productos Registrados")
    }
    const loadData = async () => {
      setPending(true)
      const querySnapshot = await getDocs(collection(db, "registrosTaller"))
      const arrayData = querySnapshot.docs.map((doc) => ({
        uid: doc.data().uid,
        dni: doc.data().cliente.DNI,
        cliente: doc.data().cliente.fullName,
        fecha: doc.data().fechaRegistro,
        producto: doc.data().tipoProducto,
        estado: doc.data().stateProducto,
        empresa: doc.data().personal.empresa,
      }))
      setData(arrayData)
      setPending(false)
    }
    loadData()
    Title()
  }, [])
  return (
    <>
      {Object.entries(dataModal).length === 0 ? null : (
        <ModalProduct
          show={show}
          handleClose={handleClose}
          dataModal={dataModal}
          setDataModal={setDataModal}
          index={index}
          datafull={data}
          setData={setData}
        />
      )}
      <Container className="mt-5">
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Header>
                <h3 className="text-primary">LISTA DE PRODUCTOS</h3>
              </Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Col>
                    <h4>Estados:</h4>
                  </Col>
                </Row>

                <Row className="mb-5 ms-5">
                  <Col lg={2} className="ms-5">
                    <FaCircle style={{ color: "#ffbe0b" }} className="fs-4" />
                    <span className="ms-2">Registrado</span>
                  </Col>
                  <Col lg={2} className="ms-5">
                    <FaCircle style={{ color: "#fb5607" }} className="fs-4" />
                    <span className="ms-2">En Revision</span>
                  </Col>
                  <Col lg={2} className="ms-5">
                    <FaCircle style={{ color: "#8338ec" }} className="fs-4" />
                    <span className="ms-2">Terminado</span>
                  </Col>
                  <Col lg={2} className="ms-5">
                    <FaCircle style={{ color: "#3a86ff" }} className="fs-4" />
                    <span className="ms-2">Entregado</span>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <DataTable
                      columns={columns}
                      data={filteredItems}
                      pagination
                      paginationResetDefaultPage={resetPaginationToggle}
                      paginationComponentOptions={paginationComponentOptions}
                      subHeader
                      progressPending={pending}
                      progressComponent={<CircularProgress className="m-5" />}
                      subHeaderComponent={subHeaderComponentMemo}
                      persistTableHead
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ListProductos
