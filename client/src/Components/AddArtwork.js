import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ArtistContext } from '../Context/Artist';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddArtwork() {
  const { handleArtistAddedArtwork } = useContext(ArtistContext);
  const { id } = useParams();
  const parseId = parseInt(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', e.target.elements.title.value);
    formData.append('medium', e.target.elements.medium.value);
    formData.append('paintings', e.target.elements.paintings.files[0]);
    formData.append('artist_id', parseId);
  
    const myPromise = new Promise((resolve, reject) => {
      fetch(`/artworks`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json().then((data) => {
              resolve(data);
              handleArtistAddedArtwork(data) 
              document.getElementById("artworkForm").requestFullscreen()
            });
          } else {
            return response.json().then((data) => {
              reject(data.errors);
            });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  
    toast.promise(myPromise, {
      pending: { render: "I'm loading" },
      success: "Artwork added successfully",
      error: (errorMsgs) => `Error: ${errorMsgs.join(', ')}`,
    });
  };

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
      <ToastContainer />
    </>
  );
}
