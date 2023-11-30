import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App';
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './Context/User';
import { ArtistProvider } from './Context/Artist';
import { ArtworkProvider } from './Context/Artwork';
import { ExhibitionProvider } from './Context/Exhibition';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <UserProvider>
            <ExhibitionProvider>
            <ArtistProvider>
                  <ArtworkProvider>
                        <BrowserRouter>
                              <App />
                        </BrowserRouter>
                  </ArtworkProvider>
            </ArtistProvider>
            </ExhibitionProvider>
      </UserProvider>
           
   
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

