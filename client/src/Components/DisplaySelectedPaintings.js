import React, {useContext} from 'react'
import Masonry from 'react-masonry-css'
import { format, parseISO } from 'date-fns'
import {ArtistContext} from '../Context/Artist'
//import { ExhibitionContext } from '../../Context/Exhibition'


export default function DisplaySelectedPaintings({ handleDeleteBtnClick, formValues, handleSelectedPaintings}) {

  const {selectedArtist} = useContext(ArtistContext)

  //const {exhibitionsArray} = useContext(ExhibitionContext)

    const breakpointColumnsObj = {
        //default number of columns
        default: 3,
        //when it screen reaches 1100px, reduce to 3 columns
        1100: 2,
        //700px and down reduce to 2 columns
        700: 1,
      };

 console.log('in dis', formValues)
 
  return (
  <>
 {
  selectedArtist?.map((artist) => {
    const dob = artist.date_of_birth
    const isoDOB = parseISO(dob)
    const formattedDOB = format(isoDOB, 'MM/dd/yyyy')
    return (
      <div className='displayPaintingsStyle' key={artist.id}>
        <hr />
        <h1>{artist.name}</h1>
        <h2 id='dob'>{formattedDOB}</h2>
        <hr />
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {artist.artworks.map((art) => (
            <div key={art.id}>
              <h2>
                {art.title}

                {formValues === undefined ? <button type='button' className='btn' onClick={() => handleDeleteBtnClick(art)}>Delete</button> : null}
                {handleSelectedPaintings && ( // Checking if handleSelectedPaintings is defined
                  <input
                    id='selectPaintingCheckbox'
                    type="checkbox"
                    value={art.id}
                    checked={ formValues.artworks?.some((painting) => painting.id === art.id)}
                    onChange={() => {
                      //const painting = art.paintings_url[0];
                      handleSelectedPaintings(art.id, art.exhibition_id)
                    }}
                  />
                )}
              </h2>
              <p>({art.medium})</p>
              <img
                src={art.paintings_url[0]}
                alt={art.title}
              />
            </div>
          ))}
        </Masonry>
      </div>
    )
  })
  }
    </>
  )
}