import React, { useContext} from 'react'
import {UserContext} from '../../Context/User'
import { ExhibitionContext } from '../../Context/Exhibition'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorHandling from '../ErrorHandling'


export default function AddExhibition() {


  const {handleCurrentUserNewExhibition} = useContext (UserContext)
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
    <div  className='addNewDataStyle'>
       <h2 id ='addNewDataExhibitionH2' >Create A New Exhibition</h2>
       <form id='addExhibitionForm' onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
            <td className='addNewDataTextStyle'>Title:</td>
            <td>
              <input 
              className='addNewDataInputStyle'
              type='text'
              name='exhibitionTitle'
              id='addNewDataExhibitionInput'
              />
            </td>
            </tr>
            <tr>
            <td className='addNewDataTextStyle'>Gallery:</td>
            <td>
              <input 
              className='addNewDataInputStyle'
              type='text'
              name='gallery'
              id='addNewDataExhibitionInput'/>
            </td>
            </tr>
            <tr>
            <td className='addNewDataTextStyle'>Starts:</td>
            <td>
              <input
              className='addNewDataInputStyle'
              type='date'
              name='starts'
              id='addNewDataExhibitionInput'/>
            </td>
          </tr>
          <tr>
            <td className='addNewDataTextStyle'>Ends:</td>
            <td>
              <input
              className='addNewDataInputStyle'
              type='date'
              name='ends'
              id='addNewDataExhibitionInput'/>
            </td>
          </tr>
          <tr>
      
            <td colSpan={2}>
              <button
                className='btn'
                id='addNewDataExhibitionBtn'
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
    </div>


    
  )
}
