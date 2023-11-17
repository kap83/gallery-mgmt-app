import React, {useContext} from 'react'
import {ArtistContext} from '../Context/Artist'


export default function DisplayArtists() {

  const {artistList} = useContext(ArtistContext)

  console.log(artistList)



  return (
    <>
     {artistList.map(artist => (
      <ul >
        <li key={artist.id}>{artist.name} {artist.date_of_birth}</li>
      </ul>
     ))}

    </>
  )
}
