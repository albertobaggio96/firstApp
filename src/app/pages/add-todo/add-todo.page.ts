import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AjaxService } from 'src/app/services/ajax.service';
import { Todo } from 'src/app/type/todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})
export class AddTodoPage implements OnInit {

  addTodoForm! : FormGroup;

  todo! : string;

  isNew = true;

  id! : string;

  constructor(private ajax : AjaxService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {

    // per prendere i parametri
    this.route.paramMap.subscribe((params : ParamMap) => {

      this.todo = '';
      this.addTodoForm = new FormGroup({
        todo: new FormControl(this.todo, [Validators.required, Validators.min(2), Validators.max(30)])
      });

      // controllo se non è un nuovo todo
      if (params.get('id') !== 'new'){

        // salvo l'id in una variabile
        this.id = params.get('id')!;

        this.isNew = false;

        // prendo e salvo dati del todo che voglio modificare
        this.ajax.getTodo('http://localhost:3000/todos', this.id)
          .subscribe((data : Todo) => {
            this.todo = data.title;
            this.addTodoForm = new FormGroup({
              todo: new FormControl(this.todo, [Validators.required, Validators.min(2), Validators.max(30)])
            });
          })

      }
    })

  }

  onSubmit(){
    // se è nuovo lo aggiungo alla fine, se è un edit lo modifico
    if(this.isNew){
      this.ajax.createTodo('http://localhost:3000/todos', {title : this.addTodoForm.value.todo})
        .subscribe((data: any) =>{
          console.log(data.acknowledged);
          if(data.acknowledged){
            this.router.navigate(['/todos-list']);
          }
        })
    } else {
      this.ajax.editTodo('http://localhost:3000/todos', this.id, {title : this.addTodoForm.value.todo})
        .subscribe((data : any) =>{
          console.log(data.acknowledged);
          if(data.acknowledged){
            this.router.navigate(['/todos-list']);
          }
        })
    }
  }

}
