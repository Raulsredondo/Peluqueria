import { Component, OnInit } from '@angular/core';

declare var google;

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {

  map = null;

  lable = {
    color: 'blue',
    text: 'Marcador'
  }

  position = {
    lat: 37.380895,
    lng: -5.95731
  }

  constructor() { }

  ngOnInit() {
  }

  


  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const myLatLng = {lat: 37.380895, lng: -5.95731};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
     // this.renderMarkers();
      mapEle.classList.add('show-map');
    });
  }

}
