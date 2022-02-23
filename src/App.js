import './App.css';
import PublishCar from './components/PublishCar';
import { useState } from 'react';
import ShowAllCars from './components/ShowAllCars';
import React from 'react';

export default function App({storageService}) {
  const [showAllCars, setShowAllCars] = useState(false);

  return (
    <div className="App">
      <h1 className="mb-4">MG Group</h1>
      { !showAllCars && 
        <React.Fragment>
          <PublishCar storageService={storageService} />
          <hr />
          <div className="d-grid col-12 mt-4">
              <button 
                  className="btn btn-lg btn-success"
                  type="button" 
                  onClick={() => setShowAllCars(true)}>Ver datos cargados
              </button>
          </div>
        </React.Fragment>
      }

      { showAllCars && 
        <React.Fragment>
          <ShowAllCars 
            storageService={storageService}
          /> 
          <hr />
          <div className="d-grid col-12 mt-4">
              <button 
                  className="btn btn-lg btn-success"
                  type="button" 
                  onClick={() => setShowAllCars(false)}>Cargar nuevo auto
              </button>
          </div>
        </React.Fragment>        
      }
    </div>
  );
}