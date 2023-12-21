import React, {useContext} from 'react'

export default function PreviouslyChosenPaintings({selectedExhibition}) {

    //console.log("in previously", typeof selectedExhibition.artworks)

    
    

  return (
    <div className='selectedPaintingsGalleryMargin'>
    <h3>Exhibited Paintings</h3>
    <button className='btn' id='selectedPaintingsGalleryBtnStyle' type='submit'>
      Submit Artwork
    </button>
    <div className='selectedPaintingsGallery'>
        {
            Object.values(selectedExhibition.artworks).map(artwork => (
                <div key={artwork.id}>
                    <img src={artwork.paintings_url[0]}
                    alt={artwork.title}
                    className="selectedPaintingsGalleryItem" 
                    />
                </div>
            ))
        }

      {/* {selectedPaintings?.map((painting) => (
        <div key={painting.id}>
          <img
            key={painting.id}
            src={Array.isArray(painting.paintings_url) ? painting.paintings_url[0] : painting.paintings_url}
            alt={painting.title}
            className="selectedPaintingsGalleryItem"
          />
        </div>
      ))} */}
    </div>
  </div>
  )
}
