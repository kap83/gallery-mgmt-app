import React from 'react'


export default function EditArtistHeader({artist, handleEditToggleClick}) {


  return (
    <div className='artistHeaderEditStyle' >
      <h1>
      <input
        type='text'
        className='artistHeaderEditStyleInput'
        defaultValue={artist.name}
        name='name'
        required='required'
        />
      </h1>
      <h2>
        <input 
        className='artistHeaderEditStyleInput'
        type='date'
        defaultValue={artist.date_of_birth}
        />
      </h2>
      <button onClick={handleEditToggleClick}>Cancel Changes</button>
      <button>Submit Changes</button>
    </div>
  )
}
