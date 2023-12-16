import React from 'react'
import Masonry from 'react-masonry-css'

export default function UnauthExhibitionDetails({selectedExhibition}) {
 
const {title, start_date, end_date, gallery} = selectedExhibition

const breakpointColumnsObj = {
  //default number of columns
  default: 3,
  //when it screen reaches 1100px, reduce to 3 columns
  1100: 2,
  //700px and down reduce to 2 columns
  700: 1,
};


const formattedStateDate = new Date(start_date)?.toLocaleDateString('en-US') 
const formattedStateEnd = new Date(end_date)?.toLocaleDateString('en-US') 


  return (
    <>
    <div className='exhibitionTitleData'>
      <h2>{title}</h2>
      <h3>{formattedStateDate} - {formattedStateEnd}</h3>
      <h3>Gallery: {gallery}</h3>
    </div>
    <div>
      {
       selectedExhibition && Object.values(selectedExhibition.artworks).map(artwork => (
          <div key={artwork.id}>
             <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column">
                <img 
                src={artwork.paintings_url[0]} 
                alt={artwork.title}
                style={{ maxWidth: '200%', height:'auto' }}
                />

              </Masonry>
          </div>
        ))
      } 

    </div>
    </>
  )
}
