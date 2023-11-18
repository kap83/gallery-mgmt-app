import React, {useContext} from 'react'
import {Routes, Route} from 'react-router-dom'
import {UserContext} from '../Context/User'
import Login from './Login';
import NavBar from './NavBar';
import Exhibitions from './Exhibitions';
import AddExhibition from './AddExhibition'
import gallery from '../images/gallery.jpg'
import Artists from './Artists';
import Artwork from './Artwork';
import ArtistDetails from './ArtistDetails';



function App() {
  const {loggedIn} = useContext(UserContext)

if(loggedIn) {
  return (
    <>
    <NavBar/>
    <Routes>
    <Route path='/addexhibitions' element={<AddExhibition />} />
    <Route path='/' element={<Exhibitions />} />
    <Route path='/artists' element={<Artists />} />
    <Route path='/artwork' element={<Artwork />} />
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
