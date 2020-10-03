import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { List } from 'src/app/models/list-model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent {
  @ViewChild( IonList ) listIon : IonList;
  @Input() done = true;

  constructor(public todoService: TodoService, private router: Router, private alertController: AlertController) { }

  selectedList(list: List){

    if (this.done)
    {
      this.router.navigateByUrl(`tabs/tab2/new/${ list.id }`);
    }
    else
    {
      this.router.navigateByUrl(`tabs/tab1/new/${ list.id }`);
    }
  }

  deleteItem(list: List)
  {
    this.todoService.deleteItem(list);
  }

    async editItem(list: List)
    {
      const alert = await this.alertController.create({
        header: 'Change Title',
        inputs: [
          {
            name: 'title',
            type: 'text',
            placeholder: 'Write Something'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.listIon.closeSlidingItems();
            }
          },
          {
            text: 'Update',
            handler: (data) => {

              if (data.title.length === 0)
              {
                return;
              }

              list.title = data.title;
              this.todoService.saveStorage();
              this.listIon.closeSlidingItems();
            }
          }
        ]
      });
      alert.present();
    }

}
