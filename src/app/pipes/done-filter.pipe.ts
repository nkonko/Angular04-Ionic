import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../models/list-model';

@Pipe({
  name: 'doneFilter',
  pure: false
})
export class DoneFilterPipe implements PipeTransform {

  transform(lists: List[], done: boolean = true): List[] {
    return lists.filter(list => list.finished === done);
  }

}
