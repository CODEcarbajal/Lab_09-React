import { useEffect, useState } from 'react'

function readWindowSize() {
  if (typeof window === 'undefined') return { width: 0, height: 0 }

  return { width: window.innerWidth, height: window.innerHeight }
}

export function useWindowSize() {
  const [size, setSize] = useState(readWindowSize)

  useEffect(() => {
    function handleResize() {
      setSize(readWindowSize())
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}
