import React from 'react'
import AddArtist from './AddArtist'
import ListArtists from './ListArtists'

export default function Artists() {
  return (
    <div className='wrapper' >
       <AddArtist />
       <ListArtists />
    </div>
  )
}
