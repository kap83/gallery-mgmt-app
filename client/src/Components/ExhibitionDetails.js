import React, {useState, useContext, useEffect, Fragment} from 'react'
import {useLocation} from 'react-router-dom'
import {ArtistContext} from '../Context/Artist'
import ReadOnlyExhibition from './ReadOnlyExhibition'
import EditExhibition from './EditExhibition'


export default function ExhibitionDetails() {

  //TODO
    //GIVE EDIT/READONLY EXHIBITION MORE DESCRIPTIVE NAMES
      //EG READONLY/EDITHEADER&DATE

    const location = useLocation()
    const selectedExhibition = location.state.e

    const {artistList} = useContext(ArtistContext)
    const [artistId, setArtistId] = useState('')
    const [selectedArtist, setSelectedArtist] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [selectedPaintings, setSelectedPaintings] = useState([])
    const [formValues, setFormValues] = useState({
      id: '',
      title: '',
      gallery: '',
      start_date: '',
      end_date: '', 
      artworks: []
    });

   
    // console.log("form vals", formValues)
    // console.log("sel", selectedPaintings)

    //FOR DROP DOWN MENU

    useEffect(() => {
        setFormValues(selectedExhibition)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const artist = artistList.filter(a => parseInt(artistId) === a.id )
        setSelectedArtist(artist)
      // eslint-disable-next-line
    }, [artistId])

    //FOR EDITING HEADER/DATES

    const handleEditToggleClick = () => {
      setIsEditing(!isEditing)
    }

   
    //WHEN CLICKED, IMAGE ENLARGES OR SHRINKS

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

  //HANDLES CHOSEN IMAGES

    const handleSelectedPaintings = (artId, title, exhibitionId) => {
      const isSelected = selectedPaintings.some(
        (painting) => painting.id === artId
      )
  
      setSelectedPaintings((prevSelectedPaintings) =>
        isSelected
          ? prevSelectedPaintings.filter((painting) => painting.id !== artId)
          : [...prevSelectedPaintings, { id: artId, title, artist: selectedArtist.name }]
      )

      setFormValues((prevFormValues) => {
        // If a painting is selected, add it to the artworks array
        const newArtworks = isSelected
          ? prevFormValues.artworks.filter((artwork) => artwork.id !== artId)
          : [...prevFormValues.artworks, { id: artId, exhibition_id: exhibitionId }]
    
        return {
          ...prevFormValues,
          artworks: newArtworks,
        }
      })
    }

    const handleFormChanges = (e) => {
      e.preventDefault() 
      setFormValues(formValues => ({...formValues, [e.target.name]: e.target.value}))

    }

    //FETCH:POST

    const handleSubmit = (e) => {
      e.preventDefault()

      fetch(`/exhibitions/${selectedExhibition.id}`, {
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(formValues)
      })
      .then(res => res.json())
      .then(data => console.log("in fetch", data))

    }

 
  return (
    <>
    <form onSubmit={handleSubmit}>

    {/* edit header and dates */}

    {
      isEditing ? 
      <EditExhibition 
        selectedExhibition={selectedExhibition} 
        handleEditToggleClick={handleEditToggleClick}
        handleFormChanges={handleFormChanges}
        /> : 
      <ReadOnlyExhibition 
        handleEditToggleClick={handleEditToggleClick} 
        selectedExhibition={selectedExhibition} 
        />
    }

    {/* dropdown menu for artists */}

    <div className='selectedPaintingsForm'>
        <h4>Selected Painting Titles:</h4>
        {selectedPaintings.map((painting) => (
          <div key={painting.id}>
            {painting.title} 
          </div>
        ))}
    </div>
    <br /> 
    <br /> 
    <br /> 
    <br /> 
    <div className='ArtistSelect'>
      <h4>SELECT BY: </h4>
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

      {/* display & enlarge paintings, & selected Paintings are displayed under the dates */}

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
                    onChange={() => handleSelectedPaintings(art.id, art.title, art.exhibition_id)}
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
 
      { isEditing || selectedPaintings.length !== 0 ?
          <div>
          <button type='submit'>SUBMIT</button>
          <button onClick={handleEditToggleClick}>CANCEL</button>
         </div> 
            : null 
      
      }
   

    </form>
    </>
  )
}
