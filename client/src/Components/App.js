import React, {useContext} from 'react'
import {Routes, Route} from 'react-router-dom'
import {UserContext} from '../Context/User'
import Login from './Login';
import NavBar from './NavBar';
import DisplayAllExhibitions from './ExhibitionComponents/DisplayAllExhibitions';
import AddExhibition from './ExhibitionComponents/AddExhibition'
import gallery from '../images/gallery.jpg'
import Artists from '../Components/ArtistComponents/Artists';
import ArtistDetails from '../Components/ArtistComponents//ArtistDetails';
import ExhibitionDetails from './ExhibitionComponents/ExhibitionDetails'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



function App() {
  const {loggedIn} = useContext(UserContext)

if(loggedIn) {
  return (
    <>
    <NavBar/>
    <Routes>
    <Route path='/' element={<DisplayAllExhibitions />} />
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
