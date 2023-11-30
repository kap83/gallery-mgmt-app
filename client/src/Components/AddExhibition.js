import React, { useContext, useState} from 'react'
import {UserContext} from '../Context/User'
import {ArtistContext} from '../Context/Artist'
import '../index.css'

export default function AddExhibition() {


  //TO DO: ADD USENAVIGATE TO NAVIGATE TO THE EXHIBITION PAGE AFTER SUBMISSION IS SUCCESSFUL
  
  const {currentUser, handleNewExhibition} = useContext (UserContext)
  // eslint-disable-next-line
  const {artistList, handleArtistsAddedArtwork} = useContext(ArtistContext)

  const [artistId, setArtistId] = useState('')

  //console.log("artistId", artistId)

  // console.log(currentUser)

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('title', e.target.elements.exhibitionTitle.value)
    formData.append('gallery', e.target.elements.gallery.value)
    formData.append('start_date', e.target.elements.starts.value)
    formData.append('end_date', e.target.elements.ends.value)
    formData.append('artwork[title]', e.target.elements.paintingTitle.value)
    formData.append('artwork[medium]', e.target.elements.medium.value)
    formData.append('artwork[artist_id]', artistId)
    formData.append('artwork[paintings]', e.target.elements.paintings.files[0])

    

    //console.log("formData", Object.fromEntries(formData))

    fetch(`/exhibitions/`, {
      method: 'POST',
      body: formData
    })
    .then(res => {
      if(res.ok) {
        res.json()
        .then(data => {
          //console.log("fetch worked", data)
          handleNewExhibition(data)
          handleArtistsAddedArtwork(data)
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
    <form onSubmit={handleSubmit}>
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
            <td>SELECT ARTIST:</td>
            <td>
              <select name='artists'
              value={artistId}
              onChange={(e)=>setArtistId(e.target.value)}
              id='artists'>
                <option value='default'>Select An Artist</option>
                 {artistList.map(artist => (
                 <option name='artist_id' key={artist.id} value={artist.id}>
                  {artist.name}
                </option>
              ))}
              </select>
            </td>
          </tr>

          <tr>
            <td>PAINTING TITLE:</td>
            <td>
              <input
              type='text'
              name='paintingTitle' 
              />
            </td>
          </tr>

          <tr>
            <td>Medium:</td>
            <td>
              <input
              type='text'
              name='medium' 
              />
            </td>
          </tr>

          <tr>
          
          <td>
          <label htmlFor='uploadFields'/>
            <input
              type='file'
              name='paintings' 
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
