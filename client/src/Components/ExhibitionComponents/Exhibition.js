import React, {useContext} from 'react'
import {useParams} from 'react-router-dom'
import { ExhibitionContext } from '../../Context/Exhibition'
import ExhibitionDetails from './ExhibitionDetails'


export default function Exhibition() {

   const { id } = useParams()
   const parsedExhibitionId = parseInt(id)
   const {exhibitionsArray} = useContext(ExhibitionContext)
   
   const selectedExhibition = exhibitionsArray.find(exhibition => exhibition.id === parsedExhibitionId)
  
   if (!selectedExhibition) {
      return <div>"loading..."</div>
    }
   
    return (
      <>
      <ExhibitionDetails
        selectedExhibition={selectedExhibition}
         />
    
      </>
    );
    
}
