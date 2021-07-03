import { Injectable } from '@angular/core';
import { People } from './people';
import { place } from './people';
import { map } from './map';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  place: place[] = [];
  marker: map[] = []
  map: google.maps.Map = null;

  constructor() { }

  getMap(parentMap: google.maps.Map) {
    this.map = parentMap;
  }

  loadMap(people: People[]) {
    if (people == null) {
      return;
    }

    for (let i = 0; i < people.length; i++) {
      this.place.push(people[i].place);
    }
    let markerName = [];
    for (let i = 0; i < this.marker.length; i++) {
      markerName.push(this.marker[i].id);
      console.log(markerName);
    }

    for (let i = 0; i < this.place.length; i++) {
      if (markerName.indexOf(this.place[i].location)) {
        this.addMarker(this.place[i], this.map);
      }
    }
    this.addCount(people);
  }

  addMarker(place: place, parentMap: google.maps.Map) {
    let marker = new google.maps.Marker({
      position: { lat: place.lat, lng: place.long },
      map: parentMap,
      label: { fontWeight: 'bold', fontSize: '10px', text: place.location },
     
    });
    let newMarker = new map(place.location, marker, 0);
    this.marker.push(newMarker);
    console.log(this.marker);
  }


  addCount(people: People[]) {
    for (let i = 0; i < this.marker.length; i++) {
      this.marker[i].count = 0;
    }

    for (var i = 0; i < people.length; i++) {
      for (var j = 0; j < this.marker.length; j++) {
        if (people[i].place.location === this.marker[j].id) {
          this.marker[j].addCount(this.map);
        }
      }
    }
  }

  // when a report is deleted decrement its report count
  subCount(deleted: People) {
    for (var i = 0; i < this.marker.length; i++) {
      if (this.marker[i].id === deleted.place.location) {
        this.marker[i].subCount();
      }
    }
  }
}


