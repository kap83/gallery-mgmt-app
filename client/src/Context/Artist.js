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

const artistValues = {
    artistList

}



return <ArtistContext.Provider value={artistValues}>{children}</ArtistContext.Provider>;

    
}