import React, {useState, useContext, useEffect, Fragment} from 'react'
import {useLocation} from 'react-router-dom'
import {ArtistContext} from '../Context/Artist'

export default function ExhibitionDetails() {

  //TO DO
    //EDIT FUNCTIONALITY
    //CHOOSE ARTIST FUNCTIONALITY --> PATCH

    const location = useLocation()
    const selectedExhibition = location.state.e

    const {artistList} = useContext(ArtistContext)
  
    
    const [artistId, setArtistId] = useState('')
  

    const [selectedArtist, setSelectedArtist] = useState([])

    useEffect(() => {
      const artist = artistList.filter(a => parseInt(artistId) === a.id )
      setSelectedArtist(artist)
    }, [artistId])

   
    function enLargeImg (img) {
      if (img) {
        const isEnlarged = img.style.transform === "scale(2)"

      if (isEnlarged) {
        img.style.transform = ""
        img.style.transition = "transform 0.25s ease"
      } else {
        img.style.transform = "scale(2)"
        img.style.transition = "transform 0.25s ease"
      }
      }


      
    }
 
  return (
    <>
    <div className='exhibitionH2and3 '>
      <h2>
        {selectedExhibition.title}
      <button>EDIT</button>
      </h2>
      <h3>
        {selectedExhibition.start_date} - {selectedExhibition.end_date}
        <button>EDIT</button>
      </h3>
    </div>
    <div className='ArtistSelect'>
      <select name='artists' 
        value={artistId} 
        onChange={(e)=>setArtistId(e.target.value)} 
        id='artists'>
          <option value='default'>Select An Artist</option>
          {artistList.map(artist => (
          <option name='artist_id' key={artist.id} value={artist.id}> 
            {artist.name}
          </option>
          ))}
      </select>
    </div>
    <br /> 
    <br /> 
    <div>
      {
        selectedArtist.map(artist => (
          artist.artworks.map(art => (
            <div className='container'>
              <div className='imageContainer'>   
                {/* <input className='checkbox' type='checkbox' id='artCheckbox' /> */}
                {/* <label for='artCheckbox'> */}
                  <img key={art.id} id={art.id}
                  className='chooseImg' 
                  src={art.paintings_url[0]} 
                  alt={art.title}
                  onClick={(e) => enLargeImg(e.target)}

                  />
                {/* </label> */}
                <p>{art.title}, ({art.medium})</p>
              </div>
            </div>
          ))
        ))
      }
    </div>
    </>
  )
}
