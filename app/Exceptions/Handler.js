'use strict';
const Config = use('Config');
const BaseExceptionHandler = use('BaseExceptionHandler');

class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { response }) {
    if (
      error.name === 'InvalidLoginException' ||
      error.name === 'InvalidSessionException'
    ) {
      return response.redirect(Config.get('adonis-auth-scaffold.loginRoute'));
    }
    if (
      error.name === 'HttpException' &&
      error.message.includes('E_GUEST_ONLY')
    ) {
      return response.redirect(
        Config.get('adonis-auth-scaffold.registrationSuccessRedirectTo')
      );
    }

    return super.handle(...arguments);
  }

  async report(error, { request }) {}
}

module.exports = ExceptionHandler;
