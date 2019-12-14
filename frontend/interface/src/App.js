import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Drives from './components/Drives'
import Menu from './components/Menu' 
 
class App extends Component {

  render() {
   
    return (

         <div className="container">
        <div className="App">
          <div className="columns">
            <div className="column is-one-quarter">
             
              <Menu />
              
            </div>

            <div className="column is-three-quarters">
              
                <Drives/>
              
            </div>

          
          </div>
        </div>
        </div>
    
    );

  }
}

export default App;
