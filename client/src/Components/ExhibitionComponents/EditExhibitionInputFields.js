import React from 'react'


export default function EditExhibitionInputFields({selectedExhibition, handleFormChanges, handleEditToggleClick}) {

  return (
    <div className='exhibitionHeaderEdit'>
    <h1>
        <input 
            type='text'
            className='exhibitionEditHeaderInput'
            name='title'
            defaultValue={selectedExhibition.title}
            onChange={(e) => handleFormChanges(e)}
        />
    </h1>
    <h2>
        <input
        type='date'
        className='exhibitionEditHeaderInput'
        name='start_date'
        defaultValue={selectedExhibition.start_date}
        onChange={(e) => handleFormChanges(e)}
        />

        <label>-</label>
        <input 
        type='date'
        className='exhibitionEditHeaderInput'
        id='endDate'
        name='end_date'
        defaultValue={selectedExhibition.end_date}
        onChange={(e) => handleFormChanges(e)}
        />
      </h2>
      <h2>
        <input 
        className='exhibitionEditHeaderInput'
        id='galleryInput'
        type='text'
        name='gallery'
        defaultValue={selectedExhibition.gallery} 
        onChange={(e) => handleFormChanges(e)}
        />
      </h2>
      <button className='btn' id='exhibitionHeaderBtnsStyle' type='submit'>SUBMIT CHANGES</button>
      <button className='btn' id='exhibitionHeaderBtnsStyle' onClick={handleEditToggleClick}>CANCEL CHANGES</button>
  </div>
  )
}
