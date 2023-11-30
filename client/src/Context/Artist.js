import React, { useState, useEffect } from 'react';

export const ArtistContext = React.createContext();

export function ArtistProvider({children}) {

const [artistList, setArtistList] = useState([])
//console.log("in context", artistList)


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

//this works
const handleArtistsAddedArtwork = (addedArtwork) => {

    //addedArtworks is an obj with an artworks array of objs. artist_id is in array indexed 0
    const artistId = addedArtwork.artworks[0].artist_id;
  
    const updatedArtist = artistList.map((artist) => {
        //if an artist.id matches artistId
      if (artist.id === artistId) {
        //go through that artist's artworks array, and filter out all the artworks with ids that don't match addedArtwork.artworks[0].id
        const updatedArtwork = artist.artworks.filter((art) => art.id !== addedArtwork.artworks[0].id);
        return {
          ...artist,
          artworks: [...updatedArtwork, addedArtwork.artworks[0]],
        };
      }
      return artist;
    });
  
    setArtistList(updatedArtist);
  };


const artistValues = {
    artistList,
    handleAddedArtist,
    handleArtistsAddedArtwork,
}



return <ArtistContext.Provider value={artistValues}>{children}</ArtistContext.Provider>;

    
}