import React, {useContext} from 'react'
import {ArtistContext} from '../../Context/Artist'
import {Link} from 'react-router-dom'


export default function DisplayArtists() {

  const {artistList} = useContext(ArtistContext)

  
  return (
    <>
     {artistList.map(artist => {
      artist.date_of_birth = new Date(artist.date_of_birth).toLocaleDateString('en-US')
      return (
           <Link
      to={`/artist/${artist.id}`}
        >
        <ul >
          <li key={artist.id}>{artist.name} (DOB: {artist.date_of_birth})</li>
        </ul>
      </Link>
      )
     })}

    </>
  )
}
