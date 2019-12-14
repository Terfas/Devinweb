import React, {Component} from 'react';
import DriveDetails from './DriveDetails'
import Folders from './Folders'
import Latest from './Latest'
import Menu from './Menu'


import axios from 'axios'

export default class Drives extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active: 1
    }
  }

  componentDidMount() {
    this.getDriveData();

  }


  getDriveData() {
    axios.get('assets/json/drivelist.json').then(response => {
      this.setState({driveList: response})
    })
  };

   toggleClass(id) {
        const currentState = this.state.active;
        var element = document.getElementById(id);
        element.classList.add("active");
        var elementr = document.getElementById(currentState);
        elementr.classList.remove("active");
        this.setState({ active: id });
   };


  render() {
    console.log(this.state);
    if (!this.state.driveList)
      return (<p>Loading data</p>)
    return (
    
      <div className="drives columns is-three-quarters">

    <div class="column">
        <div class="columns">
            <p class="control driveSearch has-icons-left">
                <input class="input" type="text" placeholder="Search"></input>
                <span class="icon is-left">
              <i class='uil uil-search'></i>
            </span>
            </p>
        </div>

        <div class="columns">
            { this.state.driveList.data.map(drive =>
            <div className="column">
                <div onClick={()=> this.toggleClass(drive.id)} class="card driveCard" id={drive.id}>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class=" driveImage image is-48x48">
                                    <img src={drive.icon} alt="Placeholder image"></img>
                                </figure>
                            </div>
                            <br></br>
                        </div>

                        <div class="content driveContent">
                            <p class="driveName">{drive.name}</p>
                            <br></br>
                            <p class="driveCapacity">{drive.capacity}</p>
                            <p class="driveOccupied">{drive.occupied}</p>

                            <progress class="progress is-small is-info driveBar" value={drive.percent} max="100"></progress>

                        </div>
                    </div>
                </div>
            </div>) }
        </div>
        <div class="columns">
            <Folders val={this.state.active}/>
        </div>
        <div className="columns">
            <Latest val="1" />
        </div>
    </div>

    <div className="column is-one-third">
        <DriveDetails val={this.state.active}/>
    </div>

</div>)

      
  }

}


