import {Injectable} from '@nestjs/common';
import {CreateTodoDto} from "./create-todo.dto";

export interface Todo {
  id: number;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
}

@Injectable()
export class AppService {
  private todos: Todo[] = [];
  private id: number = 1;

  createTodo(createTodoDto: CreateTodoDto): Todo {
      const newTodo: Todo = {
        id: this.id++,
        title: createTodoDto.title,
        description: createTodoDto.description,
        date: createTodoDto.date,
        completed: false
      };

      this.todos.push(newTodo)
    return newTodo;
  }

  updateTodo(id: number, updateDate: Partial<CreateTodoDto>): Todo | null {
    const index = this.todos.findIndex((t) => t.id === id);
    if(index >= 0) {
     this.todos[index].title = updateDate.title!;
     this.todos[index].description = updateDate.description!;
      return this.todos[index];
    }
    return null;

  }

  getAllTodos() {
    return this.todos;
  }

  updateCompleted(id: number, completed?: boolean) {
      const index = this.todos.findIndex(t => t.id === id);
      if(index >= 0) {
        this.todos[index].completed = !this.todos[index].completed;
        return this.todos[index];
      }
    return null;
  }

  removeTodo(id: number) {
      const index =  this.todos.findIndex(t => t.id === id);

      if(index >= 0) {
        return this.todos.splice(index, 1)[0];
      }
      return null;
  }
}
