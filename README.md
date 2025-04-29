# Products API

**Sistema de gerenciamento de produtos**

Desenvolvido com **Nest & React**, este sistema permite que usuários realizem cadastro de produto, edição, listagem e deleção. 🚀

---

## 📦 Tecnologias Utilizadas

🛠 **Backend:** Nest (API REST)  
🎨 **Frontend:** React  
🐳 **Containers:** Docker & Docker Compose  
💎 **UI:** Tailwind e Shadcn  
🗄 **Banco de Dados:** PostgreSql  
✅ **Testes:** Jest

---

## 🚀 Como Rodar o Projeto

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/Lucas-0802/products_api.git
cd products_api
```

### 2️⃣ Subir os Containers 🚢

```bash
docker compose up -d
```

### 3️⃣ Subir os Containers 🚢

Abra **http://localhost:5173** para visualizar a aplicação.

### 4️⃣ Rodando os Testes ⚙️

```bash
docker compose run --no-deps --rm backend npm run test
```

---

**Pontos de melhoria futuros**

Devido ao pouco tempo que tive para atuar nesse projeto, nem todos os pontos ficaram conforme eu desejava. Segue abaixo alguns pontos em que eu trabalharia para melhorar:
 1. Cobertura maior dos testes unitários
 2. Implementação de testes end 2 end
 3. Definição das imagens Docker para desenvolvimento e produção
 4. Paginação
 5. Mover as regras http para o controller 

🎯 **Pronto! Agora você pode gerenciar produtos de forma prática e eficiente!**  
🚀 **Contribua, sugira melhorias e ajude a evoluir o Product API!**
