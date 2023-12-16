import React, {useState, useContext} from 'react'
import {ArtistContext} from '../../Context/Artist'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorHandling from '../ErrorHandling'

export default function AddArtist() {

const {handleAddedArtist} = useContext(ArtistContext)

const [checked, setChecked] = useState(false)

const handleChange = () => {
  setChecked(!checked)
}

const handleSubmit = (e) => {

    e.preventDefault()

    const formData = new FormData()

    if(checked === true) {
      formData.append('name', e.target.elements.artistName.value)
      formData.append('date_of_birth', e.target.elements.dob.value)
      formData.append('artwork[title]', e.target.elements.title.value)
      formData.append('artwork[medium]', e.target.elements.medium.value)
      formData.append('artwork[paintings]', e.target.elements.paintings.files[0])

    } else {
      formData.append('name', e.target.elements.artistName.value)
      formData.append('date_of_birth', e.target.elements.dob.value)
    }

    const myPromise = new Promise((resolve, reject) => {
      fetch(`/artists`, {
         method: 'POST',
        body: formData
         })
        .then((res) => {
          if (res.ok) {
            return res.json().then((data) => {
              resolve(data)
              handleAddedArtist(data)
              document.getElementById("addArtistForm").reset()
            });
          } else {
            return res.json().then((data) => {
              reject(data)
            });
          }
        })
        .catch((error) => {
          reject(error)
        });
    });

    toast.promise(myPromise, {
      pending: { render: "Processing!" },
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
      <form id='addArtistForm' className='myToast'  onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>NAME:</td>
            <td>
              <input
              type='text'
              name='artistName'
              />
            </td>
          </tr>
          <tr>
            <td>DATE OF BIRTH:</td>
            <td>
              <input
              type='date'
              name='dob'
              />
            </td>
          </tr>
            <tr>
                <td>Upload Art?</td>
                <td>
                    <input 
                    type='checkbox' 
                    value={checked}
                    onChange={handleChange}    
                    />
                </td>
            </tr> 
            <tr>
                <td>
                   
                </td>
            </tr>
            </tbody>
      </table>
      <table>
      <tbody>
    
            {checked ? 
            
                    <tr>
                       
                     <td>
                     <label htmlFor='uploadFields'/>
                     TITLE:
                     </td>
                     <td>
                        <input 
                            type='text'
                            name='title'
                        />
                        </td>
                        <td>
                        medium: 
                        </td>
                      <td>
                        <input 
                            type='text'
                            name='medium'
                        />
                        </td>
                          <td>
                        <input 
                            type='file'
                            name='paintings'
                        />
                        </td>
                    </tr>
                : null }
          <tr>
            <td>
              <button
                className='btn'
                type='submit'>
                SUBMIT
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
