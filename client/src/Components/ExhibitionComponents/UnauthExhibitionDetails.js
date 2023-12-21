import React from 'react'
import Masonry from 'react-masonry-css'
import { format, parseISO } from 'date-fns'

export default function UnauthExhibitionDetails({selectedExhibition}) {
 
const breakpointColumnsObj = {
  //default number of columns
  default: 3,
  //when it screen reaches 1100px, reduce to 3 columns
  1100: 2,
  //700px and down reduce to 2 columns
  700: 1,
}

//console.log(selectedExhibition)

  const startDate = selectedExhibition.start_date
  const isoStartDate = parseISO(startDate)
  const formattedStartDate = format(isoStartDate, 'MM/dd/yyyy')

  const endDate = selectedExhibition.end_date
  const isoEndDate = parseISO(endDate)
  const formattedEndDate = format(isoEndDate, 'MM/dd/yyyy')
  


  return (
    <>
    <div className='exhibitionHeaderData'>
      <h1>{selectedExhibition.title}</h1>
      <h2>
        {formattedStartDate} - {formattedEndDate}
      </h2>
      <h2>Gallery: {selectedExhibition.gallery}</h2>
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
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        ))}
      </Masonry>
    </div>
  </>
);
}
