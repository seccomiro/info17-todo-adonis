'use strict';

require('./authRoutes.js');

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.any('/', ({ response }) => response.redirect('/tarefas'));

Route.resource('tarefas', 'TarefaController')
  .middleware('auth')
  .middleware(
    new Map([[['show', 'edit', 'update', 'destroy'], ['protegeTarefa']]])
  )
  .validator(new Map([[['store', 'update'], ['SalvarTarefa']]]));

Route.get('/tarefas/:id/concluida', 'TarefaController.concluida')
  .as('tarefas.concluida')
  .middleware(['auth', 'protegeTarefa']);
Route.post('/tarefas/:id/observacao', 'TarefaController.observacao')
  .as('tarefas.observacao')
  .middleware(['auth', 'protegeTarefa']);
