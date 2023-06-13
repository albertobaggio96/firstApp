import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos-list',
    pathMatch: 'full'
  },
  {
    path: 'todos-list',
    loadChildren: () => import('./pages/todos-list/todos-list.module').then( m => m.TodosListPageModule)
  },
  {
    path: 'add-todo/:id',
    loadChildren: () => import('./pages/add-todo/add-todo.module').then( m => m.AddTodoPageModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
