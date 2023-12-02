import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {ArtistContext} from '../Context/Artist'
import AddArtwork from './AddArtwork'
import Masonry from 'react-masonry-css'

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


  const breakpointColumnsObj = {
    //default number of columns
    default: 3,
    //when it screen reaches 1100px, reduce to 3 columns
    1100: 2,
    //700px and down reduce to 2 columns
    700: 1,
  };

    
  return (
    <>
    <AddArtwork />

    {
      selectedArtist.map(artist => (
        <div key={artist.id}>
            <h1 style={{textAlign: 'center'}}>{artist.name}</h1>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column">
            {artist.artworks.map(art => (
              <div key={art.id}>
                <h3 style={{marginLeft: 'inherit'}}>{art.title}</h3>
                <p style={{marginTop: '-20px'}}>({art.medium})</p>
                <img 
                src={art.paintings_url[0]} 
                alt={art.title}
                style={{ maxWidth: '200%', height: 'auto' }}
                />
               </div>
            )
            )}
          </Masonry>
        </div>
      ))
    }
    </>
  )
}
