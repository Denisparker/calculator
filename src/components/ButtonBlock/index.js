import React from 'react'
import './style.css'

function Button(props) {
  const { button } = props
  return <div className="buttonBlock">{button}</div>
}

export default Button

/////
//  index -- указатель  импорт из каждоой папки эелементы
//  элементы  дефолтом и константой
//  функцию оборачиваем в {} и в константу и используем через стрелочную функцию
