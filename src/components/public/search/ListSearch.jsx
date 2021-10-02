import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../../firebase"
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap"
import { CircularProgress } from "@mui/material"
import { FaSearch } from "react-icons/fa"
import { useParams, withRouter, Link } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useEffect, useState } from "react"

const validate = Yup.object({
  buscador: Yup.string()
    .required("Ingrese Codigo o DNI Valido")
    .matches(/^[a-zA-Z0-9_]*$/, "Ingrese Codigo o DNI Valido"),
})

const ListSearch = ({ history }) => {
  const [dataCard, setDataCard] = useState([])
  const [notData, setNotData] = useState(null)
  const [spinner, setSpinner] = useState(false)
  const { codigo } = useParams()
  const formik = useFormik({
    initialValues: {
      buscador: "",
    },
    validationSchema: validate,
    onSubmit: (data) => {
      setDataCard([])
      history.push(`/public/buscador/${data.buscador}`)
    },
  })

  const formatoPeru = new Intl.DateTimeFormat("es-PE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  })

  useEffect(() => {
    const obtenerDatos = async () => {
      setNotData(null)
      setSpinner(true)
      if (codigo.length === 8) {
        const q = query(
          collection(db, "registrosTaller"),
          where("cliente.DNI", "==", codigo)
        )
        const data = await getDocs(q)
        if (data.docs.length === 0) {
          setNotData("No hay registros!")
        } else {
          setNotData(null)
          const arrayData = data.docs.map((doc) => ({
            uid: doc.data().uid,
            cliente: doc.data().cliente.fullName,
            empresa: doc.data().personal.empresa,
            fecha: doc.data().fechaRegistro,
            tipoProducto: doc.data().tipoProducto,
            marcaProducto: doc.data().marcaProducto,
            modeloProducto: doc.data().modeloProducto,
          }))
          setDataCard(arrayData)
        }
      } else {
        const q = query(
          collection(db, "registrosTaller"),
          where("uid", "==", codigo)
        )
        const data = await getDocs(q)
        if (data.docs.length === 0) {
          setNotData("No hay registros!")
        } else {
          setNotData(null)
          const arrayData = data.docs.map((doc) => ({
            uid: doc.data().uid,
            cliente: doc.data().cliente.fullName,
            empresa: doc.data().personal.empresa,
            fecha: doc.data().fechaRegistro,
            tipoProducto: doc.data().tipoProducto,
            marcaProducto: doc.data().marcaProducto,
            modeloProducto: doc.data().modeloProducto,
          }))
          setDataCard(arrayData)
        }
      }
      setSpinner(false)
    }

    obtenerDatos()
  }, [codigo])

  return (
    <>
      <Container className="mt-4">
        <Row>
          <form
            onSubmit={formik.handleSubmit}
            className="d-flex justify-content-center"
          >
            <Col lg={8} xs={10}>
              <InputGroup className="mb-3" size="lg">
                <FormControl
                  name="buscador"
                  id="buscador"
                  value={formik.values.buscador}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.buscador && Boolean(formik.errors.buscador)
                      ? "border-danger"
                      : "border-primary"
                  }
                  placeholder="Ingrese DNI o codigo de registro"
                  aria-label="Buscador Producto"
                />
                <Button
                  variant={
                    formik.touched.buscador && Boolean(formik.errors.buscador)
                      ? "outline-danger"
                      : "outline-primary"
                  }
                  type="submit"
                >
                  <FaSearch />
                </Button>
              </InputGroup>
            </Col>
          </form>
        </Row>
        {formik.touched.buscador && Boolean(formik.errors.buscador) && (
          <Row className="mt-1 d-flex justify-content-center">
            <Col lg={8} xs={10}>
              <Alert variant={"danger"}>{formik.errors.buscador}</Alert>
            </Col>
          </Row>
        )}

        <Row className="mt-2 d-flex justify-content-center">
          <Col lg={8} xs={10}>
            <h3>Codigo Buscado: {codigo}</h3>
          </Col>
        </Row>
      </Container>
      <hr />
      <Container>
        {spinner && (
          <Row className="mt-5 d-flex justify-content-center">
            <Col lg={8} xs={10} className="mt-5 d-flex justify-content-center">
              <CircularProgress color="success" />
            </Col>
          </Row>
        )}

        {notData !== null && (
          <Row className="mt-1 d-flex justify-content-center">
            <Col lg={8} xs={10}>
              <Alert variant={"danger"}>{notData}</Alert>
            </Col>
          </Row>
        )}

        {dataCard.length > 0 &&
          dataCard.map((item, index) => (
            <Link
              key={index}
              to={`/public/producto/${item.uid}`}
              className="text-decoration-none"
            >
              <Row className="mt-5 d-flex justify-content-center text-white">
                <Col
                  lg={2}
                  xs={2}
                  className=" d-flex align-items-center justify-content-center rounded-start shadow-lg"
                  style={
                    item.empresa === "EF"
                      ? { backgroundColor: "#1789FC" }
                      : { backgroundColor: "#7209b7" }
                  }
                >
                  <h1>{item.empresa}</h1>
                </Col>
                <Col
                  lg={6}
                  xs={9}
                  className="rounded-end shadow-lg"
                  style={
                    item.empresa === "EF"
                      ? { backgroundColor: "#1789FC" }
                      : { backgroundColor: "#7209b7" }
                  }
                >
                  <Row className="mt-3">
                    <Col className="text-center">
                      <h4>
                        {item.tipoProducto} - {item.marcaProducto} -{" "}
                        {item.modeloProducto}
                      </h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <h3>{item.cliente}</h3>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col className="text-center">
                      <h4>{formatoPeru.format(item.fecha)}</h4>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Link>
          ))}

        {/* <Row className="mt-5 d-flex justify-content-center text-white">
          <Col
            lg={2}
            className=" d-flex align-items-center justify-content-center rounded-start shadow-lg"
            style={{ backgroundColor: "#1789FC" }}
          >
            <h1>EF</h1>
          </Col>
          <Col
            lg={4}
            className="rounded-end shadow-lg"
            style={{ backgroundColor: "#1789FC" }}
          >
            <Row className="mt-3">
              <Col className="text-center">
                <h4>Impresora - Epson - L350</h4>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <h3>Sandra Monica Tineo Mendoza</h3>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="text-center">
                <h4>29/9/2021-23:02:33</h4>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-5 d-flex justify-content-center text-white">
          <Col
            lg={2}
            className=" d-flex align-items-center justify-content-center rounded-start shadow-lg"
            style={{ backgroundColor: "#7209b7" }}
          >
            <h1>S</h1>
          </Col>
          <Col
            lg={4}
            className="rounded-end shadow-lg"
            style={{ backgroundColor: "#7209b7" }}
          >
            <Row className="mt-3">
              <Col className="text-center">
                <h4>Laptop - Toshiba - Satellite</h4>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <h3>Sandra Monica Tineo Mendoza</h3>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="text-center">
                <h4>20/9/2021-20:02:33</h4>
              </Col>
            </Row>
          </Col>
        </Row> */}
      </Container>
    </>
  )
}

export default withRouter(ListSearch)
