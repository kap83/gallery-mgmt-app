import React, {useState, useEffect, useContext, useRef} from 'react'
import {useParams} from 'react-router-dom'
import {ArtistContext} from '../../Context/Artist'
import { ExhibitionContext } from '../../Context/Exhibition'
import AddArtwork from '../AddArtwork'
import DisplaySelectedPaintings from '../DisplaySelectedPaintings'
import DialogBox from '../DialogBox'



export default function ArtistDetails() {

  const {findArtist, artistList, selectedArtist, handleDeletedArtworkInArtistList} = useContext(ArtistContext)
 

  const artRef = useRef(null)

  const {id} = useParams()
  const parsedId = parseInt(id)

  const [delIsClicked, setDelIsClicked ] = useState(false)
  const [message, setMessage] = useState("")
  
  const {handleDeletedArtworkInExhibitionArray} = useContext(ExhibitionContext)

 
  //console.log(delIsClicked)


  useEffect(() => {
      findArtist(parsedId)
    // eslint-disable-next-line
  }, [parsedId, artistList])
  //triggers an update to selectedArtist state


const handleDeleteBtnClick = (art) => {
  if(!art.exhibition_id) {
    console.log("first if", 'nope')
     fetch(`/artworks/${art.id}`, {
      method: 'DELETE'
    }).then(() => {
      handleDeletedArtworkInArtistList(art)
      handleDeletedArtworkInExhibitionArray(art)
    })
  } 
  else {
    setDelIsClicked(true)
    setMessage(`Warning! ${art.title} is part of ${art.exhibition_title} exhibition. It will be deleted from ${art.exhibition_title}, if you continue.`)
    artRef.current = art
  }
}

const handleDecline = () => {
  setDelIsClicked(false)
  setMessage('')
}


  return (
  <>
  <div >
    <AddArtwork />
  </div>
  <div className='displaySelectedPaintingWrapper'>
    <DisplaySelectedPaintings handleDeleteBtnClick={handleDeleteBtnClick} selectedArtist={selectedArtist} />
    {delIsClicked === true ? <DialogBox artRef={artRef} message={message} handleDecline={handleDecline} /> : null }

  </div>
  </>
  )
}
