import React, {useState, useContext, useEffect, Fragment} from 'react'
import {useLocation} from 'react-router-dom'
import {ArtistContext} from '../Context/Artist'
import ReadOnlyExhibition from './ReadOnlyExhibition'
import EditExhibition from './EditExhibition'
import DisplaySelectedArtistImg from './DisplaySelectedArtistImg'


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
    //removed artworks: [] b/c i only will only want to send the artworks ids to the backend, see handleSelectedPaintings
    const [formValues, setFormValues] = useState({
      id: '',
      title: '',
      gallery: '',
      start_date: '',
      end_date: ''
    });

    //console.log("form vals", formValues)
    //console.log("sel", selectedPaintings)


    useEffect(() => {
        setFormValues(selectedExhibition)
        setSelectedPaintings(selectedExhibition.artworks)
        // eslint-disable-next-line
    }, [])

   //FOR DROP DOWN MENU

    useEffect(() => {
        const artist = artistList.filter(a => parseInt(artistId) === a.id )
        setSelectedArtist(artist)
      // eslint-disable-next-line
    }, [artistId])

    //FOR EDITING HEADER/DATES

    const handleEditToggleClick = () => {
      setIsEditing(!isEditing)
    }

  //HANDLES CHOSEN IMAGES

    const handleSelectedPaintings = (artId, title) => {
      const isSelected = selectedPaintings.some(
        (painting) => painting.id === artId
      )
  
      setSelectedPaintings((prevSelectedPaintings) =>
        isSelected
          ? prevSelectedPaintings.filter((painting) => painting.id !== artId)
          : [...prevSelectedPaintings, { id: artId, title}]
      )

      setFormValues((prevFormValues) => {
        // If a painting is selected, add it to the artworks array
        const newArtworks = isSelected
          ? prevFormValues.artworks.filter((artwork) => artwork.id !== artId)
          : [...prevFormValues.artworks, { id: artId}]
    
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

    
    {/* Display selectedPaintings's art/titles under Selected Paintings Title*/}
    <div className='selectedPaintingsForm'>
        <h4>Selected Painting Titles:</h4>
        {selectedPaintings.map((painting) => (
          <div key={painting.id}>
            {painting.title} 
          </div>
        ))}
    </div>

       {/* to make submit button appear */}

 
       { isEditing || selectedPaintings.length !== 0 ?
          <div>
          <button type='submit'>SUBMIT</button>
          <button onClick={handleEditToggleClick}>CANCEL</button>
         </div> 
            : null 
      
      }
        <br /> 

    {/* dropdown menu for artists */}

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

    <DisplaySelectedArtistImg 
      selectedPaintings={selectedPaintings}
      selectedArtist={selectedArtist} 
      handleSelectedPaintings={handleSelectedPaintings}
    />

   
    </form>
    </>
  )
}
