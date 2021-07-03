export class People {
    id: number;
    name: string;
    date: string;
    place: place;
    phone: string;
    time: string;
    
    constructor(id:number, name:string, date:string, place:place, phone:string, time:string){
        this.id = id;
        this.name = name;
        this.date = date;
        this.place = place;
        this.phone = phone;
        this.time = time;
    }
}
export class place {
    location: string;
    long: number;
    lat: number;
    constructor(location:string, long:number, lat:number) {
        this.location =location;
        this.long = long;
        this.lat = lat;
    }
}