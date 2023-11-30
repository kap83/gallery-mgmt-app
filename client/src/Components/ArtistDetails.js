import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {ArtistContext} from '../Context/Artist'
import AddArtwork from './AddArtwork'

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
    {
      selectedArtist.map(artist => (
        <div key={artist.id}>
            <h2>{artist.name}</h2>
            {artist.artworks.map(art => (
              <div key={art.id}>
                <img className='chooseImg' src={art.paintings_url[0]} alt={art.title}/>
                <p>{art.title} ({art.medium})</p>
              </div>
            )
            )}
        </div>
      ))
    }
    </>
  )
}
