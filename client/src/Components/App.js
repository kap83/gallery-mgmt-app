import React, {useContext} from 'react'
import {Routes, Route} from 'react-router-dom'
import {UserContext} from '../Context/User'
import Login from './Login';
import NavBar from './NavBar';
import ExhibitionsPage from './ExhibitionComponents/ExhibitionsPage';
import AddExhibition from './ExhibitionComponents/AddExhibition'
import gallery from '../images/gallery.jpg'
import ArtistPage from '../Components/ArtistComponents/ArtistPage';
import ArtistDetails from '../Components/ArtistComponents//ArtistDetails';
import Exhibition from './ExhibitionComponents/Exhibition'


function App() {
  const {loggedIn} = useContext(UserContext)


if(loggedIn) {
  return (
    <>
    <NavBar/>
    <Routes>
    <Route path='/' element={<ExhibitionsPage />} />
    <Route path='/addexhibitions' element={<AddExhibition />} />
    <Route path='/exhibition/:id' element={<Exhibition />} />
    <Route path='/artists' element={<ArtistPage />} />
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
