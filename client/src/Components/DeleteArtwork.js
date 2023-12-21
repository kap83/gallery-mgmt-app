import React from 'react'
import DisplaySelectedPaintings from '../DisplaySelectedPaintings'

export default function DeleteArtwork() {


const handleDeletedArtwork = (artId) => {
    console.log("DEL", artId)
}


  return (
    <div>
      <DisplaySelectedPaintings handleDeletedArtwork={handleDeletedArtwork} />
    </div>
  )
}
