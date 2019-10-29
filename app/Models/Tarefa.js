'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Tarefa extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }

  observacoes() {
    return this.hasMany('App/Models/Observacao');
  }
}

module.exports = Tarefa;
