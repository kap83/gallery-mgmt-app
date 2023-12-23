import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ArtistContext } from '../Context/Artist'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorHandling from './ErrorHandling'

export default function AddArtwork() {
  const { handleArtistAddedArtwork } = useContext(ArtistContext)
  const { id } = useParams()
  const parseId = parseInt(id)

  //async keyword is used in context of arrow function, creating an async function named 'handleSubmit' & declaring that the function will operate asynchronously (ie returning a promise)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('title', e.target.elements.title.value)
    formData.append('medium', e.target.elements.medium.value)
    formData.append('paintings', e.target.elements.paintings.files[0])
    formData.append('artist_id', parseId)
  
    //create a new instance of the Promise obj. 
    const myPromise = new Promise((resolve, reject) => {
      fetch(`/artworks`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json().then((data) => {
              resolve(data)
              handleArtistAddedArtwork(data) 
              document.getElementById("artworkForm").reset()
            });
          } else {
            return response.json().then((data) => {
              //const errorMsgs = data.errors
              reject(data)
            });
          }
        })
        .catch((error) => {
          reject(error)
        });
    });
  
    //takes two parameters myPromise (which is the promise obj to monitor & {} (how i want the result of the promise handled )
    toast.promise(myPromise, {
      pending: { render: "Processing!" },
      success: "Success! ",

      //create a component and send the message through 
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
      <form id='artworkForm' onSubmit={handleSubmit}>
        <div>
          <label className='addArtworkFontStyle'>Title:</label>
          <input
            className='addArtworkInputStyle'
            id='artworkMedium'
            type='text'
            name='title'
          />
          <label className='addArtworkFontStyle'>Medium: </label>
          <input
            className='addArtworkInputStyle'
            
            type='text'
            name='medium'
          />
          <label htmlFor='uploadFields' />
          <input
            className='addArtworkFileStyle'
            type='file'
            name='paintings'
          />
          <button
            className='btn'
            id='addArtWorkBtn'
            type='submit'>
            Submit
          </button>
        </div>
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
        theme="colored"
      />
    </>
  );
}
