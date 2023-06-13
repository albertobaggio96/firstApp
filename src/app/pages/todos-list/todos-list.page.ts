import { Component, OnInit } from '@angular/core';

import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { AddTodoPage } from '../add-todo/add-todo.page';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.page.html',
  styleUrls: ['./todos-list.page.scss'],
})
export class TodosListPage implements OnInit {

  items! : string[]

  constructor(private serviceList : ListService) {
    console.log(serviceList)
   }

  ngOnInit() {
    this.items = this.serviceList.todosList
  }

  onIonInfinite(ev : Event) {
    this.items;
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  onDelete(index : number){
    console.log(index)
    this.serviceList.todosList.splice(index, 1)
  }

}
