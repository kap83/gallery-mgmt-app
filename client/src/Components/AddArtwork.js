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
      pending: { render: "I'm loading" },
      success: "Artwork added successfully",

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
          <label style={{ marginLeft: '30px', fontWeight: 'bold' }}>TITLE:</label>
          <input
            style={{ marginLeft: '3px', marginRight: '5px', width: '200px' }}
            type='text'
            name='title'
          />

          <label style={{ fontWeight: 'bold' }}>MEDIUM: </label>
          <input
            style={{ marginLeft: '3px', marginRight: '5px', width: '200px' }}
            type='text'
            name='medium'
          />

          <label htmlFor='uploadFields' />
          <input
            className='loginBtnStyle'
            type='file'
            name='paintings'
          />
          <button
            style={{ fontWeight: 'bold' }}
            type='submit'>
            SUBMIT
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
