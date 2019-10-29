'use strict';

const Tarefa = use('App/Models/Tarefa');
const Validator = use('Validator');
const unicaNaoConcluida = async (data, field, message, args, get) => {
  const value = get(data, field);
  if (!value) {
    return;
  }
  const [userId, tarefaId] = args;
  // Retorna a contagem de tarefas não concluídas com mesmo título deste usuário
  const contagem = (await Tarefa.query()
    .where('user_id', userId)
    .whereNot('id', tarefaId)
    .where('concluida', false)
    .where('titulo', value)
    .count('* as contagem'))[0].contagem;
  if (contagem > 0) {
    throw message;
  }
};
Validator.extend('unicaNaoConcluida', unicaNaoConcluida);

class SalvarTarefa {
  get rules() {
    const { auth, params } = this.ctx;
    const { id } = params;
    return {
      titulo: `required|min:5|max:30|unicaNaoConcluida:${auth.user.id},${id}`,
      descricao: 'required'
    };
  }

  get messages() {
    return {
      'titulo.required': 'Por favor informe o título da tarefa',
      'titulo.min': 'O título deve ter pelo menos 5 caracteres',
      'titulo.max': 'O título deve ter no máximo menos 30 caracteres',
      'titulo.unicaNaoConcluida':
        'Você já tem uma tarefa pendente com este título',
      'descricao.required': 'Por favor informe uma descrição'
    };
  }

  get validateAll() {
    return true;
  }
}

module.exports = SalvarTarefa;
