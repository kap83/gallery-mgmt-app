import React, {useState, useContext, useEffect, Fragment} from 'react'
import {useLocation} from 'react-router-dom'
import {ArtistContext} from '../Context/Artist'
import ReadOnlyExhibition from './ReadOnlyExhibition'
import EditExhibition from './EditExhibition'



export default function ExhibitionDetails() {


    const location = useLocation()
    const selectedExhibition = location.state.e

    const {artistList} = useContext(ArtistContext)
    const [artistId, setArtistId] = useState('')
    const [selectedArtist, setSelectedArtist] = useState([])
    const [selectedPaintings, setSelectedPaintings] = useState([])
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
      const artist = artistList.filter(a => parseInt(artistId) === a.id )
      setSelectedArtist(artist)
    }, [artistId])

    const handleEditToggleClick = () => {
      setIsEditing(!isEditing)
    }
   
    function enLargeImg (img) {
      if (img) {
        const isEnlarged = img.style.transform === "scale(3)"

      if (isEnlarged) {
        img.style.transform = ""
        img.style.transition = "transform 0.25s ease"
      } else {
        img.style.transform = "scale(3)"
        img.style.transition = "transform 0.25s ease"
      }
      } 
    }
    const handleSelectedPaintings = (artId, title) => {
      const isSelected = selectedPaintings.some(
        (painting) => painting.id === artId
      );
  
      setSelectedPaintings((prevSelectedPaintings) =>
        isSelected
          ? prevSelectedPaintings.filter((painting) => painting.id !== artId)
          : [...prevSelectedPaintings, { id: artId, title, artist: selectedArtist.name }]
      );
    };

 
  return (
    <>
    <form>
    {
      isEditing ? 
      <EditExhibition 
        selectedExhibition={selectedExhibition} 
        handleEditToggleClick={handleEditToggleClick}
        /> : 
      <ReadOnlyExhibition 
        handleEditToggleClick={handleEditToggleClick} 
        selectedExhibition={selectedExhibition} 
        />
    }

    <div className='selectedPaintingsForm'>
        <h4>Selected Painting Titles:</h4>
        {selectedPaintings.map((painting) => (
          <div key={painting.id}>
            {painting.title} 
          </div>
        ))}
        <button type='submit'>SUBMIT</button>
    </div>
    <br /> 
    <br /> 
    <br /> 
    <br /> 
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
            <div key={art.id} className='container'>
              <div  className='imageContainer'> 
                <img  
                  className='chooseImg' 
                  src={art.paintings_url[0]} 
                  alt={art.title}
                  onClick={(e) => enLargeImg(e.target)}
                />  
                 <label>
                  <p className='pCheckbox'>{art.title}
                  <input 
                    className='checkbox' 
                    type='checkbox' 
                    value={art.id}
                    checked={selectedPaintings.some(
                      (painting) => painting.id === art.id
                    )}
                    onChange={() => handleSelectedPaintings(art.id, art.title)}
                  />
                  </p>
                  <p>{art.medium}</p>
                  
                  </label>
              </div>
            </div>
          ))
        ))
      }
    </div>

    </form>
    </>
  )
}
