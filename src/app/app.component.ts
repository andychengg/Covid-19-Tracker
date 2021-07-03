
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PersonService } from './person.service';
import { Observable } from 'rxjs';
import { People } from './people';
import { MapService } from './map.service';
import { MatSelectChange } from '@angular/material/select';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'COVID-19 TRACKER';
  people: People[] = [];
  mapPeople: People[] = [];
  sort: string[] = ['Name','Place','New','Old'];
  name: any;
  mapCoord: number[] = [];
  option: any[] = [];

  searchControl = new FormControl();
  filteredOptions: Observable<string[]>;


  constructor(public ps: PersonService, private ms: MapService) {

  }
  ngOnInit() {
    this.ps.getData().subscribe((response) => {
      console.log(response);
      this.people = [];
      for (let i = 0; i < response.length; i++) {
        let data = response[i].data;
        let newPerson = new People(data.id, data.name, data.date, data.place, data.phone, data.time);
        this.people.push(newPerson);
       
        console.log(this.people);
        
      }
      this.ps.people = this.people;
      this.mapPeople = this.people;
      this.option = this.ms.place;
    });
    
    console.log(this.people);

  }

  Search() {
    if (this.name == "") {
      window.location.reload(true);
      this.ngOnInit;
      
    }
    else {

      this.people = this.people.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }
    
  }

  sortReportsBy(option: MatSelectChange) {
    console.log(option);
    if (option.value === 'Name'){
      this.ps.sortName();
    }
    else if (option.value === 'New') {
      this.ps.sortNew();
    }
    else if (option.value === 'Old') {
      this.ps.sortOld();
    }
    else if (option.value === 'Place') {
      this.ps.sortLocation();
    }
  }


  onPersonDeleted(evt: People) {
    console.log(evt);
    this.ps.delete(evt);
    this.ms.subCount(evt);

  }
  getCoords(evt: number[]) {
    this.mapCoord = evt;
    console.log(this.mapCoord);
  }



}
