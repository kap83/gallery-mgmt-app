import React, { useState, useContext } from 'react'
import {ArtistContext} from '../Context/Artist'

export default function AddArtwork() {

    const {artistList} = useContext(ArtistContext)
    const [artistId, setArtistId] = useState('')

    //console.log(artistId)

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', e.target.elements.title.value)
        formData.append('medium', e.target.elements.medium.value)
        formData.append('paintings', e.target.elements.paintings.files[0])
        formData.append('artist_id', artistId)

        fetch(`/artworks`, {
            method: 'POST',
            body: formData
          })
          .then(res => res.json())
          .then(data => {
            console.log("in fetch", data)
            //handleAddedArtist(data)
            //document.getElementById("artworkForm").reset()
          })
    }


  return (
    <>
    <form id='artworkForm' onSubmit={handleSubmit}>
        <ul>
        <li> 
            TITLE: 
        <input
              type='text'
              name='title'
              />
        </li>
        <li> 
            MEDIUM: 
        <input
              type='text'
              name='medium'
              />
        </li>
        <li> 
        <label htmlFor='uploadFields'/>
        <input
              type='file'
              name='paintings'
              />
        </li>
        </ul>
        <select name='artists' value={artistId} onChange={(e)=>setArtistId(e.target.value)} id='artists'> 
        <option value='default'>Select An Artist</option>
        {artistList.map(artist => (

        <option name='artist_id' key={artist.id} value={artist.id}>
            {artist.name}
        </option>
   
         ))}
     </select>
     <button 
        type='submit'>
        SUBMIT
        </button>
   
    </form>

    </>
  )
}
