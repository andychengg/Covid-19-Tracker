/// <reference types = "@types/googlemaps" />

export class map {
    id: string;
    marker: google.maps.Marker;
    count: number;
    constructor(id:string, marker:google.maps.Marker,count:number){
        this.id = id;
        this.marker = marker;
        this.count = count;
        if (this.count === 0) {
            this.marker.setMap(null);
        }
    }
    addCount(parentMap:google.maps.Map) {
        this.count++;
        if (this.count > 0) {
            this.marker.setMap(parentMap);
        }
     
      
      
    }
    subCount() {
        this.count--;
        if (this.count === 0) {
            this.marker.setMap(null);
        }

    }
}