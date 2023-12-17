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
}


const formattedStartDate = new Date(start_date)?.toLocaleDateString('en-US') 
const formattedEndDate = new Date(end_date)?.toLocaleDateString('en-US') 


  return (
    <>
    <div className='exhibitionTitleData'>
      <h2>{title}</h2>
      <h3>
        {formattedStartDate} - {formattedEndDate}
      </h3>
      <h3>Gallery: {gallery}</h3>
    </div>
    <div style={{marginTop:'40px'}}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {selectedExhibition?.artworks.map((artwork) => (
          <div key={artwork.id}>
            <img
              src={artwork.paintings_url[0]}
              alt={artwork.title}
              style={{ maxWidth: '200%', height: 'auto' }}
            />
          </div>
        ))}
      </Masonry>
    </div>
  </>
);
}
