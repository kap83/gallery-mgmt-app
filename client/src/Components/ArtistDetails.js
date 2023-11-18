import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {ArtworkContext} from '../Context/Artwork'
import AddArtwork from './AddArtwork'

export default function ArtistDetails() {

  const {artworksData} = useContext(ArtworkContext)

  const {id} = useParams()
  const parseId = parseInt(id)
  

  const [artworks, setArtworks] = useState([])

  useEffect(() => {
    const findArtwork = artworksData.filter(art => art.artist_id === parseId)
    setArtworks(findArtwork)
  }, [parseId, artworksData])

  console.log(artworks)
    
  return (
    <>
    <AddArtwork />

    {
      artworks.map(art =>   
        (
        <div key={art.id}>
          <img src={art.paintings_url[0]} alt={art.title}/>
          <p>{art.title} ({art.medium})</p>
        </div>
      )
      )
    }
    </>
  )
}
