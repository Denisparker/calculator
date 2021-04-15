import React from 'react'
import './style.css'

function Input({ value }) {
  return (
    <div className="InputBlock">
      <div className="Input">{value}</div>
    </div>
  )
}

export default Input
