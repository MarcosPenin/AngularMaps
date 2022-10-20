import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?:[number,number]
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [
    `
    .map-container{
      height:100%;
      with:100%;
    }   
    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }
    li {
      cursor: pointer;
    }

    `
  ]
})
export class MarkersComponent implements OnInit {

  map!: mapboxgl.Map;
  zoomLevel: number = 9;
  center: [number, number] = [-8.64, 42.43]
  markers: MarkerColor[] = []

  constructor() { }

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });
    this.readLocalStorage();
   // const marker = new mapboxgl.Marker().setLngLat(this.center).addTo(this.map)
  }


  addMarker() {
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

    const marker = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat( this.center )
      .addTo( this.map );
      
    this.markers.push({
      color,
      marker
    });

    this.saveMarkersLocalStorage()

    marker.on('dragend', () => {
      this.saveMarkersLocalStorage();
    });

  }

  goMarker(marker: mapboxgl.Marker) {
    this.map.flyTo({
      center: marker.getLngLat(),
      zoom:14

    })

  }


  saveMarkersLocalStorage() {

    const lngLatArr: MarkerColor[] = [];

    this.markers.forEach( m => {

      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        center: [ lng, lat ]
      });
    })

    localStorage.setItem('markers', JSON.stringify(lngLatArr) );

  }

  readLocalStorage() {
    
    if ( !localStorage.getItem('markers') ) {
      return;
    }

    const lngLatArr: MarkerColor[] = JSON.parse( localStorage.getItem('markers')! );

    lngLatArr.forEach( m => {

      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat( m.center! )
        .addTo( this.map );

      this.markers.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragend', () => {
        this.saveMarkersLocalStorage();
      });


    });
    
  }

  deleteMarker(i:number){
    this.markers[i].marker?.remove();
    this.markers.splice(i,1);
    this.saveMarkersLocalStorage()

  }

}
