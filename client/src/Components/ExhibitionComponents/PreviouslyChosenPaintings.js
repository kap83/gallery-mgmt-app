import React, {useContext} from 'react'

export default function PreviouslyChosenPaintings({selectedExhibition, isArtSelected}) {

    //console.log("in previously", typeof selectedExhibition.artworks)

  return (
    <div className='selectedPaintingsGalleryMargin'>
    <h3>Exhibited Paintings</h3>
    <button 
      className='btn' 
      id='selectedPaintingsGalleryBtnStyle' 
      type='submit'
      // disabled={!isArtSelected}
      // style={{background: isArtSelected ? '#6699CC' : 'grey'}}
      >
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
    </div>
  </div>
  )
}
