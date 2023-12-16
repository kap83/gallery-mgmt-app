import React, {useState, useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {ArtistContext} from '../../Context/Artist'
import { ExhibitionContext } from '../../Context/Exhibition'
import { UserContext } from '../../Context/User'
import ReadOnlyExhibitionInputFields from './ReadOnlyExhibitionInputFields'
import EditExhibitionInputFields from './EditExhibitionInputFields'
import DisplaySelectedPaintings from '../DisplaySelectedPaintings'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorHandling from '../ErrorHandling'
import UnauthExhibitionDetails from './UnauthExhibitionDetails'

export default function ExhibitionDetails() {

   const { id } = useParams()
   const parsedExhibitionId = parseInt(id)
    
   const {currentUser} = useContext(UserContext)
    const {artistList, findArtist, selectedArtist} = useContext(ArtistContext)
    const {exhibitionsArray, handleUpdatedExhibition} = useContext(ExhibitionContext)
    

    const [selectedExhibition, setSelectedExhibition] = useState({
      id: '',
      title: '',
      gallery: '',
      start_date: '',
      end_date: '',
      artworks: []
    })
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

  
    console.log("ExDeets", selectedPaintings)


    useEffect(() => {
        const findExhibition = exhibitionsArray && exhibitionsArray.filter(exhibition => exhibition.id === parsedExhibitionId)
        setSelectedExhibition(findExhibition[0])
        setFormValues(findExhibition[0])
        setSelectedPaintings(findExhibition[0]?.artworks)
        // eslint-disable-next-line
    }, [parsedExhibitionId, exhibitionsArray])

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

    const handleSelectedPaintings = (artId, title, painting ) => {
      console.log("in handle", painting)
     // console.log("in handleSelectedPainting fn", artId, title)
      const isSelected = selectedPaintings.some(
        (painting) => painting.id === artId
      )
  
      setSelectedPaintings((prevSelectedPaintings) =>
        isSelected
          ? prevSelectedPaintings.filter((painting) => painting.id !== artId)
          : [...prevSelectedPaintings, { id: artId, paintings_url: [ painting], title}]
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
        pending: { render: "Processing" },
        success: "Success! 🎉",
  
        error: {
          render({ data }) {
            console.error("in error", data);
            return <ErrorHandling errors={data && data.errors} />
          }
        }
      })
      
    }
    
    console.log("selected", selectedPaintings)
 
    return (
      <>
  {selectedExhibition && currentUser?.id === selectedExhibition?.user_id ? (
    <>
    <form onSubmit={handleSubmit}>

      {isEditing ? (
        <EditExhibitionInputFields
          selectedExhibition={selectedExhibition}
          handleEditToggleClick={handleEditToggleClick}
          handleFormChanges={handleFormChanges}
        />
      ) : (
        <ReadOnlyExhibitionInputFields
          handleEditToggleClick={handleEditToggleClick}
          selectedExhibition={selectedExhibition}
        />
      )}

      {/* Display selectedPaintings's art/titles under Selected Paintings Title*/}

  <div className='selectedPaintingsGalleryMargin'>
  <h4>Selected Painting Titles:</h4>
  <div className='selectedPaintingsGallery'>
    {selectedPaintings?.map((painting) => (
      
        <>
          <img
          key={painting.id}
          src={Array.isArray(painting.paintings_url) ? painting.paintings_url[0] : painting.paintings_url}
          alt={painting.title}
          className="selectedPaintingsGalleryItem"
        />
        </>
      ))}
  </div>
  <button style={{ borderRadius: '3px', marginLeft: '3px', marginTop: '1%' }} type='submit'>
    SUBMIT ARTWORK
  </button>
</div>


      {/* dropdown menu for artists */}
      
    <div className='artistSelect'>
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

    <DisplaySelectedPaintings
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

  ) : (
    <UnauthExhibitionDetails selectedExhibition={selectedExhibition} />
  )}
</>

  )
}
