import React, {Component} from 'react';

import axios from 'axios'

export default class Latest extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }


  componentDidMount() {
    this.getLatestDetails(this.props.val);

  }


  componentDidUpdate(prevProps) {

    if (this.props.val !== prevProps.val) {
      this.getLatestDetails(this.props.val)
    }
  }

  getLatestDetails(id) {
    axios.get('assets/json/latest' + id + '.json').then(response => {
      console.log(response);
      this.setState({latestDetails: response});

    })
  };

  render() {
    if (!this.state.latestDetails)
      return (<p>Loading Data</p>)
    return (<div class="column latest">
      
     <div class="sectionHeader"> 
      <div class="sectionTitle">Recent Files</div>
      <a href="#" class="sectionView">View all</a>
     </div> 
     
     <div class="columns latestDetails">
      <table class="table is-responsive latestTable is-borderless">
      <thead>
        <tr class="tableHeader">
          <th>Name</th>
          <th>Members</th>
          <th>Last modified</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        { 
            this.state.latestDetails.data.map(file =>
              <tr>
                <td class="fileName">
                  
                    <img class="fileImage" src={"/icons/"+file.type+".png"} alt="Image"></img>
                  
                  {file.name}
                </td>
                <td class="fileInfo">{file.members}</td>
                <td class="fileInfo">{file.lastModified}</td>
                
              </tr>
            ) 

        }
        </tbody>
      </table>
     </div>
      
    </div>)
  }
}
