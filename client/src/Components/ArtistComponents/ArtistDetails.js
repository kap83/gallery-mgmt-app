import React, {useState, useEffect, useContext, useRef} from 'react'
import {useParams} from 'react-router-dom'
import {ArtistContext} from '../../Context/Artist'
import { ExhibitionContext } from '../../Context/Exhibition'
import AddArtwork from '../AddArtwork'
import DisplaySelectedPaintings from '../DisplaySelectedPaintings'
import DialogBox from '../DialogBox'

export default function ArtistDetails() {

  const {findArtist, artistList, selectedArtist, handleDeletedArtworkInArtistList} = useContext(ArtistContext)
  const {handleDeletedArtworkInExhibitionArray} = useContext(ExhibitionContext)

  const artRef = useRef(null)

  const {id} = useParams()
  const parsedId = parseInt(id)

  const [dialogBoxVisible, setDialogBoxVisible ] = useState(false)
  const [message, setMessage] = useState("")
 
  

  useEffect(() => {
      findArtist(parsedId)
    // eslint-disable-next-line
  }, [parsedId, artistList])
  //triggers an update to selectedArtist state


const handleDeleteBtnClick = (art) => {
  
  fetch(`/artworks/${art.id}`, {
    method: 'DELETE'
  }).then((res) => {
    if (res.ok) {
      handleDeletedArtworkInArtistList(art)
      handleDeletedArtworkInExhibitionArray(art)

    }
    else {
      return res.json().then((data)=> {
        console.error(data)
        let msg = data.errors
        setMessage(msg)
        setDialogBoxVisible(true)
        artRef.current = art
      })
    }
  })
}

const handleClearDialog = () => {
  setDialogBoxVisible(false)
  setMessage('')
}


  return (
  <>
  <div >
    <AddArtwork />
  </div>
  <div className='displaySelectedPaintingWrapper'>
    <DisplaySelectedPaintings handleDeleteBtnClick={handleDeleteBtnClick} selectedArtist={selectedArtist} />
    {dialogBoxVisible === true ? <DialogBox message={message} artRef={artRef} handleClearDialog={handleClearDialog}/> : null } 

  </div>
  </>
  )
}
