import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../models/list-model';
import { ListItem } from '../../models/list-item.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage {

list: List;
itemName = '';

  constructor(private todoService: TodoService, private route: ActivatedRoute)
  {
    const id = route.snapshot.paramMap.get('id');

    this.list = todoService.getList(id);
   }

   addItem()
   {
    if (this.itemName.length === 0)
    {
       return;
    }

    const newItem = new ListItem(this.itemName);
    this.list.items.push(newItem);

    this.itemName = '';
    this.todoService.saveStorage();
  }

  storeCheck(item: ListItem)
  {
    const pendings = this.list.items.filter(itemData => !itemData.done).length;

    if (pendings === 0)
    {
      this.list.finishedOn = new Date();
      this.list.finished = true;
    }
    else
    {
      this.list.finishedOn = null;
      this.list.finished = false;
    }
    this.todoService.saveStorage();
  }

  deleteItem(i: number) {
    this.list.items.splice(i, 1);
    this.todoService.saveStorage();
  }

}
