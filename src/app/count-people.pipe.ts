import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countPeople'
})
export class CountPeoplePipe implements PipeTransform {

  transform(people) {
    // let value = people.length;
    // return value;
  }

}
