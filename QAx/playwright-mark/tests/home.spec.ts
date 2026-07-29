/**
 * Importa duas funções da biblioteca oficial do Playwright.
 *
 * test   -> Função utilizada para definir um caso de teste.
 * expect -> Função utilizada para realizar validações (assertions).
 */
import { test, expect } from '@playwright/test';

//Cada chamada da função test() representa um caso de teste independente.
test('webapp deve estar online', async ({ page }) => {
/**
 * async -> Permite utilizar operações assíncronas com await.
 * page  -> Fixture do Playwright que representa uma aba do navegador.
 */

  //Acessa a URL da aplicação e aguarda o carregamento da página.
  await page.goto('http://localhost:8080/');

  /**
   * Valida se o título da página é exatamente o esperado.
   */
  await expect(page).toHaveTitle('Gerencie suas tarefas com Mark L');
});