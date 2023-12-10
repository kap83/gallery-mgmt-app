import React, {useState, useEffect } from 'react'

export const ExhibitionContext = React.createContext();

export function ExhibitionProvider({children}) {

  
  const [exhibitions, setExhibitions] = useState([])

 //console.log("in context ex", exhibitions)

  useEffect(() => {
    fetch('/exhibitions')
    .then(res => res.json())
    .then(data => {
      setExhibitions(data)
    })
},[])

  //works
  const handleNewExhibition = (newExhibition) => {
    //console.log("in ex context handle", newExhibition)
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
