import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { ExhibitionContext } from '../../Context/Exhibition'

export default function DisplayAllExhibitions() {
   
const {exhibitions} = useContext(ExhibitionContext)


//create filter and sort options

  return (
    <>
    {/* style: may not need to be a link, maybe on the same page */}
      <Link 
      to={`/addexhibitions`}>
        <p>ADD EXHIBITION</p>
      </Link>

  {exhibitions.map(e => (
  <table key={e.id} style={{ border: '2px solid' }}>
    <tbody>
      <tr>
        <td>
          <Link
            to={{pathname: `/exhibition/${e.id}`}}
            state = {{ e: e }}
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
))}

    </>
  )
}
