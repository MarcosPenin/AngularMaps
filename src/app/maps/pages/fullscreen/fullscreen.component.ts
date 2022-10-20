import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styles: [
    `
    #map{
      height:100%;
      with:100%;
    }`
  ]
})

export class FullscreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const map = new mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/mapbox/streets-v11', 
      center: [-8.64, 42.43], 
      zoom: 9
    });
    map.on('style.load', () => {
      map.setFog({}); 
    });
  }

}
