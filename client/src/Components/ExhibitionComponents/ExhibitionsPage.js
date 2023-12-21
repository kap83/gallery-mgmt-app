import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { ExhibitionContext } from '../../Context/Exhibition'
import AddExhibition from './AddExhibition'

export default function DisplayAllExhibitions() {
   
const {exhibitionsArray} = useContext(ExhibitionContext)


//create filter and sort options

return (
  <div>
    <AddExhibition/>
    <div className="exhibitionContainer" >
      {exhibitionsArray?.map((e) => (
        <div className="exhibitionItem" key={e.id}>
          <Link style={{textDecoration: 'none'}} to={`/exhibition/${e.id}`}>
            <h2>{e.title}</h2>
          </Link>
          <p>Exhibition Manager: {e.curator}</p>
          <img src={e.avatar_url} alt="avatar" />
        </div>
      ))}
    </div>
  </div>
)

}
