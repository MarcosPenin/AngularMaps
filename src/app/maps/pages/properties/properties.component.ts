import { Component, OnInit } from '@angular/core';

interface Property {
  title: string;
  description: string;
  lngLat: [number, number];
}

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html'
})
export class PropertiesComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  properties: Property[] = [
    {
      title: 'FN Hotels Santiago',
      description: 'Cozy hotel in the old town',
      lngLat: [-8.54, 42.88]
    },
    {
      title: 'FN Hotels As Pontes',
      description: 'Nice hotel near with views of the central',
      lngLat: [-7.85, 43.45]
    },
    {
      title: 'FN Hotels Vigo',
      description: 'Luxury hotel in the Main Avenue',
      lngLat: [-8.72, 42.23]
    }

  ]

}
