import React, { useContext} from 'react'
import {UserContext} from '../Context/User'
import '../index.css'

export default function AddExhibition() {

  // eslint-disable-next-line
  const {currentUser} = useContext (UserContext)


  // console.log(currentUser)

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const formInput = Object.fromEntries(formData)
   
    console.log(formInput)
    //if there's a problem with fetch on the backend, see if the source is name='paintings[]' in the art input


  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>TITLE:</td>
            <td>
              <input
              type='text'
              name='title' 
              />
            </td>
          </tr>
          <tr>
            <td>GALLERY:</td>
            <td>
              <input
              type='text'
              name='gallery' 
              />
            </td>
          </tr>
          <tr>
            <td>STARTS:</td>
            <td>
              <input
              type='date'
              name='starts'
              />
            </td>
          </tr>
          <tr>
            <td>ENDS:</td>
            <td>
              <input
              type='date'
              name='ends' 
              />
            </td>
          </tr>
          <tr>
          <td>PAINTINGS:</td>
          <td>
            <input
              type='file'
              name='paintings[]' 
              multiple="multiple"
              />
          </td>
          </tr>
          <tr>
            <td>
              <img src={currentUser.avatar_url} alt={currentUser.username} />
            </td>
          </tr>
          <tr>
            <td>
              <button 
                type='submit'>
                SUBMIT
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>

    </>
  )
}
