import { Component } from '@angular/core';

interface MenuItem {
  url: string;
  name: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  menuItems: MenuItem[] = [
    {
      url: "/maps/fullscreen",
      name: "Fullscreen"
    },
    {
      url: "/maps/zoom-range",
      name: "Zoom Range"
    },
    {
      url: "/maps/markers",
      name: "Markers"
    },
    {
      url: "/maps/properties",
      name: "Properties"
    },

  ];

}