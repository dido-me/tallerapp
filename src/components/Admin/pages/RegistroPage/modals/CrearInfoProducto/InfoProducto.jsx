import React from "react"
import { Row, Col, Spinner } from "react-bootstrap"
import { Autocomplete, TextField, IconButton } from "@mui/material"
import { FaFileSignature, FaPlusCircle, FaUndoAlt } from "react-icons/fa"

// Firebase
import { db } from "../../../../../../firebase"
import { collection, getDocs, setDoc, doc } from "firebase/firestore"

const infoProductoModal = ({ formik }) => {
  // Spinner
  const [spiner, setSpiner] = React.useState(false)

  // Tipo de Producto
  const [addTipoProducto, setAddTipoProducto] = React.useState(false)
  const [tipoProducto, setTipoProducto] = React.useState("")
  const [tiposProducto, setTiposProducto] = React.useState([])

  // Marcas
  const [inAddMarca, setInAddMarca] = React.useState(false)
  const [marca, setMarca] = React.useState("")
  const [marcasProductos, setMarcasProductos] = React.useState([])
  // Modelo
  const [addModelo, setAddModelo] = React.useState(false)
  const [modelo, setModelo] = React.useState("")
  const [modelos, setModelos] = React.useState([])

  // Errores
  const [errorInput, setErrorInput] = React.useState(null)
  // Agregar Marca
  const agregar = async () => {
    if (!marca.trim()) {
      setErrorInput("Campo Vacio")
      return
    }

    try {
      setSpiner(true)
      await setDoc(doc(db, "marcasProducto", marca.toUpperCase()), {
        name: marca.toUpperCase(),
      })

      const arrayFiltrado = marcasProductos.filter(
        (e) => e.id.toUpperCase() !== marca.toUpperCase()
      )
      const arrayNuevo = [
        ...arrayFiltrado,
        {
          id: marca.toUpperCase(),
          name: marca.toUpperCase(),
        },
      ]
      setMarcasProductos(arrayNuevo)
      setMarca("")
      setErrorInput(null)
      setSpiner(false)
      setInAddMarca(false)
      formik.setFieldTouched("marcaProducto", false)
    } catch (error) {
      console.log(error)
    }
  }
  // Agregar Tipo de Producto
  const agregarTipoProducto = async () => {
    if (!tipoProducto.trim()) {
      setErrorInput("Campo Vacio")
      return
    }
    try {
      setSpiner(true)
      await setDoc(doc(db, "tiposProducto", tipoProducto.toUpperCase()), {
        name: tipoProducto.toUpperCase(),
      })

      const arrayFiltrado = tiposProducto.filter(
        (e) => e.id.toUpperCase() !== tipoProducto.toUpperCase()
      )
      const arrayNuevo = [
        ...arrayFiltrado,
        {
          id: tipoProducto.toUpperCase(),
          name: tipoProducto.toUpperCase(),
        },
      ]
      setTiposProducto(arrayNuevo)
      setTipoProducto("")
      setErrorInput(null)
      setSpiner(false)
      setAddTipoProducto(false)
      formik.setFieldTouched("tipoProducto", false)
    } catch (error) {
      console.log(error)
    }
  }
  // Agregar Modelo
  const agregarModelo = async () => {
    if (!modelo.trim()) {
      setErrorInput("Campo Vacio")
      return
    }
    try {
      setSpiner(true)
      await setDoc(doc(db, "modelosProducto", modelo.toUpperCase()), {
        name: modelo.toUpperCase(),
      })

      const arrayFiltrado = modelos.filter(
        (e) => e.id.toUpperCase() !== modelo.toUpperCase()
      )
      const arrayNuevo = [
        ...arrayFiltrado,
        {
          id: modelo.toUpperCase(),
          name: modelo.toUpperCase(),
        },
      ]
      setModelos(arrayNuevo)
      setModelo("")
      setErrorInput(null)
      setSpiner(false)
      setAddModelo(false)
      formik.setFieldTouched("modeloProducto", false)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    const getMarcasProducto = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "marcasProducto"))
        const arrayMarcasProductos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setMarcasProductos(arrayMarcasProductos)
      } catch (error) {
        console.log(error)
      }
    }
    const getTiposProducto = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tiposProducto"))
        const arrayTiposProductos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setTiposProducto(arrayTiposProductos)
      } catch (error) {
        console.log(error)
      }
    }

    const getModelosProducto = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "modelosProducto"))
        const arrayModelosProducto = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setModelos(arrayModelosProducto)
      } catch (error) {
        console.log(error)
      }
    }

    getModelosProducto()
    getTiposProducto()
    getMarcasProducto()
  }, [])
  return (
    <>
      {/* Tipo Producto */}
      <Row className="mt-4">
        <Col sm={10}>
          {addTipoProducto ? (
            <TextField
              fullWidth
              id="agregarTipoProducto"
              label="Agregue Tipo de Producto"
              value={tipoProducto}
              onChange={(e) => setTipoProducto(e.target.value)}
              error={Boolean(errorInput)}
              helperText={errorInput && errorInput}
              disabled={spiner}
              variant="filled"
            />
          ) : (
            <Autocomplete
              disablePortal
              id="tipoProducto"
              name="tipoProducto"
              options={tiposProducto}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) =>
                formik.setFieldValue("tipoProducto", value?.id || "")
              }
              onBlur={formik.handleBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(
                    formik.touched.tipoProducto && formik.errors.tipoProducto
                  )}
                  helperText={
                    formik.touched.tipoProducto && formik.errors.tipoProducto
                  }
                  label="Tipo de Producto"
                  variant="standard"
                />
              )}
            />
          )}
        </Col>
        <Col sm={2} className={addTipoProducto && "d-flex align-items-center"}>
          {addTipoProducto ? (
            spiner ? (
              <Spinner animation="border" variant="success" />
            ) : (
              <>
                <IconButton
                  aria-label="agregarTipoProducto"
                  style={{ color: "#1cc88a" }}
                  size={"small"}
                  onClick={agregarTipoProducto}
                >
                  <FaFileSignature />
                </IconButton>

                <IconButton
                  aria-label="Return"
                  color="error"
                  size={"small"}
                  onClick={() => {
                    setErrorInput(null)
                    setAddTipoProducto(false)
                  }}
                  className="ms-1"
                >
                  <FaUndoAlt />
                </IconButton>
              </>
            )
          ) : (
            <IconButton
              aria-label="agregarTipoProductoModal"
              style={
                inAddMarca || addModelo
                  ? { color: "#c3c3c3" }
                  : { color: "#1cc88a" }
              }
              onClick={() => setAddTipoProducto(true)}
              disabled={inAddMarca || (addModelo && true)}
            >
              <FaPlusCircle />
            </IconButton>
          )}
        </Col>
      </Row>
      {/* Marca */}
      <Row className="mt-5">
        <Col sm={10}>
          {inAddMarca ? (
            <TextField
              fullWidth
              id="agregarMarcar"
              label="Agregue una Marca"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              error={Boolean(errorInput)}
              helperText={errorInput && errorInput}
              disabled={spiner}
              variant="filled"
            />
          ) : (
            <Autocomplete
              id="marcaProducto"
              name="marcaProducto"
              options={marcasProductos}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) =>
                formik.setFieldValue("marcaProducto", value?.id || "")
              }
              onBlur={formik.handleBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(
                    formik.touched.marcaProducto && formik.errors.marcaProducto
                  )}
                  helperText={
                    formik.touched.marcaProducto && formik.errors.marcaProducto
                  }
                  label="Marca de Producto"
                  variant="standard"
                />
              )}
            />
          )}
        </Col>
        <Col sm={2} className={inAddMarca && "d-flex align-items-center"}>
          {inAddMarca ? (
            spiner ? (
              <Spinner animation="border" variant="success" />
            ) : (
              <>
                <IconButton
                  aria-label="agregarMarca"
                  style={{ color: "#1cc88a" }}
                  size={"small"}
                  onClick={agregar}
                >
                  <FaFileSignature />
                </IconButton>
                <IconButton
                  aria-label="Return"
                  color="secondary"
                  size={"small"}
                  onClick={() => {
                    setErrorInput(null)
                    setInAddMarca(false)
                  }}
                  className="ms-1"
                >
                  <FaUndoAlt />
                </IconButton>
              </>
            )
          ) : (
            <IconButton
              aria-label="agregarMarcaEstado"
              style={
                addTipoProducto || addModelo
                  ? { color: "#c3c3c3" }
                  : { color: "#1cc88a" }
              }
              color="primary"
              onClick={() => setInAddMarca(true)}
              disabled={addTipoProducto || (addModelo && true)}
            >
              <FaPlusCircle />
            </IconButton>
          )}
        </Col>
      </Row>
      {/* Modelo */}
      <Row className="mt-5">
        <Col sm={10}>
          {addModelo ? (
            <TextField
              fullWidth
              id="agregarModelo"
              label="Agregue una Modelo"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              error={Boolean(errorInput)}
              helperText={errorInput && errorInput}
              disabled={spiner}
              variant="filled"
            />
          ) : (
            <Autocomplete
              id="modeloProducto"
              name="modeloProducto"
              options={modelos}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) =>
                formik.setFieldValue("modeloProducto", value?.id || "")
              }
              onBlur={formik.handleBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(
                    formik.touched.modeloProducto &&
                      formik.errors.modeloProducto
                  )}
                  helperText={
                    formik.touched.modeloProducto &&
                    formik.errors.modeloProducto
                  }
                  label="Modelo del Producto"
                  variant="standard"
                />
              )}
            />
          )}
        </Col>
        <Col sm={2} className={addModelo && "d-flex align-items-center"}>
          {addModelo ? (
            spiner ? (
              <Spinner animation="border" variant="success" />
            ) : (
              <>
                <IconButton
                  aria-label="agregarModelo"
                  style={{ color: "#1cc88a" }}
                  size={"small"}
                  onClick={agregarModelo}
                >
                  <FaFileSignature />
                </IconButton>
                <IconButton
                  aria-label="Return"
                  color="secondary"
                  size={"small"}
                  onClick={() => {
                    setErrorInput(null)
                    setAddModelo(false)
                  }}
                  className="ms-1"
                >
                  <FaUndoAlt />
                </IconButton>
              </>
            )
          ) : (
            <IconButton
              aria-label="agregarModeloEstado"
              style={
                addTipoProducto || inAddMarca
                  ? { color: "#c3c3c3" }
                  : { color: "#1cc88a" }
              }
              color="primary"
              onClick={() => setAddModelo(true)}
              disabled={addTipoProducto || (inAddMarca && true)}
            >
              <FaPlusCircle />
            </IconButton>
          )}
        </Col>
      </Row>
    </>
  )
}

export default infoProductoModal
