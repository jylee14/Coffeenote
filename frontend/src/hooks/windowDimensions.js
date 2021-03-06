/**
 * custom hook to grab window width/height within the app
 * source: https://stackoverflow.com/a/36862446
 */

import { useState, useEffect } from 'react'

const getWindowDimensions = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

export default function useWindowDimensions() {
  const [dimensions, setDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    const handleResize = () => setDimensions(getWindowDimensions())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return dimensions
}