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
    //greys out background
    <div className='backgroundDialogBox'>
        <div className='dialogBox'>
        <div>
          <h3>{message}</h3>
            <button className='dialogConfirmBtn' onClick={handlePermDeleteArtwork}>Delete Anyway</button>
            <button className='dialogCancelBtn' onClick={handleDecline}>Cancel</button>
        </div>
        </div>
       
    </div>
  )
}
