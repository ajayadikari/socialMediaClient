import React from 'react'
import { WebSocket } from 'http'

const index = () => {
    const ws = new WebSocket('ws://localhost:8000/ws/')
    if(ws.rea)
  return (
    <div>
      page not found
    </div>
  )
}

export default index
