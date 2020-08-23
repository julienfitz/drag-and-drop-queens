import React from 'react'

const App = () => {
  const onDragStart = (dragEvent) => {
    // I added a border at this point so I can 
    // clearly see what's being dragged
    dragEvent.currentTarget.style.border = '1px solid pink'
    dragEvent.dataTransfer.setData('text/plain', dragEvent.target.id)
  }

  const onDragEnter = (dragEvent) => {
    dragEvent.preventDefault()
  }  

  const onDragOver = (dragEvent) => {
    dragEvent.preventDefault()
    dragEvent.target.style.border = '1px solid green'
  }

  const onDrop = (dragEvent) => {
    dragEvent.preventDefault()
    const data = dragEvent.dataTransfer.getData('text')
    const newElement = document.getElementById(data)
    dragEvent.target.appendChild(newElement)
    dragEvent.target.style.border = 'none'
    newElement.style.border = 'none'
    dragEvent.dataTransfer.clearData()
  }

  const Queen = ({ name }) => (
    <li
      draggable='true'
      // also added a unique id so the list item can be "found"
      id={`source-${name.split(' ').join('-')}`}
      onDragStart={onDragStart}
    >
      {name}
    </li>
  )

  const QueensList = () => {
    const queens = [
      'Divine',
      'Lady Bunny',
      'Sasha Velour',
      'Vaginal Creme Davis',
      'The Fabulous Wonder Twins'
    ]

    return (
      <ul>
        {
          queens.map((queenName) => (
            <Queen name={queenName} />
          ))
        }
      </ul>
    )
  }

  const FavoriteQueens = () => (
    <ul
      id='target'
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <li>Drop Target</li>
    </ul>
  )

  return (
    <>
      <QueensList />
      <FavoriteQueens />
    </>
  )
}

export default App
