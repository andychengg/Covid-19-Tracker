import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PersonService } from '../person.service';
import { place } from '../people';
import { People } from '../people';
import { MapService } from '../map.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit, OnChanges {
  @Input() coord: number[];
  @Input() newPlace: place[];
  people: People[];
  option: place[] = []
  form: FormGroup;
  SFU_B = new place("SFU Burnaby", 49.278094, -122.919883);
  SFU_S = new place("SFU Surrey", 49.1867, -122.8490);
  Metro = new place("Metrotown", 49.2276, -123.0076);
  YVR = new place("YVR", 49.1942, -123.1783)
  PC = new place("Pacific Centre", 49.2833, -123.1184);
  Brent = new place("Brentwood", 49.2682, -123.0006)
  place: place[] = [this.SFU_B, this.SFU_S, this.Metro, this.YVR, this.PC, this.Brent];

  constructor(private ps: PersonService, private ms: MapService) { }


  ngOnInit(): void {
    this.option = this.place;
    document.getElementById('reveal').addEventListener('click', function () {
      displayForm();
    });
    console.log(this.coord);
    this.form = new FormGroup({
      name: new FormControl(''),
      place: new FormControl(''),
      phone: new FormControl(''),
      location: new FormControl(''),
      locLat: new FormControl(''),
      locLong: new FormControl(''),
      date: new FormControl(''),
      time: new FormControl('')
    });


  }
  ngOnChanges(): void {
    if (this.coord.length != 0) {
      this.form.controls['locLat'].setValue(this.coord[1]);
      this.form.controls['locLong'].setValue(this.coord[0]);
    }
    this.option = this.place;
    for (let i = 0; i < this.newPlace.length; i++) {
      console.log(this.newPlace[i]);
      this.option.push(this.newPlace[i]);
    }
    this.option = this.option.filter((elem, index, self) => self.findIndex(
      (t) => { return (t.location === elem.location) }) === index);
  }

  onSubmit(input: any) {
    let input_place = new place(input.location,
      Number(input.locLat),
      Number(input.locLong));
    this.option.push(input_place);
    let newPerson = new People(input.id, input.name, input.date, input_place, input.phone, input.time);
    if(newPerson.name === '') {
      alert('Please Input Name');
    }
    else if (newPerson.date ==='' || newPerson.time === ''){
      alert('Please Fill in Both Date and Time')
    }
    else if (newPerson.phone ==='') {
      alert('Please Fill in Phone Number')
    }
    else if(newPerson.place.location === '') {
      alert('Please Fill in Location')
    }
    else{
      let date: string = (newPerson.date).toString();
      newPerson.date = (date).replace("00:00", newPerson.time)
      this.ps.add(newPerson);
      this.ms.loadMap(this.ps.people)
    }




  }


  setPlace(places: MatSelectChange) {
    this.form.controls['location'].setValue(places.value.location);
    this.form.controls['locLat'].setValue(places.value.lat);
    this.form.controls['locLong'].setValue(places.value.long);
  }

}
function displayForm() {
  let form = document.getElementById('Personform');
  let button = document.getElementById('reveal');

  if (form.className != 'reveal') {
    form.style.visibility = 'visible';
    form.className = 'reveal'
    button.innerHTML = "Cancel"
    button.style.backgroundColor = "#c90e0e";
  } else {
    form.style.visibility = 'hidden';
    form.className = 'notReveal';
    console.log(form.className);
    button.innerHTML = "CREATE COVID-19 REPORT"
    button.style.backgroundColor = "#1646e0"
  }
}
