import React, {useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {ArtistContext} from '../../Context/Artist'
import AddArtwork from '../AddArtwork'
import DisplaySelectedPaintings from '../DisplaySelectedPaintings'


export default function ArtistDetails() {

  const {findArtist, artistList, selectedArtist} = useContext(ArtistContext)

  const {id} = useParams()
  const parseId = parseInt(id)


  useEffect(() => {
      findArtist(parseId)
    // eslint-disable-next-line
  }, [parseId, artistList])
  //triggers an update to selectedArtist state



  return (
    <>
    <AddArtwork />
    <DisplaySelectedPaintings selectedArtist={selectedArtist} />
    </>
  )
}
