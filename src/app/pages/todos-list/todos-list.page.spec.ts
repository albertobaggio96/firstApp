import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosListPage } from './todos-list.page';

describe('TodosListPage', () => {
  let component: TodosListPage;
  let fixture: ComponentFixture<TodosListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TodosListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
