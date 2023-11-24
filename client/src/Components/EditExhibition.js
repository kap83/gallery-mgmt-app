import React from 'react'

export default function EditExhibition({selectedExhibition,  handleEditToggleClick}) {

    //TODO(CSS)
        //INCREASE LENGTH FOR TITLE INPUT
  return (
    <div className='exhibitionH2and3'>
    <h2>
        <input 
            type='text'
            defaultValue={selectedExhibition.title}
        />
    </h2>
    <h3>
        <label> START:</label>
        <input
        type='date'
        name='start'
        />
        <label>END:</label>
        <input 
        type='date'
        name='end'
        />

      <h4>Current Dates: {selectedExhibition.start_date} - {selectedExhibition.end_date} </h4>
      
    </h3>
    <button type='submit'>SUBMIT</button>
    <button onClick={handleEditToggleClick}>CANCEL</button>
  </div>
  )
}
