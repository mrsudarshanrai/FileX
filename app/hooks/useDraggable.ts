import { RefObject, useEffect } from 'react'

const useDraggable = <T extends HTMLElement>(ref: RefObject<T>) => {
  useEffect(() => {
    const element = ref.current

    if (element) {
      let isDragging = false

      const handleMouseDown = (e: MouseEvent) => {
        isDragging = true
        element.style.cursor = 'move'

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
          element.style.left = e.clientX + 'px'
          element.style.top = e.clientY + 'px'
          element.style.transform = `translate(-${e.clientX}, -${e.clientY})`
        }
      }

      const handleMouseUp = () => {
        isDragging = false
        element.style.zIndex = 'auto'
        element.style.cursor = 'auto'
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      element.addEventListener('mousedown', handleMouseDown)

      return () => {
        element.removeEventListener('mousedown', handleMouseDown)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [ref])
}

export { useDraggable }
