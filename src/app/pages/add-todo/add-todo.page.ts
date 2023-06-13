import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})
export class AddTodoPage implements OnInit, OnDestroy {

  addTodoForm! : FormGroup

  todo! : string

  isNew = false

  id! : number

  constructor(private listService : ListService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {

    this.route.paramMap.subscribe((params : ParamMap) => {
      console.log(params.get('id'))

      // controllo se si crea un nuovo todo o è un edit di uno esistente
      if (params.get('id') === 'new'){
        this.todo = ''
        this.isNew = true
      } else if (Number.parseInt(params.get('id')!, 10) < this.listService.todosList.length){
        this.id = Number.parseInt(params.get('id')!, 10)
        this.todo = this.listService.todosList[this.id]
      } else {
        // negli altri casi viene reindirizzato sulla pagina 404
        console.log(this.router.navigateByUrl('/not-found'))
      }
    })

    console.log(this.todo)
    this.addTodoForm = new FormGroup({
      todo: new FormControl(this.todo, [Validators.required, Validators.min(2), Validators.max(30)])
    })
  }

  onSubmit(){
    // se è nuovo lo aggiungo alla fine, se è un edit lo modifico
    if(this.isNew){
      this.listService.todosList.push(this.addTodoForm.value.todo)
    } else {
      this.listService.todosList[this.id] = this.addTodoForm.value.todo
    }
  }

  ngOnDestroy(): void {
    this.todo = ''
  }

}
