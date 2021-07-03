import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { People } from './people';
import { keyData } from './keyData';
import {AppComponent} from './app.component'






@Injectable({
  providedIn: 'root'
})
export class PersonService {
  people: People[] = [];
  ids: number[];
  number = 0;
  constructor(
    private http: HttpClient, ) { }
  getData() {
    return this.http.get<keyData[]>("https://218.selfip.net/apps/QlF9bkA1ZY/collections/data/documents");
      
  }
  add(newPerson: People) {
    this.ids = []
    for (let i = 0; i < this.people.length; i++) {
      this.ids.push(this.people[i].id);
    }
    while (this.ids.indexOf(this.number) != -1) {
      this.number++;
    }
    newPerson.id = this.number;
    this.people.push(newPerson);
    let data = "data" + (this.number).toString();
    this.http.post<object>("https://218.selfip.net/apps/QlF9bkA1ZY/collections/data/documents/", {
      "key": data,
      "data": newPerson
    }).subscribe();
    
    return newPerson;
  }

  delete(deletePerson: People) {
    console.log(deletePerson);
    let id = "data" + (deletePerson).toString();
    console.log(id);
    return this.http.delete("https://218.selfip.net/apps/QlF9bkA1ZY/collections/data/documents/" + id + '/').subscribe();

  }

  sortName() {
    function compare(a:People, b:People) {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
    }
    this.people.sort(compare);
  }

  sortNew() {
    function compare(a:People, b:People) {
      let dateA = Date.parse((a.date).substring(0, 24))
      let dateB = Date.parse((b.date).substring(0, 24))
      return dateB - dateA
    }
    this.people.sort(compare);
  }

  sortOld() {
    function compare(a:People, b:People) {
      let dateA = Date.parse((a.date).substring(0, 24))
      let dateB = Date.parse((b.date).substring(0, 24))
      return dateA - dateB
    }
    this.people.sort(compare);
  }
  sortLocation() {
    function compare(a:People, b:People) {
      if(a.place.location < b.place.location) { return -1; }
      if(a.place.location > b.place.location) { return 1; }
      return 0;
    }
    this.people.sort(compare);
  }
}




