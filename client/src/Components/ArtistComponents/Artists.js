import React from 'react'
import AddArtist from './AddArtist'
import DisplayAllArtists from './DisplayAllArtists'

export default function Artists() {
  return (
    <div className='wrapper' >
       <AddArtist />
       <DisplayAllArtists />
    </div>
  )
}
