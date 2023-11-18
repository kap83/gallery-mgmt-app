import React, { useState, useEffect } from 'react';

export const ArtworkContext = React.createContext();

export function ArtworkProvider({children}) {


const [artworksData, setArtworksData] = useState([])


useEffect(() => {
    fetch('/artworks')
    .then(res => res.json())
    .then(data => {
        setArtworksData(data)
    })
},[])

const handledAddedArtwork = (newArtwork) => {
    const updatedArtworksData = [...artworksData, newArtwork]
    setArtworksData(updatedArtworksData)
}




    const artworkValues = {
        artworksData,
        handledAddedArtwork
    }




    return <ArtworkContext.Provider value={artworkValues}>{children}</ArtworkContext.Provider>;
}