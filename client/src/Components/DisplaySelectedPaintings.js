import React from 'react'
import Masonry from 'react-masonry-css'

export default function DisplaySelectedPaintings({ selectedArtist, selectedPaintings, handleSelectedPaintings}) {


    const breakpointColumnsObj = {
        //default number of columns
        default: 3,
        //when it screen reaches 1100px, reduce to 3 columns
        1100: 2,
        //700px and down reduce to 2 columns
        700: 1,
      };

  return (
    <>
 {
  selectedArtist?.map((artist) => (
    <div key={artist.id}>
      <h1 style={{ textAlign: 'center' }}>{artist.name}</h1>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {artist.artworks.map((art) => (
          <div key={art.id}>
            <h3>
              {art.title}
              {handleSelectedPaintings && ( // Check if handleSelectedPaintings is defined
                <input
                  type="checkbox"
                  value={art.id}
                  style={{ float: 'left' }}
                  checked={selectedPaintings?.some((painting) => painting.id === art.id)}
                  onChange={() => {
                    const painting = art.paintings_url[0];
                    handleSelectedPaintings(art.id, art.title, painting, art.exhibition_id)
                  }}
                />
              )}
            </h3>
            <p style={{ marginLeft: '15px', marginTop: '-20px' }}>({art.medium})</p>
            <img
              src={art.paintings_url[0]}
              alt={art.title}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        ))}
      </Masonry>
    </div>
  ))
}
    </>
  )
}