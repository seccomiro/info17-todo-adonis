'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TarefaSchema extends Schema {
  up() {
    this.create('tarefas', table => {
      table.increments();
      table.string('titulo', 200).notNullable();
      table.text('descricao');
      table
        .boolean('concluida')
        .notNullable()
        .defaultTo(false);
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users'); // para uso futuro
      table.timestamps();
    });
  }

  down() {
    this.drop('tarefas');
  }
}

module.exports = TarefaSchema;
