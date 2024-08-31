import React from 'react'

const ListItem = ({word}) => {
  return (
    <div>
        <h3>{word.w}</h3>
        <p>{word.p}</p>
        <p>{word.m}</p>
        <p>{word.hanviet}</p>
    </div>
  )
}

export default ListItem