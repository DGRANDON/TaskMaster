import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SqliteService } from './sqlite.service';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  subtasks: Task[];
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(private sqliteService: SqliteService) {
    this.loadTasks();
  }

  private async loadTasks() {
    this.tasks = await this.sqliteService.getTasks();
    this.tasksSubject.next(this.tasks);
  }

  getTasks() {
    return this.tasksSubject.asObservable();
  }

  async addTask(task: Task) {
    await this.sqliteService.addTask(task.title, task.description, task.dueDate, task.priority);
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
  }

  async updateTask(task: Task) {
    await this.sqliteService.updateTask(task.id, task.title, task.description, task.dueDate, task.priority);
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index > -1) {
      this.tasks[index] = task;
      this.tasksSubject.next(this.tasks);
    }
  }

  async deleteTask(taskId: number) {
    await this.sqliteService.deleteTask(taskId);
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.tasksSubject.next(this.tasks);
  }
}
