// Importa duas funções da biblioteca oficial do Playwright.
import { test, expect } from '@playwright/test';
/**
 * 
 */

//Cada chamada da função test() representa um caso de teste independente.
test('webapp deve estar online', async ({ page }) => {
/**
 * async -> Permite utilizar operações assíncronas com await.
 * page  -> Fixture do Playwright que representa uma aba do navegador.
 */

  //Acessa a URL da aplicação e aguarda o carregamento da página.
  await page.goto('http://localhost:8080/');
  
  /**
   * expect -> Função utilizada para realizar validações (assertions)
   * Valida se o título da página é exatamente o esperado.
   */
  await expect(page).toHaveTitle('Gerencie suas tarefas com Mark L');
});



/***********************************************************************************************
 * SELETORES
 ***********************************************************************************************/

/**
 * Acessando elementos por ID:
 * O seletor por ID utiliza o caractere "#".
 * Geralmente é a forma mais rápida e confiável de localizar um elemento.
 */
test('Deve poder cadastrar uma nova tarefa (acessando elemento por ID)', async ({ page }) => {

  await page.goto('http://localhost:8080/');

  // Localiza um input cujo elemento seja um ID
  await page.fill('#newTask', 'Ler um livro de TypeScript');

});


/*********************************************************************************************** */

/**
 * Acessando elementos por atributo CSS
 *
 * Sintaxe: elemento[atributo="valor"]
 */
test('Deve poder cadastrar uma nova tarefa (acessando elemento por atributo CSS)', async ({ page }) => {

  await page.goto('http://localhost:8080/');

  // Localiza um input cujo placeholder seja "Add a new Task"
  await page.fill('input[placeholder="Add a new Task"]', 'Ler um livro de TypeScript');

  /**
   * Outro exemplo seria localizar o elemento pelo atributo "type",
   * caso ele não possuísse um placeholder.
   * Exemplo:
   * await page.fill('input[type="text"]', 'Ler um livro de TypeScript');
   */

});

/*********************************************************************************************** */

/**
 * Acessando elementos por classe parcial
 *
 * O operador "*=" significa "contém".
 *
 * É muito útil quando a classe possui um nome dinâmico
 * ou quando queremos localizar apenas uma parte dela.
 */
test('Deve poder cadastrar uma nova tarefa (acessando elemento por classe parcial)', async ({ page }) => {

  await page.goto('http://localhost:8080/');

  await page.fill('input[class*="InputNewTask"]', 'Ler um livro de TypeScript');

});

/***********************************************************************************************
 * LOCATORS
 ***********************************************************************************************/

/**
 * Mapeando elementos com Locator 
 * Ao invés de utilizar: await page.fill(selector, valor);
 *
 * Podemos criar uma referência para o elemento e reutilizá-la
 * durante todo o teste.
 */
test('Deve poder cadastrar uma nova tarefa (mapeando elementos com locator)', async ({ page }) => {

  await page.goto('http://localhost:8080/');

  /**
   * Em projetos maiores, esse locator normalmente fica centralizado
   * em uma Page Object.
   *
   * Neste momento estamos repetindo o seletor apenas para facilitar
   * o aprendizado sobre como o Playwright localiza elementos.
   */

  // Cria uma referência para o elemento (nenhuma interação acontece neste momento.).
  const inputTaskName = page.locator('input[class*="InputNewTask"]');

  // Executa o preenchimento do campo.
  await inputTaskName.fill('Ler um livro de TypeScript');

});

/***********************************************************************************************
 * CLIQUES + xpath
 ***********************************************************************************************/

/**
 * Existem diversas formas de localizar um botão.
 */
test('Deve poder cadastrar uma nova tarefa (clicando em um botão)', async ({ page }) => {

  await page.goto('http://localhost:8080/');

  await page.fill('input[class*="InputNewTask"]', 'Ler um livro de TypeScript');

  /**
   * 1. Utilizando XPath (menos recomendado)
   */
  await page.click('xpath=//button[contains(text(), "Create")]');

  /**
   * Outras formas de localizar o mesmo botão:
   *
   * CSS + Texto
   * await page.click('css=button >> text=Create');
   *
   * Forma recomendada pelo Playwright
   * await page.getByRole('button', { name: 'Create' }).click();
   */

});

/***********************************************************************************************
 * XPATH
 ***********************************************************************************************/

test('deve poder cadastrar uma nova tarefa (XPATH)', async ({ page }) => {

  await page.goto('http://localhost:8080/');

  /**
   * Cria uma referência para o campo de cadastro da tarefa.
   */
  const inputTaskName = page.locator('input[class*="InputNewTask"]');

  await inputTaskName.fill('Ler um livro de TypeScript');

  await page.click('xpath=//button[contains(text(), "Create")]');

});

/***********************************************************************************************
 * UTILIZANDO DADOS DINÂMICOS
 ***********************************************************************************************/
// Importação da biblioteca Faker para geração de dados dinâmicos
import { faker } from '@faker-js/faker';
test.only ('deve poder cadastrar uma nova tarefa utilizando dados dinâmicos', async ({ page }) => {

  // Acessa a aplicação
  await page.goto('http://localhost:8080/');

 // Cria uma referência para o campo de cadastro da tarefa. Localiza o campo de cadastro
 
  const inputTaskName = page.locator('input[class*="InputNewTask"]');

  // Preenche utilizando dados gerados pelo Faker. Dessa forma evitamos repetir sempre a mesma informação.
  await inputTaskName.fill(faker.lorem.words());

  // Clica no botão Create
  await page.click('xpath=//button[contains(text(), "Create")]');

});

/***********************************************************************************************
 * PREPARAÇÃO DA MASSA DE TESTES
 ***********************************************************************************************/

test ('deve poder cadastrar uma nova tarefa limpando a massa antes do teste', async ({ page, request }) => {

  const taskName = 'Ler um livro de TypeScript';

  /**
   * Remove previamente a tarefa, caso ela já exista.
   *
   * Isso garante que o teste sempre comece com o ambiente limpo,
   * evitando falhas causadas por dados de execuções anteriores.
   */
  await request.delete('http://localhost:3333/helper/tasks/' + taskName);

  await page.goto('http://localhost:8080/');

  // Localiza o campo
  const inputTaskName = page.locator('input[class*=InputNewTask]');

  // Cadastra a tarefa
  await inputTaskName.fill(taskName);

  // Clica no botão Create
  await page.click('xpath=//button[contains(text(), "Create")]');

});

/***********************************************************************************************
 * CENÁRIO COMPLETO (Gherkin)
 ***********************************************************************************************/

test ('deve poder cadastrar uma nova tarefa (validando comportamento )', async ({ page, request }) => {

  // Dado que eu tenho uma nova tarefa
  const taskName = 'Ler um livro de TypeScript';

  // Remove a tarefa caso ela já exista
  await request.delete('http://localhost:3333/helper/tasks/' + taskName);

  // E que estou na página inicial
  await page.goto('http://localhost:8080/');

  // Quando realizo o cadastro da tarefa
  const inputTaskName = page.locator('input[class*=InputNewTask]');

  await inputTaskName.fill(taskName);

  await page.click('xpath=//button[contains(text(), "Create")]');

  // Então a tarefa deve ser exibida na lista
  await expect(page.getByText(taskName)).toBeVisible();

});
/***********************************************************************************************
 * DEIXANDO TESTES INDEPENDENTES
 * Objetivo: Garantir que este cenário possa ser executado isoladamente,sem depender da execução
 * de outros testes ou da existência prévia da massa de dados no ambiente.
 ***********************************************************************************************/

/**
 * Cenário que valida que o sistema não permite cadastrar uma tarefa duplicada.
 * Além do objeto "page", também utilizamos "request" para realizar chamadas diretamente na API da aplicação.
 */
// test.only ('não deve permitir tarefa duplicada', async ({ page, request }) => {
//   await page.goto('http://localhost:8080/');

//   const inputTaskName = page.locator('input[class*=InputNewTask]');
//   await inputTaskName.fill();
// });



/***********************************************************************************************
 * Modelando a massa de testes com interfaces do TypeScript
 ***********************************************************************************************/
// na parte dos imports deve importar a interface:

// test('não deve permitir tarefa duplicada (parte 2)', async({page, request}) => {
//   const task: TaskModel ={
//     name:'Estudar algoritmo',
//     is_done: false
//   }
//   await request.delete('http://localhost:3333/helper/tasks/' + task.name);
//   await request.post('http://localhost:3333/tasks/' + task.name);

//   await page.goto('http://localhost:8080/');
  
//   const inputTaskName = page.locator('input[class*=InputNewTask]');
  
//   await inputTaskName.fill(task.name);
//   await page.click('css=button >> text=Create');

//   const target = page.locator('.swal2-html-container')
//   await expect(target).toHaveText('Task already exists!');
// })



