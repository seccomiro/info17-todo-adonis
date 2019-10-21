'use strict';

const Tarefa = use('App/Models/Tarefa');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tarefas
 */
class TarefaController {
  /**
   * Show a list of all tarefas.
   * GET tarefas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const tarefas = (await Tarefa.query()
      .orderBy('concluida')
      .orderBy('updated_at', 'desc')
      .fetch()).rows;
    // select * from tarefas order by concluida, updated_at desc
    return view.render('tarefas.index', { tarefas });
  }

  /**
   * Render a form to be used for creating a new tarefa.
   * GET tarefas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    const tarefa = new Tarefa();
    return view.render('tarefas.create', { tarefa });
  }

  /**
   * Create/save a new tarefa.
   * POST tarefas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const tarefaData = request.only(['titulo', 'descricao']);
    const tarefa = await Tarefa.create(tarefaData);
    response.route('tarefas.show', { id: tarefa.id });
  }

  /**
   * Display a single tarefa.
   * GET tarefas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const tarefa = await Tarefa.find(params.id);
    return view.render('tarefas.show', { tarefa });
  }

  /**
   * Render a form to update an existing tarefa.
   * GET tarefas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    const tarefa = await Tarefa.find(params.id);
    return view.render('tarefas.edit', { tarefa });
  }

  /**
   * Update tarefa details.
   * PUT or PATCH tarefas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    let tarefa = await Tarefa.find(params.id);
    const tarefaData = request.only(['titulo', 'descricao']);
    tarefa.merge(tarefaData);
    const success = await tarefa.save();
    response.route('tarefas.show', { id: params.id });
  }

  /**
   * Delete a tarefa with id.
   * DELETE tarefas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    let tarefa = await Tarefa.find(params.id);
    const success = await tarefa.delete();
    response.route('tarefas.index');
  }

  async concluida({ params, request, response }) {
    let tarefa = await Tarefa.find(params.id);
    tarefa.concluida = !tarefa.concluida;
    await tarefa.save();
    response.route('tarefas.index');
  }
}

module.exports = TarefaController;
