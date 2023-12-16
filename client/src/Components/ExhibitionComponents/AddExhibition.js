import React, { Fragment, useContext} from 'react'
import {UserContext} from '../../Context/User'
import { ExhibitionContext } from '../../Context/Exhibition'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorHandling from '../ErrorHandling'


export default function AddExhibition() {

  //TO DO: ADD USENAVIGATE TO NAVIGATE TO THE EXHIBITION PAGE AFTER SUBMISSION IS SUCCESSFUL

  const {currentUser, handleCurrentUserNewExhibition} = useContext (UserContext)
  const {handleNewExhibition} = useContext(ExhibitionContext)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('title', e.target.elements.exhibitionTitle.value)
    formData.append('gallery', e.target.elements.gallery.value)
    formData.append('start_date', e.target.elements.starts.value)
    formData.append('end_date', e.target.elements.ends.value)

    const myPromise = new Promise((resolve, reject) => {
      fetch(`/exhibitions/`, {
         method: 'POST',
        body: formData
         })
        .then((res) => {
          if (res.ok) {
            return res.json().then((data) => {
              resolve(data)
              console.log(data)
              handleCurrentUserNewExhibition(data)
              handleNewExhibition(data)
              document.getElementById("addExhibitionForm").reset()
              setTimeout(()=> {
                //e bc of location.state.e
              navigate(`/exhibition/${data.id}`, {state: {e : data}})
            }, 2000)
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
    <Fragment >
      <div className='exhibitionAvatar'>
        <img src={currentUser.avatar_url} alt={currentUser.username} />
      </div>
      <h1 className='exhibitionH1'>Create A New Exhibition</h1>
    <form id='addExhibitionForm' onSubmit={handleSubmit}>
      <table className='addExhibitionStyle'>
        <tbody>
          <tr>
            <td className='exhibitionFont'>Title:</td>
            <td>
              <input
              className='exhibitionInputStyle'
              type='text'
              name='exhibitionTitle' 
              />
            </td>
          </tr>

          <tr>
            <td className='exhibitionFont'>Gallery:</td>
            <td>
              <input
              className='exhibitionInputStyle'
              type='text'
              name='gallery' 
              />
            </td>
          </tr>

          <tr>
            <td className='exhibitionFont'>Starts:</td>
            <td>
              <input
              className='exhibitionInputStyle'
              type='date'
              name='starts'
              />
            </td>
          </tr>

          <tr>
            <td className='exhibitionFont'>Ends:</td>
            <td>
              <input
              className='exhibitionInputStyle'
              type='date'
              name='ends' 
              />
            </td>
          </tr>
          
          <tr>
            <td></td>
            <td>
              <button
                className='btn' 
                type='submit'>
                Submit
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

    </Fragment>
  )
}
