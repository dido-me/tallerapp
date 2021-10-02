import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Image } from "react-bootstrap"
import { Step, Stepper, StepLabel, Button } from "@mui/material"
import ClienteInfo from "./steps/ClienteInfo"
import ProductoInfo from "./steps/ProductoInfo"
import ImpimirBarcode from "./steps/ImpimirBarcode"
import logo from "../../../../assets/img/logoGeneral.png"

const RegistroPage = ({ setTitle }) => {
  const [productos, setProductos] = useState([])
  const [activeStep, setActiveStep] = useState(0)

  // Config
  const getSteps = () => {
    return [
      "Agregar Datos del cliente",
      "Agregar Productos a revisar",
      "Imprimir Codigo de Barra",
    ]
  }

  const getStepContent = (stepIndex) => {
    const stepI = stepIndex

    const STEP_CONTENT = {
      0: (
        <ClienteInfo
          steps={steps}
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      ),
      1: (
        <ProductoInfo
          setProductos={setProductos}
          productos={productos}
          steps={steps}
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      ),
      2: (
        <ImpimirBarcode
          setProductos={setProductos}
          productos={productos}
          steps={steps}
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      ),
    }

    const STEP_DEFAULT = "No se econtro step"

    return STEP_CONTENT[stepI] || STEP_DEFAULT
  }

  const steps = getSteps()
  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep + 1
    })
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  useEffect(() => {
    const Title = () => {
      setTitle("Registro de Producto")
    }
    Title()
  }, [])
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Header>
                <h3 className="text-primary">SERVICIO TALLER</h3>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Stepper activeStep={activeStep} alternativeLabel>
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Col>
                </Row>
                {activeStep === steps.length ? (
                  <>
                    <Row className="mt-5">
                      <Col sm={12}>
                        <h1 className="text-primary text-center">
                          🙌 Registro Terminado 🙌
                        </h1>
                      </Col>
                    </Row>
                    <Row className="m-5 ">
                      <Col sm={12} className="d-flex justify-content-center">
                        <Image src={logo} />
                      </Col>
                    </Row>
                    <div className="row">
                      <div className="col-md">
                        <div className="col-md">
                          <Button
                            variant="contained"
                            onClick={handleReset}
                            color="primary"
                          >
                            Volver a Registrar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>{getStepContent(activeStep)}</>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default RegistroPage
