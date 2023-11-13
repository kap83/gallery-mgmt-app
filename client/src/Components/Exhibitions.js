import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import '../index.css'


export default function Exhibitions() {
   
  const [exhibitions, setExhibitions] = useState([])

  console.log("in exhibitions", exhibitions)

  useEffect(() => {
    fetch('/exhibitions')
    .then(res => res.json())
    .then(data => {
      setExhibitions(data)
    })
},[])

//create filter and sort options

  return (
    <>
    {/* style: may not need to be a link, maybe on the same page */}
      <Link 
      to={`/addexhibitions`}>
        <p>ADD EXHIBITION</p>
      </Link>

    {exhibitions.map(e => {

      return (
    <>
    {/* sylting: increase broder width, add banners */}
    <table style={{border: '2px solid'}}>
      <tbody>
        <tr key={e.id}>
          <td>🖼️</td>
          <td>{e.title}</td>
          <td>{e.start_date} - {e.end_date}</td>
          <td>
            CREATED BY: {e.curator}
          </td>
          <td>
          <img className='avatarStyle' src={e.avatar_url}  alt='avatar' />
          </td>
        </tr>
      </tbody>
    </table>
    </>
  )
})}
    </>
  )
}
