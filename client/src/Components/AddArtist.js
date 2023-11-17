import React, {useState} from 'react'

export default function AddArtist() {

const [checked, setChecked] = useState(false)
const [paintersName, setPaintersName] = useState('')
const [dateOfBirth, setDateOfBirth] = useState('')
const [uploadFields, setUploadFields] = useState([
    {
      title: '',
      description: '',
      paintings_url: ''
    }
  ])

  //console.log(uploadFields) //does create multiple objs for each new painting + deets. 

const handleChange = () => {
    setChecked(!checked)
}

const handleAddInput = () => {
    setUploadFields([...uploadFields, {uploadFields: ''}])
}

const handleRemoveInput = (index) => {
    const inputField = [...uploadFields]
    inputField.splice(index, 1)
    setUploadFields(inputField)
}

const handlePaintingInputChange = (e, index) => {
    const {name, value} = e.target
    const inputField = [...uploadFields]
    inputField[index][name]= value
    setUploadFields(inputField)
}

const handleSubmit = (e) => {
  setPaintersName('')
  setDateOfBirth('')

    e.preventDefault()

    const formData = new FormData()
  
    // const filterOutNull = uploadFields.filter(Boolean)

    // for (let index = 0; index < filterOutNull.length; index++) {
    //     const fields = filterOutNull[index]
    //     formData.append('artwork[title]', fields.title)
    //     formData.append('artwork[description]', fields.description)
    //     formData.append('artwork[paintings_url]', fields.paintings_url)
    // }
  
    // formData.append('name', paintersName)
    // formData.append('date_of_birth', dateOfBirth)


    const formValues ={
      name: paintersName,
      date_of_birth: dateOfBirth
    }

  


    fetch(`/artists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
    .then(res => res.json())
    .then(data => console.log(data))

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
              value={paintersName} 
              onChange={(e)=> setPaintersName(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>DATE OF BIRTH:</td>
            <td>
              <input
              type='date'
              value={dateOfBirth} 
              onChange={(e)=> setDateOfBirth(e.target.value)}
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
                    <label htmlFor='uploadFields'/>
                </td>
            </tr>
            {checked ? 
                uploadFields.map((field, index) => (
                    <tr  key={index}>
                     <td >
                     TITLE:
                        <input 
                            type='text'
                            name='title'
                            // to stop uncontrolled input to controlled input error
                            value={field.title || ''}
                            onChange={(e) => handlePaintingInputChange(e, index)}
                        />
                        DESCRIPTION: 
                        <input 
                            type='text'
                            name='description'
                            value={field.description || ''}
                            onChange={(e) => handlePaintingInputChange(e, index)}
                        />
                         <input 
                            type='file'
                            name='paintings_url'
                            value={field.paintings_url || ''}
                            onChange={(e) => handlePaintingInputChange(e, index)}
                        />
                    </td>
                    
                    {uploadFields.length -1 === index && uploadFields.length < 10 && 
                    <td>
                        <button type='button' onClick={handleAddInput}>+</button> 
                    </td>}
                    {uploadFields.length > 1 && 
                    <td> 
                       <button type='button' onClick={()=> handleRemoveInput(index)}>-</button> 
                    </td> }
                    </tr>
                )
                )
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
