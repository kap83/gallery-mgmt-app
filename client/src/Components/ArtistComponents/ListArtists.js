import React, {useContext} from 'react'
import {ArtistContext} from '../../Context/Artist'
import {Link} from 'react-router-dom'


export default function DisplayAllArtists() {

  const {artistList} = useContext(ArtistContext)


  const sortedArtist = artistList.sort((a, b) => a.name.localeCompare(b.name))
  
  return (
    <div className='displayAllArtistsStyle'>
      <h2>Current Collection</h2>
     {sortedArtist.map(artist => {
      return (
      <Link className='linkStyle' key={artist.id} to={`/artist/${artist.id}`}>
        <ul>
          <li>{artist.name}</li>
        </ul>
      </Link>
      )
     })}

    </div>
  )
}
