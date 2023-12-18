import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { ExhibitionContext } from '../../Context/Exhibition'

export default function DisplayAllExhibitions() {
   
const {exhibitionsArray} = useContext(ExhibitionContext)


//create filter and sort options

  return (
    <>
    <div>
      <Link
      className='linkStyle'
      to={`/addexhibitions`}>
        <h1>Create An Exhibition</h1>
      </Link>
    </div>

    <div className="exhibitionContainer">
  {exhibitionsArray?.map((e) => (
    <div className="exhibitionItem" key={e.id}>
      <Link to={`/exhibition/${e.id}`}>
        🖼️
      </Link>
      <h2>{e.title}</h2>
      <p>Exhibition Manager: {e.curator}</p>
      <img src={e.avatar_url} alt="avatar" />
    </div>
  ))}
</div>
      

    

  {/* {exhibitionsArray?.map(e => (
  <table key={e.id} style={{ border: '2px solid' }}>
    <tbody>
      <tr>
        <td>
          <Link
            to={`/exhibition/${e.id}`}
          >
            🖼️
          </Link>
        </td>
        <td className='bold-text'>{e.title}</td>
        <td style={{fontSize: 'small'}}>CREATED BY: {e.curator}</td>
        <td>
          <img className='avatarStyle' src={e.avatar_url} alt='avatar' />
        </td>
      </tr>
    </tbody>
  </table>
))} */}

    </>
  )
}
