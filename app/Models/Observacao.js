'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Observacao extends Model {
  static get table() {
    return 'observacoes';
  }

  tarefa() {
    return this.belongsTo('App/Models/Tarefa');
  }
}

module.exports = Observacao;
