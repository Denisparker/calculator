import React, { useState } from 'react'
import './style.css'

import { ButtonList } from 'components'
import { Input } from 'components'

function App() {
  const [result, setResult] = useState([]) // Array that outputs the result
  const [inputValue, setInputValue] = useState('') // Input numbers

  const handleChange = (prop) => {
    if (prop === 'C') {
      setInputValue('')
      setResult([])
    }

    if (prop.match(/[+*/]/)) {
      if (result.length === 0) {
        return
      }
      if (result.length === 1) {
        if (result[0] === '-') {
          // If only a minus sign is entered, do not replace it with another sign
          return
        }
      }
      if (result[result.length - 1].match(/[-+*/]/)) {
        // Does not allow entering two characters in a row
        if (result[result.length - 2].match(/[/*]/)) {
          return // Does not allow the replacement of the minus sign with other signs, if before the minus sign / or *
        }
        result.pop()
      }
      result.push(prop)
      setInputValue(result.join(''))
    }

    if (prop === ' % ') {
      if (result.length === 0) {
        return
      }
      if (result[result.length - 1].match(/[+-/*]/)) {
        return
      } else {
        result.push(' / ', '100')
        setInputValue(result.join('')) // When the % button is pressed, it divides the number by 100
      }
    }

    if (prop === ' - ') {
      if (result.length === 0) {
        result.push('-')
        setInputValue(result.join(''))
      } else {
        if (result[result.length - 1].match(/[/*]/)) {
          result.push('-')
          setInputValue(result.join(''))
          return
        }

        if (result[result.length - 1].match(/[-+]/)) {
          result.pop()
          result.push(prop)
          setInputValue(result.join(''))
        } else {
          result.push(' - ')
          setInputValue(result.join(''))
        }
      }
    }

    if (prop === '.') {
      if (result.length === 0) {
        return
      } else if (result[result.length - 1].match(/\./)) {
        // Does not allow two points in a row
        result.pop()
      }
      result.push(prop)
      setInputValue(result.join(''))
    }
    if (prop.match(/[0-9]/)) {
      result.push(prop)
      setInputValue(result.join('')) // When clicked, it adds a number to the results array and displays its assembled version on the screen.
    }

    if (prop === '=') {
      let oneResult = result
        .join('')
        .split(' ')
        .map((item, index) => {
          if (item === '%') {
            result.splice(index, 1, '/', '100')
          }
          if (item.match(/[0-9]/)) {
            return Number(item) // Converts to an array of the form [1, +, 654, -, 12]
          }
          return item
        })
      console.log(oneResult)
      if (oneResult[oneResult.length - 2] === '') {
        oneResult.pop()
        oneResult.pop() //Deletes a character if it is not followed by a number
      }
      oneResult.map((item, index) => {
        if (oneResult[index - 1] === '*') {
          oneResult[index] = oneResult[index - 2] * item
          oneResult.splice(index - 2, 2, '_', '_')
        }
        if (oneResult[index - 1] === '/') {
          oneResult[index] = oneResult[index - 2] / item
          oneResult.splice(index - 2, 2, '_', '_')
        }
        return item
      }) // Performs priority actions by replacing [1, '+', 2, '*', 3] ==> [1, '+', '_', '_', 6]
      let endResult = []
      oneResult.map((item) => {
        if (item !== '_') endResult.push(item)
        return item
      }) // Creates an array with the remaining actions [1, '+', '_', '_', 6] ==> [1, '+', 6]

      endResult.map((item, index) => {
        if (endResult[index - 1] === '+') {
          return (endResult[index] = endResult[index - 2] + item)
        }
        if (endResult[index - 1] === '-') {
          return (endResult[index] = endResult[index - 2] - item)
        }
        return item
      }) // Executes and passes the final result to the screen

      setInputValue(endResult[endResult.length - 1])
    }
  }

  return (
    <div className="App">
      <Input value={inputValue} />
      <ButtonList onClick={handleChange} />
    </div>
  )
}

export default App
