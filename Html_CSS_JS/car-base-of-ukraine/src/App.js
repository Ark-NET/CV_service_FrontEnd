import { Route, Link, BrowserRouter } from 'react-router-dom'
import './App.css';

import CarInfo from './components/CarInfo'
import SearchCars from './components/SearchCars';

function App() {
  return (
    <BrowserRouter>

      <div className="Page">

        <div className="searchNumberInfo">
          <div> <Link to="/carInformation" className="btn btn-secondary">Search by car number</Link></div>
          <div> <Link to="/search" className="btn btn-secondary">Search by Make / Model</Link></div>
        </div>

        <div className="searchMake">
          <div><Route path="/carInformation" component={CarInfo} /></div>
          <div> <Route path="/search" component={SearchCars} /></div>
        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;
