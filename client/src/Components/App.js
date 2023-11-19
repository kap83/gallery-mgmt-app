import React, {useContext} from 'react'
import {Routes, Route} from 'react-router-dom'
import {UserContext} from '../Context/User'
import Login from './Login';
import NavBar from './NavBar';
import Exhibitions from './Exhibitions';
import AddExhibition from './AddExhibition'
import gallery from '../images/gallery.jpg'
import Artists from './Artists';
import ArtistDetails from './ArtistDetails';
import ExhibitionDetails from './ExhibitionDetails'



function App() {
  const {loggedIn} = useContext(UserContext)

if(loggedIn) {
  return (
    <>
    <NavBar/>
    <Routes>
    <Route path='/' element={<Exhibitions />} />
    <Route path='/addexhibitions' element={<AddExhibition />} />
    <Route path='/exhibition/:id' element={<ExhibitionDetails />} />
    <Route path='/artists' element={<Artists />} />
    <Route path='artist/:id' element={<ArtistDetails />} />
    </Routes>
    
    </>
  )}
  else {
    return (
    <>
      <Login />
      <img className='galleryImg' src={gallery} alt='gallery'/>
    </>
    )
  }

}

export default App;
