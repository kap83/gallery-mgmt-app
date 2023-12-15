import React, {useState, useEffect } from 'react'

export const ExhibitionContext = React.createContext();

export function ExhibitionProvider({children}) {

const [exhibitionsArray, setExhibitionsArray] = useState([])

 console.log("in context ex", exhibitionsArray)

  useEffect(() => {
    fetch('/exhibitions')
    .then(res => res.json())
    .then(data => {
      setExhibitionsArray(data)
    })
},[])

  //works
  const handleNewExhibition = (newExhibition) => {
    //console.log("in ex context handle", newExhibition)
    const handleUpdatedExhibition = [...exhibitionsArray, newExhibition]
    setExhibitionsArray(handleUpdatedExhibition)

  }

  const handleUpdatedExhibition = (updatedExhibition) => {
    console.log("in update", updatedExhibition)
    setExhibitionsArray((exhibitionsArray) => {
      const updatedExhibitionsArr = exhibitionsArray.filter(exhibition => exhibition.id !== updatedExhibition.id)
      updatedExhibitionsArr.push(updatedExhibition)
      return updatedExhibitionsArr
    })
}


  const handleDeletedExhibition = (deletedExhibition) => {
    //create new array with all exhibitions that don't have the deletedExhibition's id 
      const updatedExhibitions = exhibitionsArray.filter(exhibition => exhibition.id !== deletedExhibition.id)
      setExhibitionsArray(updatedExhibitions)
  }


  const exhibitionValues = {
    exhibitionsArray,
    handleDeletedExhibition,
    handleNewExhibition,
    handleUpdatedExhibition
  }


  return <ExhibitionContext.Provider value={exhibitionValues}>{children}</ExhibitionContext.Provider>

}
