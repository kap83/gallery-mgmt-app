import React, { useState, useEffect } from 'react';

export const ArtistContext = React.createContext();

export function ArtistProvider({children}) {

const [artistList, setArtistList] = useState([])
const [selectedArtist, setSelectedArtist] = useState([])

useEffect(() => {
  fetch('/artists')
    .then(res => res.json())
    .then(data => setArtistList(data))
}, []);

const findArtist = (artistId) => {
  const artist = artistList.filter(a => parseInt(artistId) === a.id)
  setSelectedArtist(artist)
}


const handleAddedArtist = (newArtist) => {
    const updatedArtistData = [...artistList, newArtist ]
    setArtistList(updatedArtistData)
}


const handleArtistAddedArtwork = (addedArtwork) => {
    //addedArtworks is an obj with an artworks array of objs. artist_id is in array indexed 0
    const artistId = addedArtwork.artist_id;
    const updatedArtist = artistList.map((artist) => {
        //if an artist.id matches artistId
      if (artist.id === artistId) {
        //go through that artist's artworks array, and filter out all the artworks with ids that don't match addedArtwork.artworks[0].id
        const updatedArtwork = artist.artworks.filter((art) => art.id !== addedArtwork.id)
        return {
          ...artist,
          artworks: [...updatedArtwork, addedArtwork],
        };
      }
      return artist;
    });
  
    setArtistList(updatedArtist);
  };

const handleDeletedArtworkInArtistList = (deletedArtwork) => {
  console.log("deleted", deletedArtwork)
  const updateArtistList = artistList.map(artist => {
    if(artist.id === deletedArtwork.artist_id){
      const updatedArtwork = artist.artworks.filter(art => art.id !== deletedArtwork.id)
      return {
        ...artist,
        artworks: updatedArtwork
      }
    }
    return artist
  })
  setArtistList(updateArtistList)

}

const artistValues = {
    artistList,
    handleAddedArtist,
    handleArtistAddedArtwork,
    findArtist, 
    selectedArtist,
    handleDeletedArtworkInArtistList
}


return <ArtistContext.Provider value={artistValues}>{children}</ArtistContext.Provider>;
    
}