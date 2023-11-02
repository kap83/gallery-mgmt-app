import React, {useState, useContext} from 'react'
import {UserContext} from '../Context/User'

export default function AddExhibition() {

  const {currentUser} = useContext (UserContext)

  console.log("in add", currentUser.id)

  const [title, setTitle] = useState('')
  const [gallery, setGallery] = useState('')
  const [start_date, setStart_date] = useState('')
  const [end_date, setEnd_date] = useState('')





    
  return (
    <>
      👋
    <form>
      <table>
        <tbody>
          <tr>
            <td>TITLE:</td>
            <td>
              <input
              type='text'
              name='title'
              value={title}
              onChange={(e)=> setTitle(e.target.value)} 
              />
            </td>
          </tr>
          <tr>
            <td>GALLERY:</td>
            <td>
              <input
              type='text'
              name='gallery'
              value={gallery}
              onChange={(e)=> setGallery(e.target.value)} 
              />
            </td>
          </tr>
          <tr>
            <td>STARTS:</td>
            <td>
              <input
              type='date'
              name='starts'
              value={start_date}
              onChange={(e)=> setStart_date(e.target.value)} 
              />
            </td>
          </tr>
          <tr>
            <td>ENDS:</td>
            <td>
              <input
              type='date'
              name='ends'
              value={end_date}
              onChange={(e)=> setEnd_date(e.target.value)} 
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>

    </>
  )
}
