import React, {useState, useContext} from 'react'
import {ArtistContext} from '../Context/Artist'

export default function AddArtist() {

  const {handleAddedArtist} = useContext(ArtistContext)

const [checked, setChecked] = useState(false)

const handleChange = () => {
  setChecked(!checked)
}

const handleSubmit = (e) => {


    e.preventDefault()

    const formData = new FormData()

    formData.append('name', e.target.elements.artistName.value)
    formData.append('date_of_birth', e.target.elements.dob.value)
    formData.append('artwork[title]', e.target.elements.title.value)
    formData.append('artwork[description]', e.target.elements.description.value)
    formData.append('artwork[paintings]', e.target.elements.paintings.files[0])


   

    fetch(`/artists`, {
      method: 'POST',
  
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      console.log("in fetch", data)
      handleAddedArtist(data)
      
    })

}

  return (
    <>
      <form onSubmit={handleSubmit}>
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
                        DESCRIPTION: 
                        </td>
                      <td>
                        <input 
                            type='text'
                            name='description'
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
