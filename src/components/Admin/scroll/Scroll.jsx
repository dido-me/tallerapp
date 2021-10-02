import { useState, useEffect } from "react"
import { Button } from "@mui/material"
import { FaArrowCircleUp } from "react-icons/fa"

const Scroll = () => {
  const [showScroll, setShowScroll] = useState(false)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const isTop = () => {
    if (!showScroll && window.pageYOffset > 200) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 200) {
      setShowScroll(false)
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", isTop)
  }, [scrollToTop])
  return (
    <>
      <Button
        style={{
          position: "fixed",
          right: 50,
          bottom: 50,
          opacity: showScroll ? 1 : 0,
          height: 45,
          width: 45,
          borderRadius: 8,
          cursor: "pointer",
          zIndex: 1,
          transition: "all 500ms ease-out",
        }}
        onClick={scrollToTop}
      >
        <span style={{ fontWeight: "bold", fontSize: 25 }}>
          <FaArrowCircleUp />
        </span>
      </Button>
    </>
  )
}

export default Scroll
