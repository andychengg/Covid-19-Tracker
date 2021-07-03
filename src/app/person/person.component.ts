import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { People } from '../people';



@Component({
  selector: 'tr[app-person]',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent{
  @Input() person_input: People;
  @Output() delete = new EventEmitter();
  constructor(
    
  ){}

  

  onDelete(evt: Event) {
    console.log("deleting a person");
    this.delete.emit(this.person_input.id);
    window.location.reload(true);

  }
  }
  
 

