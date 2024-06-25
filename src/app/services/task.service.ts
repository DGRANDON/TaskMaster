import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { SqliteService } from './sqlite.service';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  subtasks: any[];
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private apiService: ApiService, private sqliteService: SqliteService) {}

  // Método para sincronizar las tareas entre SQLite y la API
  syncTasks(): Observable<void> {
    return this.sqliteService.getTasks().pipe(
      switchMap(localTasks => {
        return this.apiService.getTasks().pipe(
          switchMap(apiTasks => {
            // Aquí se puede implementar la lógica para sincronizar las tareas
            // Por simplicidad, vamos a suponer que las tareas del API siempre prevalecen
            const tasksToSave = apiTasks.map(apiTask => ({
              ...apiTask,
              id: apiTask.id
            }));

            return from(this.sqliteService.clearTasks()).pipe(
              switchMap(() => this.sqliteService.addTasks(tasksToSave))
            );
          })
        );
      })
    );
  }

  getTasks(): Observable<Task[]> {
    return this.sqliteService.getTasks();
  }

  addTask(task: Task): Observable<Task> {
    return from(this.sqliteService.addTask(task)).pipe(
      switchMap(() => this.apiService.createTask(task))
    );
  }

  deleteTask(id: number): Observable<void> {
    return from(this.sqliteService.deleteTask(id)).pipe(
      switchMap(() => this.apiService.deleteTask(id))
    );
  }
}
