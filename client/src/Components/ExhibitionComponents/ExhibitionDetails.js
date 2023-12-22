import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../Context/User'
import { ExhibitionContext } from '../../Context/Exhibition'
import ReadOnlyExhibitionInputFields from './ReadOnlyExhibitionInputFields'
import EditExhibitionInputFields from './EditExhibitionInputFields'
import UnauthExhibitionDetails from './UnauthExhibitionDetails'
import DisplaySelectedPaintings from '../DisplaySelectedPaintings'
import PreviouslyChosenPaintings from './PreviouslyChosenPaintings'
import ArtistDropdownMenu from './ArtistDropdownMenu'
import { ToastContainer, toast } from 'react-toastify'
import ErrorHandling from '../ErrorHandling'
import 'react-toastify/dist/ReactToastify.css'

export default function ExhibitionDetails({ selectedExhibition }) {

  const {currentUser} = useContext(UserContext)
  const {handleUpdatedExhibition} = useContext(ExhibitionContext)

  //patch request should update paintings on remove or add (make backendlogic)

  const [isEditing, setIsEditing] = useState(false)
  const [formValues, setFormValues] = useState({
    id: '',
    title: '',
    gallery: '',
    start_date: '',
    end_date: '',
    artworks: []
  });

  //console.log("form", formValues)

  useEffect(() => {
    setFormValues(selectedExhibition)
  }, [selectedExhibition])

  const handleEditToggleClick = () => {
    setIsEditing(!isEditing)
  }

  const handleFormChanges = (e) => {
    e.preventDefault() 
    setFormValues(formValues => ({
      ...formValues, 
      [e.target.name]: e.target.value
    })) 
  }
  
  const handleSelectedPaintings = (artId, title, painting ) => {
    // console.log("in handleSelectedPainting fn", artId, title)

     const isSelected = formValues.artworks.some(
       (painting) => painting.id === artId
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

  
  return (
    <>
    <form onSubmit={handleSubmit}>

      {currentUser.id === selectedExhibition.user_id ? ( 
        <>
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
          <PreviouslyChosenPaintings selectedExhibition={selectedExhibition} />
          <ArtistDropdownMenu  />
          <DisplaySelectedPaintings
            formValues={formValues}
            selectedExhibition={selectedExhibition}
            handleSelectedPaintings={handleSelectedPaintings}
            />
        </>
      ) : (
        <UnauthExhibitionDetails selectedExhibition={selectedExhibition} /> 
      )}

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
          theme="light" /> 
    </>
  );
}
