import React, {useContext} from 'react'
import { ExhibitionContext } from '../../Context/Exhibition'
import { UserContext } from '../../Context/User'
import { useNavigate } from 'react-router-dom'
import { format, parseISO } from 'date-fns'


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


  const startDate = selectedExhibition.start_date
  const isoStartDate = parseISO(startDate)
  const formattedStartDate = format(isoStartDate, 'MM/dd/yyyy')

  const endDate = selectedExhibition.end_date
  const isoEndDate = parseISO(endDate)
  const formattedEndDate = format(isoEndDate, 'MM/dd/yyyy')
  


  return (
  <div className='exhibitionHeaderData'>
    <h1>
      {selectedExhibition.title}
    </h1>
    <h2>
      {formattedStartDate} - {formattedEndDate}
    </h2>
    <h2>
     Gallery: {selectedExhibition.gallery}
    </h2>
    <button className='btn' id='exhibitionHeaderBtnsStyle' type='button' onClick={handleEditToggleClick}>Edit header</button>
    <button className='btn' id='exhibitionHeaderBtnsStyle' type='button' onClick={handleDeleteClick}>Delete Exhibition</button>
  </div>
  )
}
