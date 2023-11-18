import React, {useContext } from 'react'
import {useParams} from 'react-router-dom'
import {ArtistContext} from '../Context/Artist'
import { ArtworkContext } from '../Context/Artwork'

export default function AddArtwork() {

    const {handleArtistsAddedArtwork} = useContext(ArtistContext)
    const { handledAddedArtwork} = useContext(ArtworkContext)

    const {id} = useParams()
    const parseId = parseInt(id)

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', e.target.elements.title.value)
        formData.append('medium', e.target.elements.medium.value)
        formData.append('paintings', e.target.elements.paintings.files[0])
        formData.append('artist_id', parseId)


        fetch(`/artworks`, {
            method: 'POST',
            body: formData
          })
          .then(res => res.json())
          .then(data => {
            //console.log("in fetch", data)
            handleArtistsAddedArtwork(data)
            handledAddedArtwork(data)
            document.getElementById("artworkForm").reset()
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
      
     <button 
        type='submit'>
        SUBMIT
        </button>
    </form>
        
     



    </>
  )
}
