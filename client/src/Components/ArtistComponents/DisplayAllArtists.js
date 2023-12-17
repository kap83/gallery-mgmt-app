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
      artist.date_of_birth = new Date(artist.date_of_birth).toLocaleDateString('en-US')
      return (

      <Link className='linkStyle' key={artist.id} to={`/artist/${artist.id}`}>
        <ul>
          <li>{artist.name} DOB: {artist.date_of_birth}</li>
        </ul>
      </Link>
      )
     })}

    </div>
  )
}
