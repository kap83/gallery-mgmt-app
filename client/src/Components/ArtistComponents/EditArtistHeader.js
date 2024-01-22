import React from 'react'


export default function EditArtistHeader({artist}) {

    //needs css

  return (
    <>
      <h1>
        <input
        type='text'
        defaultValue={artist.name}
        name='name'
        required='required'
        />
      </h1>
      <h2>
        <input 
        type='date'
        defaultValue={artist.date_of_birth}
        />
      </h2>
      <button>Cancel</button>
      <button>Submit</button>
    </>
  )
}
