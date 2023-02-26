export class VueErrorHandlerPlugin {

  middlewares = [];

  registerMiddleware({
    handler,
    sync = true,
    errorClass = null,
    index = -1,
  }) {
    if (typeof handler !== 'function') {
      throw new Error(`cannot register middleware. Handler must be callable.`);
    }

    const middlewareConfig = {handler, sync, errorClass};

    index === -1
    ? this.middlewares.push(middlewareConfig)
    : this.middlewares.splice(index, 0, middlewareConfig);

    return this;
  }

  removeMiddleware(handler) {
    const middlewareIndex = this.middlewares
        .findIndex(({handler: registeredHandler}) =>
            registeredHandler === handler,
        );

    if (middlewareIndex === -1) {
      throw new Error(`unable to remove middleware. not found.`);
    }

    this.middlewares.splice(middlewareIndex, 1);

    return this;
  }

  removeAllMiddlewares() {
    this.middlewares = [];

    return this;
  }

}
