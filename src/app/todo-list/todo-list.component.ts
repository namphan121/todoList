import { Component, OnInit } from '@angular/core';
import { todoList } from '../todoList.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  beforeEditCache?: String;
  todoTitle!: String;
  idForTodo = 2;
  filter!:String;




  todo: todoList[] = [

  ];

  addTodo(): void {
    if (this.todoTitle?.trim().length === 0) {
      return;
    }

    this.todo.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false,
    });

    this.todoTitle = '';
    this.idForTodo++;
  }
  editTodo(todo: todoList): void {
    this.beforeEditCache = '';
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: todoList): void {
    if (this.todoTitle?.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
  }

  cancelEdit(todo: todoList): void {
    todo.editing = false;
  }

  removeTodo(id: number): void {
    this.todo = this.todo.filter((todo) => todo.id !== id);
  }

  remaining():number {
    return this.todo.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted():boolean {
    return this.todo.filter(todo => todo.completed).length > 0;
  }

  clearCompleted (): void {
    this.todo = this.todo.filter(todo => !todo.completed);
  }
  checkAllTodos(): void {
    this.todo.forEach(todo => todo.completed = (<HTMLInputElement>event?.target).checked)
  }

  todosFiltered(): todoList[] {
    if(this.filter === 'all'){
      return this.todo
    } else if (this.filter === 'active') {
      return this.todo.filter(todo => !todo.completed)
    } else if (this.filter === 'completed') {
      return this.todo.filter(todo => todo.completed)
    }

    return this.todo
  }

}
