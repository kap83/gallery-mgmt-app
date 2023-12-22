import React, {useContext} from 'react'
import { ExhibitionContext } from '../Context/Exhibition'
import {ArtistContext} from '../Context/Artist'

export default function DialogBox({artRef, message, handleDecline}) {

    const {handleDeletedArtworkInExhibitionArray} = useContext(ExhibitionContext)
    const { handleDeletedArtworkInArtistList} = useContext(ArtistContext)

console.log( message)


const handlePermDeleteArtwork = () => {
    const art = artRef.current;

    fetch(`/artworks/${art.id}`, {
      method: 'DELETE'
    }).then(() => {
      handleDeletedArtworkInArtistList(art)
      handleDeletedArtworkInExhibitionArray(art)
    })
  }


  return (
    <div style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0,0,0,0.5)'
    }}>
        <div style={{
            display: 'flex',
            alignItems:'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
        <h3>{message}</h3>
        <div style={{display: 'flex', alignItems: 'center', color: 'white'}}>
            <button style={{background: 'green'}} onClick={handlePermDeleteArtwork}>Yes</button>
            <button style={{background: 'red'}} onClick={handleDecline}>No</button>
        </div>
        </div>
       
    </div>
  )
}
