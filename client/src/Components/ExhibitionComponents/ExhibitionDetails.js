import React, {useState, useContext, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {ArtistContext} from '../../Context/Artist'
import { ExhibitionContext } from '../../Context/Exhibition'
import ReadOnlyExhibitionInputFields from './ReadOnlyExhibitionInputFields'
import EditExhibitionInputFields from './EditExhibitionInputFields'
import DisplaySelectedPaintings from '../DisplaySelectedPaintings'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorHandling from '../ErrorHandling'


export default function ExhibitionDetails() {

    const location = useLocation()
    const selectedExhibition = location.state.e

    const {artistList, findArtist, selectedArtist} = useContext(ArtistContext)
    const {handleUpdatedExhibition} = useContext(ExhibitionContext)

    const [artistId, setArtistId] = useState('')
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

    //console.log("in ex deets", typeof artistList)
    //console.log("sel", exhibitionsCurrentArtworks)


    useEffect(() => {
        setFormValues(selectedExhibition)
        setSelectedPaintings(selectedExhibition.artworks)
        // eslint-disable-next-line
    }, [selectedExhibition])

   //FOR DROP DOWN MENU

    useEffect(() => {
      let parsedId = parseInt(artistId)
      findArtist(parsedId)
      // eslint-disable-next-line
    }, [artistId])

    //FOR EDITING HEADER/DATES

    const handleEditToggleClick = () => {
      setIsEditing(!isEditing)
    }

  //HANDLES CHOSEN IMAGES

    const handleSelectedPaintings = (artId, title) => {
     // console.log("in handleSelectedPainting fn", artId, title)
      const isSelected = selectedPaintings.some(
        (painting) => painting.id === artId
      )
  
      setSelectedPaintings((prevSelectedPaintings) =>
        isSelected
          ? prevSelectedPaintings.filter((painting) => painting.id !== artId)
          : [...prevSelectedPaintings, { id: artId, title}]
      )

      //adds artwork ids to formValues
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

    //handles changes for exhibition title, dates and galleries
    const handleFormChanges = (e) => {
      e.preventDefault() 
      setFormValues(formValues => ({...formValues, [e.target.name]: e.target.value}))

    }

    //FETCH:POST

    const handleSubmit = (e) => {
      e.preventDefault()

      const myPromise = new Promise((resolve, reject) => {
        fetch(`/exhibitions/${selectedExhibition.id}`, {
           method: 'PATCH',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(formValues)
           })
          .then((res) => {
            if (res.ok) {
              return res.json().then((data) => {
                resolve(data)
                handleUpdatedExhibition(data)
                setSelectedPaintings(data.artworks)
                setIsEditing(false)
                setFormValues({})
              });
            } else {
              return res.json().then((data) => {
                reject(data)
              });
            }
          })
          .catch((error) => {
            console.error(error)
            reject(error)
          });
      });

      toast.promise(myPromise, {
        pending: { render: "I'm loading" },
        success: "Edit was successful! 🎉",
  
        error: {
          render({ data }) {
            console.error("in error", data);
            return <ErrorHandling errors={data && data.errors} />
          }
        }
      })

    }

    
  return (
    <>
    <form onSubmit={handleSubmit}>

    {/* edit header and dates */}

    {
      isEditing ? 
      <EditExhibitionInputFields 
        selectedExhibition={selectedExhibition} 
        handleEditToggleClick={handleEditToggleClick}
        handleFormChanges={handleFormChanges}
        /> : 
      <ReadOnlyExhibitionInputFields
        handleEditToggleClick={handleEditToggleClick} 
        selectedExhibition={selectedExhibition} 
        />
    }
    
    {/* Display selectedPaintings's art/titles under Selected Paintings Title*/}
    <div className='selectedPaintingsForm'>
        <h4>Selected Painting Titles:</h4>
        {selectedPaintings?.map((painting) => (
          <div key={painting.id}>
            {painting.title} 
          </div>
        ))}
    </div>


    {/* dropdown menu for artists */}

    <div className='ArtistSelect'>
      <h4>SELECT BY: </h4>
      <select name='artists' 
        value={artistId} 
        onChange={(e)=>setArtistId(e.target.value)} 
        id='artists'>
          <option value='default'>Select An Artist</option>
          {artistList?.map(artist => (
          <option name='artist_id' key={artist.id} value={artist.id}> 
            {artist.name}
          </option>
          ))}
      </select>
    </div>
    <br /> 
    <br /> 

    <DisplaySelectedPaintings
      handleEditToggleClick={handleEditToggleClick}
      selectedPaintings={selectedPaintings}
      selectedArtist={selectedArtist} 
      handleSelectedPaintings={handleSelectedPaintings}
    />

    </form>
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </>
  )
}
