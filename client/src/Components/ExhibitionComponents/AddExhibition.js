import React, { useContext, useState} from 'react'
import {UserContext} from '../../Context/User'
import { ExhibitionContext } from '../../Context/Exhibition'
import { useNavigate } from 'react-router-dom'


export default function AddExhibition() {

  //TO DO: ADD USENAVIGATE TO NAVIGATE TO THE EXHIBITION PAGE AFTER SUBMISSION IS SUCCESSFUL

  const {currentUser, handleCurrentUserNewExhibition} = useContext (UserContext)
  const {handleNewExhibition} = useContext(ExhibitionContext)
  const navigate = useNavigate()


  // console.log(currentUser)

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('title', e.target.elements.exhibitionTitle.value)
    formData.append('gallery', e.target.elements.gallery.value)
    formData.append('start_date', e.target.elements.starts.value)
    formData.append('end_date', e.target.elements.ends.value)


    fetch(`/exhibitions/`, {
      method: 'POST',
      body: formData
    })
    .then(res => {
      if(res.ok) {
        res.json()
        .then(data => {
            //console.log("fetch worked", data.id)
            handleCurrentUserNewExhibition(data)
            handleNewExhibition(data)
            document.getElementById("addExhibitionForm").reset()
            setTimeout(()=> {
              navigate(`/exhibition/${data.id}`)
            }, 10000)
        })
      }
      else {
        res.json()
        .then(data => {
          console.log("error", data)
        })
      }
    })
  }

  return (
    <>
    <form id='addExhibitionForm' onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>EXHIBITION TITLE:</td>
            <td>
              <input
              type='text'
              name='exhibitionTitle' 
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
