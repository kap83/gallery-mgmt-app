import React, {useContext} from 'react'
import {ArtistContext} from '../../Context/Artist'
import {Link} from 'react-router-dom'


export default function DisplayAllArtists() {

  const {artistList} = useContext(ArtistContext)
  
  
  return (
    <div style={{marginTop: '50px'}}>
     {artistList.map(artist => {
      artist.date_of_birth = new Date(artist.date_of_birth).toLocaleDateString('en-US')
      return (

      <Link key={artist.id} to={`/artist/${artist.id}`}>
        <ul>
          <li style={{fontSize: '20px'}}>{artist.name} DOB: {artist.date_of_birth}</li>
        </ul>
      </Link>
      )
     })}

    </div>
  )
}
