import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService, Task } from '../services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage {
  taskForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [''],
      priority: ['medium', Validators.required],
      subtasks: this.formBuilder.array([]) // Usaremos FormArray para las subtareas más adelante
    });
  }

  async addTask() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: Date.now(), // Esto será reemplazado por el ID autoincrementado de SQLite
        ...this.taskForm.value,
        subtasks: [] // Inicializamos las subtareas vacías por ahora
      };
      await this.taskService.addTask(newTask);
      this.router.navigateByUrl('/dashboard');
    } else {
      console.log('Formulario no válido');
    }
  }
}
