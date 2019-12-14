import React, {Component} from 'react';

import axios from 'axios'


export default class DriveDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }


  componentDidMount() {
    this.getDriveDetails(this.props.val)
  }


  componentDidUpdate(prevProps) {

    if (this.props.val !== prevProps.val) {
      this.getDriveDetails(this.props.val)
    }
  }

  getDriveDetails(id) {
    axios.get('assets/json/drive' + id + '.json').then(response => {
      this.setState({driveDetails: response})
    })
  };

  render() {
    if (!this.state.driveDetails)
      return (<p>Loading Data</p>)
    return (<div class="column box">
      <div class="content driveDetails">
        <p class="driveDetailsCapacity">{this.state.driveDetails.data.capacity}</p>
        <p class="driveDetailsOccupied">{this.state.driveDetails.data.occupied}</p>
        <div class="driveStatus">
          <a href="#" class="driveStatusUsed">Used</a>
          <a href="#" class="driveStatusUpgrade">Upgrade</a>
        </div>
        <progress class="progress is-small is-info driveBarStatus" value="60" max="100"></progress>
      </div>
      
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src="/icons/images.png" alt="Image"></img>
            </figure>
          </div>
          <div class="media-content">
            <div class="content typeDetails">
              <p>
                <strong class="typeName">Images</strong>
                <br></br>
                <span class="typeN">{this.state.driveDetails.data.nOfImages} files</span>
                <span class="typeOccupied">{this.state.driveDetails.data.images}</span>
              </p>
            </div>
          </div>
        </article>
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src="/icons/documents.png" alt="Image"></img>
            </figure>
          </div>
          <div class="media-content">
            <div class="content typeDetails">
              <p>
                <strong class="typeName">Documents</strong>
                <br></br>
                <span class="typeN">{this.state.driveDetails.data.nOfDocuments} files</span>
                <span class="typeOccupied">{this.state.driveDetails.data.documents}</span>
              </p>
            </div>
          </div>
        </article>
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src="/icons/media.png" alt="Image"></img>
            </figure>
          </div>
          <div class="media-content">
            <div class="content typeDetails">
              <p>
                <strong class="typeName">Media files</strong>
                <br></br>
                <span class="typeN">{this.state.driveDetails.data.nOfMedia} files</span>
                <span class="typeOccupied">{this.state.driveDetails.data.media}</span>
              </p>
            </div>
          </div>
        </article>
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src="/icons/other.png" alt="Image"></img>
            </figure>
          </div>
          <div class="media-content">
            <div class="content typeDetails">
              <p>
                <strong class="typeName">Other files</strong>
                <br></br>
                <span class="typeN">{this.state.driveDetails.data.nOfOther} files</span>
                <span class="typeOccupied">{this.state.driveDetails.data.other}</span>
              </p>
            </div>
          </div>
        </article>
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src="/icons/unknown.png" alt="Image"></img>
            </figure>
          </div>
          <div class="media-content">
            <div class="content typeDetails">
              <p>
                <strong class="typeName">Unknown files</strong>
                <br></br>
                <span class="typeN">{this.state.driveDetails.data.nOfUnknown} files</span>
                <span class="typeOccupied">{this.state.driveDetails.data.unknown}</span>
              </p>
            </div>
          </div>
        </article>
      
    </div>)
  }
}
