import { useRef, useEffect } from 'react'

function Play() {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    null
    //const canvas = canvasRef.current;
    //const context = canvas.getContext('2d');
    //Our first draw
    //context.fillStyle = '#003000'
    //context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }, [])
  
  return <canvas ref={canvasRef}/>
}

export default Play