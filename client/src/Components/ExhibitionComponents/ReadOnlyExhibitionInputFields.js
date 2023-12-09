import React, {useContext} from 'react'
import { ExhibitionContext } from '../../Context/Exhibition'
import { UserContext } from '../../Context/User'
import { useNavigate } from 'react-router-dom'

export default function ReadOnlyExhibitionInputFields({selectedExhibition, handleEditToggleClick}) {

  const {handleDeletedExhibition} = useContext(ExhibitionContext)
  const {handleCurrentUserDeletedExhibitions} = useContext(UserContext)
  const navigate = useNavigate()

  const handleDeleteClick =() => {
    fetch(`/exhibitions/${selectedExhibition.id}`, {
      method: 'DELETE'
    })
    .then(() => {
      handleDeletedExhibition(selectedExhibition)
      handleCurrentUserDeletedExhibitions(selectedExhibition)
      navigate('/')
    })
  }

  //currentUserID === selectedExhibition.user_id


  return (
  <div className='exhibitionTitleData'>
    <h2>
      {selectedExhibition.title}
    </h2>
    <h3>
      {selectedExhibition.start_date} - {selectedExhibition.end_date}
    </h3>
    <h3>
     Gallery: {selectedExhibition.gallery}
    </h3>
    <button type='button' onClick={handleEditToggleClick}>EDIT HEADER</button>
    <button type='button' onClick={handleDeleteClick}>DELETE EXHIBITION</button>
  </div>
  )
}
