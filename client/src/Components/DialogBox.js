import React, {useContext} from 'react'
import { ExhibitionContext } from '../Context/Exhibition'
import {ArtistContext} from '../Context/Artist'

export default function DialogBox({artRef, message, handleClearDialog}) {

    const {handleDeletedArtworkInExhibitionArray} = useContext(ExhibitionContext)
    const { handleDeletedArtworkInArtistList} = useContext(ArtistContext)


const handlePermDeleteArtwork = () => {
    const art = artRef.current;

    fetch(`/artworks/${art.id}?confirm_delete=true`, {
      method: 'DELETE'
    }).then(() => {
      handleDeletedArtworkInArtistList(art)
      handleDeletedArtworkInExhibitionArray(art)
      handleClearDialog()
    })
  }


  return (
    //greys out background
    <div className='backgroundDialogBox'>
        <div className='dialogBox'>
        <div>
          <h3>{message}</h3>
            <button className='dialogConfirmBtn' onClick={handlePermDeleteArtwork}>Delete Anyway</button>
            <button className='dialogCancelBtn' onClick={handleClearDialog}>Cancel</button>
        </div>
        </div>
       
    </div>
  )
}
