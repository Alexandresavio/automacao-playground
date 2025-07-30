# Curso de Automação de Testes com Cypress.

---

# 🧪 **Guia de Estudo Cypress do Iniciante ao Avançado**

Aprenda de forma didática e prática os principais tópicos abordados no curso *Cypress Playground*:

---

### 🔧 **1. Como configurar um projeto Cypress do zero**

- Crie uma pasta para o projeto e execute:
    
    ```bash
    npm init -y
    npm install cypress --save-dev
    npx cypress open
    
    ```
    
- O Cypress criará a estrutura inicial do projeto (`cypress/`, `cypress.config.js`, etc).

---

### 📁 **2. Como organizar suítes de testes e casos de teste**

- **Suíte**: grupo de testes com `describe`.
- **Caso de teste**: um teste dentro da suíte com `it`.

```jsx
describe('Login', () => {
  it('deve fazer login com sucesso', () => {
    // passos do teste
  });
});

```

---

### 🌐 **3. Como visitar páginas web**

```jsx
cy.visit('https://exemplo.com');

```

---

### 🔍 **4. Como obter elementos para interação ou verificação**

```jsx
cy.get('input[name="email"]'); // por seletor
cy.contains('Enviar'); // por texto

```

---

### 🖱️ **5. Como clicar em botões e links**

```jsx
cy.get('button[type="submit"]').click();

```

---

### ⌨️ **6. Como digitar em campos**

```jsx
cy.get('input[name="email"]').type('teste@exemplo.com');

```

---

### ☑️ **7. Como marcar e desmarcar checkboxes**

```jsx
cy.get('#meu-checkbox').check();
cy.get('#meu-checkbox').uncheck();

```

---

### 🔘 **8. Como marcar radio buttons**

```
cy.get('input[type="radio"][value="opcao1"]').check();

```

---

### ⬇️ **9. Como selecionar opções em campos de seleção suspensa**

```
cy.get('select').select('Valor 1');

```

---

### ✅ **10. Como selecionar múltiplas opções em `select` múltiplo**

```
cy.get('select[multiple]').select(['opcao1', 'opcao2']);

```

---

### 📤 **11. Como testar o upload de arquivos**

- Instale plugin:
    
    ```bash
    npm install --save-dev cypress-file-upload
    
    ```
    
- Use no teste:
    
    ```
    import 'cypress-file-upload';
    cy.get('input[type="file"]').attachFile('arquivo.pdf');
    
    ```
    

---

### 🌐 **12. Como interceptar requisições e aguardar por elas**

```
cy.intercept('GET', '/api/dados').as('getDados');
cy.visit('/pagina');
cy.wait('@getDados');

```

---

### 🧪 **13. Como interceptar e devolver dados estáticos com fixtures**

- Crie `cypress/fixtures/usuarios.json`

```json
{ "nome": "João", "idade": 30 }

```

- No teste:

```
cy.intercept('GET', '/api/usuarios', { fixture: 'usuarios.json' });

```

---

### 💥 **14. Como testar a falha de uma API**

```
cy.intercept('GET', '/api/usuarios', {
  statusCode: 500,
  body: { erro: 'Erro interno' }
});

```

---

### 🌐❌ **15. Como testar uma falha na rede**

```
cy.intercept('GET', '/api/usuarios', { forceNetworkError: true });

```

---

### 🔁 **16. Como realizar requisições REST**

```
cy.request('POST', '/api/login', { usuario: 'joao', senha: '123' });

```

---

### 🎚️ **17. Como lidar com campos do tipo `range`**

```
cy.get('input[type="range"]').invoke('val', 75).trigger('change');

```

---

### 📅 **18. Como lidar com campos de data**

```
cy.get('input[type="date"]').type('2025-07-30');

```

---

### 🔐 **19. Como buscar dados sensíveis em locais seguros**

- Use `Cypress.env()` para armazenar dados em `cypress.config.js` ou `.env`.

```
cy.login(Cypress.env('usuario'), Cypress.env('senha'));

```

---

### 🛡️ **20. Como proteger dados sensíveis nos prints e logs**

```
Cypress.env('senha', 'segredo123');
// Evite imprimir `senha` nos logs

```

---

### 🔢 **21. Como contar elementos com Cypress**

```
cy.get('.item').should('have.length', 5);

```

---

### 🕒 **22. Como congelar o relógio do navegador**

```
cy.clock(new Date(2025, 6, 30)); // 30/07/2025

```

---

### 🔄 **23. Como usar dados da aplicação como entrada**

- Exemplo: usar ID gerado numa resposta:

```
cy.request('/api/novo').then((res) => {
  cy.visit(`/detalhe/${res.body.id}`);
});

```

---

### 📂 **24. Como testar a leitura de arquivos**

```
cy.readFile('cypress/fixtures/usuarios.json').should('contain', 'João');

```

---

### 📚 Referências recomendadas para aprofundar seus estudos:

- 📘 **Documentação oficial do Cypress**:
    
    [https://docs.cypress.io/api/table-of-contents](https://docs.cypress.io/api/table-of-contents)
    
- 🧪 **Repositório do curso Cypress Playground** (por Walmyr Lima):
    
    [https://github.com/wlsf82/curso-cypress-playground](https://github.com/wlsf82/curso-cypress-playground)
    
- 🎥 **Canal YouTube - Talking About Testing**:
    
    [https://www.youtube.com/@TalkingAboutTesting](https://www.youtube.com/@TalkingAboutTesting)
    
- 🧂 **Blog - Pitadas de Cypress (artigos)**:
    
    [https://talkingabouttesting.com/tag/pitadas-de-cypress/](https://talkingabouttesting.com/tag/pitadas-de-cypress/)