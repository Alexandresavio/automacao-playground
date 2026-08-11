import { test, expect } from '@playwright/test';
import { TaskModel } from './fixtures/task.model';
import { deleteByHelper, postTask } from './support/helpers';
import { TasksPage } from './support/pages/tasks';

test('deve poder cadastrar uma nova tarefa (validando comportamento )', async ({ page, request }) => {
  const task: TaskModel = {
    name: 'Ler um livro de TypeScript',
    is_done: false
  }
  await deleteByHelper(request, task.name);

  const tasksPage: TasksPage = new TasksPage(page);
  await tasksPage.go();
  await tasksPage.create(task);
  await tasksPage.shouldHaveText(task.name);

});

/*********************************************************************************************/
test('não deve permitir tarefa duplicada', async ({ page, request }) => {

  const task: TaskModel = {
    name: 'Estudar algoritmos',
    is_done: false
  };

  await deleteByHelper(request, task.name);
  await postTask(request, task);

  const tasksPage: TasksPage = new TasksPage(page);
  await tasksPage.go();
  await tasksPage.create(task);
  await tasksPage.alertHaveText('Task already exists!');

});