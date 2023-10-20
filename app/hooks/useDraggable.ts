import { RefObject, useEffect } from 'react'

const useDraggable = <T extends HTMLElement>(ref: RefObject<T>) => {
  useEffect(() => {
    const element = ref.current

    if (element) {
      let isDragging = false
      let offsetX = 0
      let offsetY = 0

      const handleMouseDown = (e: MouseEvent) => {
        isDragging = true
        offsetX = e.clientX - element.getBoundingClientRect().left
        offsetY = e.clientY - element.getBoundingClientRect().top
        element.style.zIndex = '999'
        element.style.position = 'absolute'
        element.style.cursor = 'move'

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
          const maxX = window.innerWidth - element.offsetWidth
          const maxY = window.innerHeight - element.offsetHeight
          let newX = e.clientX - offsetX
          let newY = e.clientY - offsetY

          newX = Math.min(Math.max(newX, 0), maxX)
          newY = Math.min(Math.max(newY, 0), maxY)

          element.style.left = newX + 'px'
          element.style.top = newY + 'px'
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
