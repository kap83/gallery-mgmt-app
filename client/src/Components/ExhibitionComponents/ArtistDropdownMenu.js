import React, {useState, useContext, useEffect} from 'react'
import {ArtistContext} from '../../Context/Artist'

export default function ArtistDropdownMenu() {

    const [artistId, setArtistId] = useState('default')
    const {artistList, findArtist} = useContext(ArtistContext)

    const sortedArtist = artistList.sort((a, b) => a.name.localeCompare(b.name))

    const handleSelectChange = (e) => {
        setArtistId(e.target.value)
      }
    
    useEffect(() => {
    let parsedId = parseInt(artistId)
    findArtist(parsedId)

    // Scroll down when an option is chosen
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
    // eslint-disable-next-line
    }, [artistId])

  
  return (
    <div className='artistSelect'>
        <h4>
            SELECT BY: <span>(Alphabetically by name)</span>
        </h4>
        <select
        name='artists'
        value={artistId}
        onChange={handleSelectChange}
        id='artists'
        >
        <option value='default'>Select An Artist</option>
        {sortedArtist?.map((artist) => (
        <option name='artist_id' key={artist.id} value={artist.id}>
          {artist.name}
        </option>
      ))}
    </select>
  </div>
  )
}
