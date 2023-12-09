import React, {useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {ArtistContext} from '../../Context/Artist'
import AddArtwork from '../AddArtwork'
import DisplaySelectedPaintings from '../DisplaySelectedPaintings'


export default function ArtistDetails() {

  const {findArtist, selectedArtist} = useContext(ArtistContext)

  const {id} = useParams()
  const parseId = parseInt(id)
  //console.log("in artist", selectedArtist)


  useEffect(() => {
      findArtist(parseId)
    // eslint-disable-next-line
  }, [parseId])



  return (
    <>
    <AddArtwork />
    <DisplaySelectedPaintings selectedArtist={selectedArtist} />
    </>
  )
}