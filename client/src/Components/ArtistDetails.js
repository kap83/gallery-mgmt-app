import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {ArtistContext} from '../Context/Artist'
import AddArtwork from './AddArtwork'
import DisplaySelectedArtistImg from './DisplaySelectedArtistImg'


export default function ArtistDetails() {

  const {artistList} = useContext(ArtistContext)

  const {id} = useParams()
  const parseId = parseInt(id)
  
  const [selectedArtist, setSelectedArtist] = useState([])
  console.log("in artist", selectedArtist)


  useEffect(() => {
    const findArtist = artistList.filter(artist => artist.id === parseId)
    setSelectedArtist(findArtist)
  }, [parseId, artistList])



  return (
    <>
    <AddArtwork />
    <DisplaySelectedArtistImg selectedArtist={selectedArtist} />
    </>
  )
}
