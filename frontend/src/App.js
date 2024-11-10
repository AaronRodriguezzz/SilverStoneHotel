import {BrowserRouter, Routes, Route} from 'react-router-dom';
//pages
import LandingPage from './pages/LandingPage';
import Restaurant from './pages/Restaurant';
import RoomInfo from './pages/RoomsInfo';
import Amenities from './pages/Amenities';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route 
              exact path='/'
              element={<LandingPage />}
            />

            <Route 
              exact path='/restaurant'
              element={<Restaurant />}
            />

            <Route 
              exact path='/room/:key'
              element={<RoomInfo />}
            />     

            <Route 
              exact path='/amenities'
              element={<Amenities />}
            />   

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
