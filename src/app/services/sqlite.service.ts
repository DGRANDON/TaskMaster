import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private dbInstance: SQLiteObject | undefined;
  readonly db_name: string = "taskmaster.db";
  readonly db_table: string = "tasks";

  constructor(private sqlite: SQLite) {
    this.createDatabase();
  }

  async createDatabase() {
    try {
      this.dbInstance = await this.sqlite.create({
        name: this.db_name,
        location: 'default'
      });
      await this.createTable();
    } catch (error) {
      console.error('Unable to open database', error);
    }
  }

  async createTable() {
    if (this.dbInstance) {
      try {
        await this.dbInstance.executeSql(`
          CREATE TABLE IF NOT EXISTS ${this.db_table} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            dueDate TEXT,
            priority TEXT
          )`, []);
      } catch (error) {
        console.error('Unable to create table', error);
      }
    }
  }

  async addTask(title: string, description: string, dueDate: string, priority: string) {
    if (this.dbInstance) {
      const data = [title, description, dueDate, priority];
      await this.dbInstance.executeSql(`INSERT INTO ${this.db_table} (title, description, dueDate, priority) VALUES (?, ?, ?, ?)`, data);
    }
  }

  async getTasks() {
    if (this.dbInstance) {
      const res = await this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []);
      let tasks: any[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          tasks.push(res.rows.item(i));
        }
      }
      return tasks;
    }
    return [];
  }

  async updateTask(id: number, title: string, description: string, dueDate: string, priority: string) {
    if (this.dbInstance) {
      const data = [title, description, dueDate, priority];
      await this.dbInstance.executeSql(`UPDATE ${this.db_table} SET title = ?, description = ?, dueDate = ?, priority = ? WHERE id = ${id}`, data);
    }
  }

  async deleteTask(id: number) {
    if (this.dbInstance) {
      await this.dbInstance.executeSql(`DELETE FROM ${this.db_table} WHERE id = ${id}`, []);
    }
  }
}


