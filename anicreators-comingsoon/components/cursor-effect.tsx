"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", mouseMove)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      opacity: 0.5,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      mixBlendMode: "difference" as const,
    },
  }

  useEffect(() => {
    const textElements = document.querySelectorAll("h1, h2, h3, p, button")

    const mouseEnter = () => setCursorVariant("text")
    const mouseLeave = () => setCursorVariant("default")

    textElements.forEach((element) => {
      element.addEventListener("mouseenter", mouseEnter)
      element.addEventListener("mouseleave", mouseLeave)
    })

    return () => {
      textElements.forEach((element) => {
        element.removeEventListener("mouseenter", mouseEnter)
        element.removeEventListener("mouseleave", mouseLeave)
      })
    }
  }, [])

  return (
    <>
      <motion.div
        className="cursor-dot-outline hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-purple-500 z-50 pointer-events-none"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="cursor-dot hidden md:block fixed top-0 left-0 w-4 h-4 rounded-full bg-pink-500 z-50 pointer-events-none"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 35 }}
      />
    </>
  )
}
