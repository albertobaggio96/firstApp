import {AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { Todo } from 'src/app/type/todo';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.page.html',
  styleUrls: ['./todos-list.page.scss'],
})
export class TodosListPage implements OnInit{


  items! : Todo[];

  constructor( private ajax : AjaxService) { }

  ngOnInit() {
    this.getItems();
  }

  ionViewWillEnter(){
    this.getItems();
    console.log('ionViewWillEnter');
  }

  onIonInfinite(ev : Event) {
    this.items;
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  onDelete(index : string){
    this.ajax.deleteTodo('http://localhost:3000/todos', index)
      .subscribe((data : object) =>{
        console.log(data);
        this.getItems();
      })
  }

  getItems(){
    this.ajax.getTodos('http://localhost:3000/todos')
      .subscribe((data : Todo[]) => {
        this.items = data;
      })

  }

}
