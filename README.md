# IFList - AdonisJs

Aplicação de Lista de Tarefas feita com [AdonisJs](https://adonisjs.com).

Desenvolvida durante as aulas de Desenvolvimento Web (INFO-17).

## Recursos

- CRUD completo de Tarefas
- Tarefas concluída / não concluída
- Autenticação ([Persona](https://github.com/adonisjs/adonis-persona) e [adonis-auth-scaffold](https://github.com/creatrixity/adonis-auth-scaffold))
- Separação de tarefas por usuário
- Template e views utilizando Bootstrap
- Busca
- Middlewares customizados

## Configuração

```bash
npm i -g @adonisjs/cli # Instalar CLI do AdonisJs

git clone https://github.com/seccomiro/info17-todo-adonis
cd info17-todo-adonis
npm install
cp .env.example .env
adonis key:generate
adonis run:migrations

adonis serve --dev
```
