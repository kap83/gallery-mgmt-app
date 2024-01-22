import React from 'react'
import { format, parseISO } from 'date-fns'

export default function ReadOnlyArtistHeader({artist, handleEditToggleClick}) {
    const dob = artist.date_of_birth
    const isoDOB = parseISO(dob)
    const formattedDOB = format(isoDOB, 'MM/dd/yyyy')

  return (
    <>
      <h1 >{artist.name}</h1>
      <h2 id='dob'>{formattedDOB}</h2>
      <button className='btn' onClick={handleEditToggleClick} >Edit</button>
    </>
  )
}
