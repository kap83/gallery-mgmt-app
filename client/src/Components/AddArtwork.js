import React, { useState, useContext } from 'react'
import {ArtistContext} from '../Context/Artist'

export default function AddArtwork() {

    const {artistList} = useContext(ArtistContext)

    const [artistId, setArtistId] = useState('')

    console.log(artistId)

  return (
    <>
    <ul>
        <li> 
            TITLE: 
        <input
              type='text'
              name='title'
              />
        </li>
        <li> 
            DESCRIPTION: 
        <input
              type='text'
              name='description'
              />
        </li>
        <li> 
        <label htmlFor='uploadFields'/>
        <input
              type='file'
              name='painting_url'
              />
        </li>
        <li>
        <select name='artists' value={artistId} onChange={(e)=>setArtistId(e.target.value)} id='artists'> 
        <option value='default'>Select An Artist </option>
        {artistList.map(artist => (

        <option key={artist.id} value={artist.id}>
            {artist.name}
        </option>
   
         ))}
     </select>
        </li>
    </ul>
   
      
    </>
  )
}
