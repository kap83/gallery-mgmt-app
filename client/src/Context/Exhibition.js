// eslint-disable-next-line
import React, {useState, useEffect, useContext } from 'react'
//import { UserContext } from '../Context/User'

export const ExhibitionContext = React.createContext();

export function ExhibitionProvider({children}) {

  //const {handleCurrentUserDeletedExhibitions} = useContext(UserContext)
  
  const [exhibitions, setExhibitions] = useState([])

 // console.log("in context ex", exhibitions)

  useEffect(() => {
    fetch('/exhibitions')
    .then(res => res.json())
    .then(data => {
      setExhibitions(data)
    })
},[])


  const handleNewExhibition = (newExhibition) => {
    //console.log("in handle context", newExhibition)
    const handleUpdatedExhibition = [...exhibitions, newExhibition]
    setExhibitions(handleUpdatedExhibition)

  }

  const handleDeletedExhibition = (deletedExhibition) => {
    //create new array with all exhibitions that don't have the deletedExhibition's id 
      const updatedExhibitions = exhibitions.filter(exhibition => exhibition.id !== deletedExhibition.id)
      setExhibitions(updatedExhibitions)
  }


  const handleUpdatedExhibition = (updatedExhibition) => {
      //console.log("in update", updatedExhibition)
      const updatedExhibitionsArr = exhibitions.filter(exhibition => exhibition.id !== updatedExhibition.id)
      updatedExhibitionsArr.push(updatedExhibition)
      setExhibitions(updatedExhibitionsArr)

  }

  const exhibitionValues = {
    exhibitions,
    handleDeletedExhibition,
    handleNewExhibition,
    handleUpdatedExhibition
  }


  return <ExhibitionContext.Provider value={exhibitionValues}>{children}</ExhibitionContext.Provider>

}
