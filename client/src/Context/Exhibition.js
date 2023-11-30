import React, {useState, useEffect, useContext } from 'react'
//import { UserContext } from '../Context/User'

export const ExhibitionContext = React.createContext();

export function ExhibitionProvider({children}) {

  //const {handleCurrentUserDeletedExhibitions} = useContext(UserContext)
  
  const [exhibitions, setExhibitions] = useState([])

  //console.log("in context ex", exhibitions)

  useEffect(() => {
    fetch('/exhibitions')
    .then(res => res.json())
    .then(data => {
      setExhibitions(data)
    })
},[])


  const handleDeletedExhibition = (deletedExhibition) => {
    //create new array with all exhibitions that don't have the deletedExhibition's id 
      const updatedExhibitions = exhibitions.filter(exhibition => exhibition.id !== deletedExhibition.id)
      setExhibitions(updatedExhibitions)
  }


  const exhibitionValues = {
    exhibitions,
    handleDeletedExhibition


  }


  return <ExhibitionContext.Provider value={exhibitionValues}>{children}</ExhibitionContext.Provider>

}
