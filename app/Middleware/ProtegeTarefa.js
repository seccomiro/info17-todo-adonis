'use strict';

class ProtegeTarefa {
  async handle(ctx, next) {
    const { params, auth } = ctx;
    const tarefa = await auth.user
      .tarefas()
      .where('id', params.id)
      .first();
    ctx.tarefa = tarefa;

    await next();
  }
}

module.exports = ProtegeTarefa;
