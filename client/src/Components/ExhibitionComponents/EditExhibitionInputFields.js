import React from 'react'

export default function EditExhibitionInputFields({selectedExhibition, handleFormChanges, handleEditToggleClick}) {

    //TODO(CSS)
        //INCREASE LENGTH FOR TITLE INPUT
  return (
    <div className='exhibitionTitleData'>
    <h2>
        <input 
            type='text'
            name='title'
            defaultValue={selectedExhibition.title}
            onChange={(e) => handleFormChanges(e)}
        />
    </h2>
    <h3>
        <label> START:</label>
        <input
        type='date'
        defaultValue={selectedExhibition.start_date}
        name='start_date'
        onChange={(e) => handleFormChanges(e)}
        />

        <label>END:</label>
        <input 
        type='date'
        defaultValue={selectedExhibition.date}
        name='end_date'
        onChange={(e) => handleFormChanges(e)}
        />
      </h3>
      <h4>Current Dates: 
        {selectedExhibition.start_date} - {selectedExhibition.end_date} 
      </h4>
      <h3>
        <label> Gallery: </label>
        <input 
        type='text'
        name='gallery'
        defaultValue={selectedExhibition.gallery} 
        onChange={(e) => handleFormChanges(e)}
        />
      </h3>
      <button type='submit' >SUBMIT CHANGES</button>
      <button onClick={handleEditToggleClick}>CANCEL CHANGES</button>
  </div>
  )
}
