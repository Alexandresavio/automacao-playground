import { test, expect } from '@playwright/test';

test('deve poder cadastrar uma nova tarefa (validando comportamento )', async ({ page, request }) => {

  const taskName = 'Ler um livro de TypeScript';

  await request.delete('http://localhost:3333/helper/tasks/' + taskName);

  await page.goto('http://localhost:8080/');

  const inputTaskName = page.locator('input[class*=InputNewTask]');
  await inputTaskName.fill(taskName);
  await page.click('xpath=//button[contains(text(), "Create")]');

  const target = page.locator(`css=.task-item p >> text=${taskName}`);
  await expect(target).toBeVisible();  

});

test('não deve permitir tarefa duplicada', async ({page}) => {
  
});