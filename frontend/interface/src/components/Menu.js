import React, {Component} from 'react';

import axios from 'axios'

export default class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: 1
    }
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

  toggleClass(id) {

        var element = document.getElementById("menu"+id+"details");
        var parent = document.getElementById("menu"+id);
        if(element.classList.contains("hidden"))
        {
          element.classList.remove("hidden");
          parent.classList.add("highlited");
        }
        
        else
        {
          element.classList.add("hidden");
          parent.classList.remove("highlited");
        }
   };

   toggleDropdown(){
     var element = document.getElementById("menuDropdown");
     if(element.classList.contains("is-active"))
        {
          element.classList.remove("is-active");
        }
        
        else
        {
          element.classList.add("is-active");
        }
   }

  render() {
    
    return (
      <div class="menuDetails">
      <div class="menuDropdown columns">
      <div onClick={() => this.toggleDropdown()} class="dropdown" id="menuDropdown">
  <div class="dropdown-trigger">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu2">
      <div class="dropContent">
        <p class="dropTitle">Marketing Team</p>
        <p class="dropSubTitle">17 members</p>
      </div>
      <span class="icon is-small dropIcon">
        <i class='uil uil-angle-down'></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu2" role="menu">
    <div class="dropdown-content">
      <div class="dropdown-item">
        <p>Lorem Ipsum</p>
      </div>
      
      <div class="dropdown-item">
        <p>Lorem ipsum</p>
      </div>
      
      <a href="#" class="dropdown-item">
        This is a link
      </a>
    </div>
  </div>
</div>
</div>

      <aside class="menu ">
      <p class="menuName">Storage</p>
        <p onClick={() => this.toggleClass(1)} class="menu-label" id="menu1">
          My Files
        </p>
        <ul class="menu-list hidden" id="menu1details">
          <li><a><i class='uil uil-angle-right'></i><i class='uil uil-folder-download'></i>Analytics</a></li>
          <li><a><i class='uil uil-angle-right'></i><i class='uil uil-folder-download'></i>Assets</a></li>
          <li><a><i class='uil uil-angle-right'></i><i class='uil uil-folder-download'></i>Marketing</a></li>
        </ul>
        <p onClick={() => this.toggleClass(2)} class="menu-label"  id="menu2">
          Shared with me
        </p>
        <ul class="menu-list hidden" id="menu2details">
          <li><a><i class='uil uil-angle-right'></i><i class='uil uil-folder-download'></i>Analytics</a></li>
          <li><a><i class='uil uil-angle-right'></i><i class='uil uil-folder-download'></i>Assets</a></li>
          <li><a><i class='uil uil-angle-right'></i><i class='uil uil-folder-download'></i>Marketing</a></li>
        </ul>
        <p class="menu-label">
          Recent
        </p>
        <p class="menu-label">
          Starred
        </p>
        <p class="menu-label">
          Trash
        </p>
        
      </aside>
      </div>)
  }
}
