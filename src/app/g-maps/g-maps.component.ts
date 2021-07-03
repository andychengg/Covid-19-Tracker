/// <reference types="@types/googlemaps" />
import { AfterViewInit,ViewChild, Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { MapService } from '../map.service';
import { People } from '../people';
@Component({
  selector: 'app-g-maps',
  templateUrl: './g-maps.component.html',
  styleUrls: ['./g-maps.component.css']
})
export class GMapsComponent implements AfterViewInit,OnChanges {
  @Input() people: People[];

  title = 'gmaps';
  coord: number[] = [];
  
  @ViewChild('gmap') gmapElement;
  map: google.maps.Map;
  

  constructor(private ms: MapService) {}
  
  ngAfterViewInit(): void {
    var mapProp = {
      center: new google.maps.LatLng(49.2, -123),
      zoom: 10,
      
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.ms.getMap(this.map);
    
  
  }
  ngOnChanges(): void {
    console.log(this.people);
    if(this.people != null) {
      this.ms.loadMap(this.people);
    }
  }

}
