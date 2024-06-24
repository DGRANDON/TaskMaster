import { Component } from '@angular/core';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.page.html',
  styleUrls: ['./view-tasks.page.scss'],
})
export class ViewTasksPage {
  tasks = [
    { title: 'Tarea 1', description: 'Descripción de la tarea 1', dueDate: new Date() },
    { title: 'Tarea 2', description: 'Descripción de la tarea 2', dueDate: new Date() },
    // Agrega más tareas según sea necesario
  ];

  constructor() {}
}

