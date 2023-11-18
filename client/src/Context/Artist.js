import React, { useState, useEffect } from 'react';

export const ArtistContext = React.createContext();

export function ArtistProvider({children}) {

const [artistList, setArtistList] = useState([])


useEffect(() => {
    fetch('/artists')
    .then(res => res.json())
    .then(data => {
        setArtistList(data)
    })
},[])


const handleAddedArtist = (newArtist) => {
    const updatedArtistData = [...artistList, newArtist ]
    setArtistList(updatedArtistData)
}




const handleArtistsAddedArtwork = (addedArtwork) =>{

}


const artistValues = {
    artistList,
    handleAddedArtist,
    handleArtistsAddedArtwork,
}



return <ArtistContext.Provider value={artistValues}>{children}</ArtistContext.Provider>;

    
}