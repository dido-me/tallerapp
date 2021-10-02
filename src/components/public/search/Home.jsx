import {
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Alert,
  Container,
} from "react-bootstrap"
import { FaSearch } from "react-icons/fa"
import { useFormik } from "formik"
import * as Yup from "yup"
import { withRouter } from "react-router-dom"

const validate = Yup.object({
  buscador: Yup.string()
    .required("Ingrese Codigo o DNI Valido")
    .matches(/^[a-zA-Z0-9_]*$/, "Ingrese Codigo o DNI Valido"),
})

const Home = ({ history }) => {
  const formik = useFormik({
    initialValues: {
      buscador: "",
    },
    validationSchema: validate,
    onSubmit: (data) => {
      history.push(`/public/buscador/${data.buscador}`)
    },
  })
  return (
    <>
      <Container style={{ marginTop: "150px" }}>
        <Row className="mt-5 ">
          <Col className="text-center">
            <h1>
              HAS EL SEGUIMIENTO DE TU EQUIPO REGISTRADO EN NUESTRO TALLER
            </h1>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col className="text-center">
            <h1>🙌 🥳</h1>
          </Col>
        </Row>
        <Row>
          <form
            onSubmit={formik.handleSubmit}
            className="mt-5 d-flex justify-content-center"
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
          <Row className="mt-5 d-flex justify-content-center">
            <Col lg={8} xs={10}>
              <Alert variant={"danger"}>{formik.errors.buscador}</Alert>
            </Col>
          </Row>
        )}
      </Container>
    </>
  )
}

export default withRouter(Home)
