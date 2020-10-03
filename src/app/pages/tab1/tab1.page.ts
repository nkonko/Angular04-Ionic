import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

constructor(public todoService: TodoService, private alertController: AlertController, private router: Router) { }

  async addToList()
  {
  const alert = await this.alertController.create({
    header: 'New List',
    inputs: [
       {
        name: 'title',
        type: 'text',
        placeholder: 'Write Something'
      }
    ],
    buttons: [
      {
        text: 'Cacel',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar');
        }
      },
      {
        text: 'Create',
        handler: (data) => {
          console.log(data);

          if (data.title.length === 0)
          {
            return;
          }

          const id = this.todoService.createList(data.title);

          this.router.navigateByUrl(`tabs/tab1/new/${ id }`);
        }
      }
    ]
  });

  alert.present();
  }
}
