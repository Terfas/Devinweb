import React, {Component} from 'react';

import axios from 'axios'


export default class Folders extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }


  componentDidMount() {
    this.getFolderDetails(this.props.val)
  }


  componentDidUpdate(prevProps) {

    if (this.props.val !== prevProps.val) {
      this.getFolderDetails(this.props.val)
    }
  }


  getFolderDetails(id) {
    axios.get('assets/json/folders' + id + '.json').then(response => {
      this.setState({foldersDetails: response})
    })
  };

  render() {
    if (!this.state.foldersDetails)
      return (<p>Loading Data</p>)
    return (<div class="column folders">
      
     <div class="sectionHeader"> 
      <div class="sectionTitle">Folders</div>
      <a href="#" class="sectionView">View all</a>
     </div> 
     
     <div class="columns foldersDetails">
     
      { 
            this.state.foldersDetails.data.map(folder =>
              <div className="column">
              <div class="card folderCard">
                <div class="card-content">
                          <div >
                              <div class="folderImage">
                                  <figure class="image is-48x48 ">
                                      
                                      <i class='uil uil-folder folderIcon'></i>
                                  </figure>
                              </div>
                              
                          </div>

                          <div class="content folderContent">
                              <span class="folderName">{folder.name}</span>
                              <span class="folderFiles">{folder.files} files</span>
                          </div>
                      </div>
                </div>      
              </div>
            ) 

        }
     </div>
      
    </div>)
  }
}
