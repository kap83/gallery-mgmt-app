import React from 'react'

export default function ReadOnlyExhibition({selectedExhibition, handleEditToggleClick}) {

  return (
  <div className='exhibitionH2and3'>
    <h2>
      {selectedExhibition.title}
    </h2>
    <h3>
      {selectedExhibition.start_date} - {selectedExhibition.end_date}
    </h3>
    <h3>
     Gallery: {selectedExhibition.gallery}
    </h3>
    <button onClick={handleEditToggleClick}>EDIT</button>
  </div>
  )
}
