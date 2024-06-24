import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService, Task } from '../services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  productivityMode: boolean = false;
  tasks: Task[] = [];
  importantTasks: Task[] = [];

  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filterImportantTasks();
    });
  }

  filterImportantTasks() {
    if (this.productivityMode) {
      this.importantTasks = this.tasks.slice(0, 2);
    } else {
      this.importantTasks = this.tasks;
    }
  }

  toggleProductivityMode() {
    this.productivityMode = !this.productivityMode;
    this.filterImportantTasks();
  }

  goToCreateTask() {
    this.router.navigateByUrl('/create-task');
  }

  goToViewTasks() {
    this.router.navigateByUrl('/view-tasks');
  }
}



