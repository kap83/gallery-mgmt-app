import React, {useState, useEffect} from 'react'

export default function Exhibitions() {
   
  const [exhibitions, setExhibitions] = useState([])

  //console.log("in exhibitions", exhibitions)

  useEffect(() => {
    fetch('/exhibitions')
    .then(res => res.json())
    .then(data => {
      setExhibitions(data)
    })
},[])

const displayExhibitions = exhibitions.map(e => {
  return (
    <>
    <table key={e.id}>
      <tbody>
        <tr>
          <td></td>
          <td>{e.title}</td>
          <td>{e.start_date} - {e.end_date}</td>
        </tr>
      </tbody>
    </table>
    </>
  )
}

  
  )

  return (
    <>
    {displayExhibitions}
    </>
  )
}
