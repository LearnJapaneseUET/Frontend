import React from 'react'

const WordItem = ({word}) => {
  return (
    <div>
        <h3>{word?.w}</h3>
        <p>{word?.p}</p>
        <p>{word?.m}</p>
        <p>{word?.hanviet}</p>

    </div>
  )
}

export default WordItem