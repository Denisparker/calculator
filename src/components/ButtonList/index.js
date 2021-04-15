import React from 'react'
import './style.css'

import { buttArr } from 'utilites'

import cn from 'classnames'

function ButtonList({ onClick }) {
  const handler = (prop) => {
    onClick(prop)
  }

  return (
    <div className="buttonBlock">
      {buttArr.map((butt, num) => (
        <div
          key={butt.id}
          className={cn(
            'button',
            { wide: num === 0 || num === 11 },
            butt.value.match(/[0]/)
              ? 'null'
              : butt.value.match(/[+\-/*=]/)
              ? 'buttYellow'
              : butt.value.match(/[C]/)
              ? 'C' 
              : ''
          )}
          onClick={() => handler(butt.value)}
        >
          {butt.value}
        </div>
      ))}
    </div>
  )
}

export default ButtonList
