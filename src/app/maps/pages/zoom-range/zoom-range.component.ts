import { Component, OnDestroy, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .map-container{
      height:100%;
      with:100%;
    } 
    .row{
      background-color:white;
      border-radius:5px;
      bottom:50px;
      left:50px;
      width:400px;
      padding:10px;
      position:fixed;
       z-index:999;
    }
    
    `
  ]
})
export class ZoomRangeComponent implements OnInit, OnDestroy {

  map!: mapboxgl.Map;
  zoomLevel: number = 9;
  center: [number, number] = [-8.64, 42.43]

  constructor() { }

  ngOnDestroy(): void {
    this.map.off("zoom", () => { })
    this.map.off("zoomend", () => { })
    this.map.off("move", () => { })
  }

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });
    this.map.on('style.load', () => {
      this.map.setFog({});
    });

    this.map.on("zoom", (ev) => {
      this.zoomLevel = this.map.getZoom()
    })

    this.map.on("zoomend", (ev) => {
      if (this.map.getZoom() > 18) {
        this.map.zoomTo(18)
      }
    })
    this.map.on("move", (ev) => {
      const target = ev.target;
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat]

    })


  }

  zoomOut() {
    this.map.zoomOut();
  }

  zoomIn() {
    this.map.zoomIn();
  }

  zoomChange(value: string) {
    this.map.zoomTo(Number(value))
  }




}
