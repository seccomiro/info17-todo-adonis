'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ObservacaoSchema extends Schema {
  up() {
    this.create('observacoes', table => {
      table.increments();
      table.text('mensagem').notNullable();
      table
        .integer('tarefa_id')
        .unsigned()
        .references('id')
        .inTable('tarefas');
      table.timestamps();
    });
  }

  down() {
    this.drop('observacoes');
  }
}

module.exports = ObservacaoSchema;
