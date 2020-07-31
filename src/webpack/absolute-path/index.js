const path = require('path');

module.exports = class AbsolutePathPlugin {
  constructor(options) {
    this.options = options;
    if (!options.dirname) {
      console.error('"dirname" is undefined');
    }
  }

  override(data) {
    return Object.assign({}, data, {
      request: path.join(this.options.dirname, data.request),
      dependencies: data.dependencies.map((d) => {
        return Object.assign({}, d, {
          request: path.join(this.options.dirname, d.request),
          userRequest: path.join(this.options.dirname, d.userRequest),
        });
      }),
    });
  }

  apply(compiler) {
    compiler.plugin('normal-module-factory', (moduleFactory) => {
      moduleFactory.plugin('before-resolve', (data, callback) => {
        if (
          data.request.indexOf('/node_modules/') === 0 ||
          data.request.indexOf('/src/') === 0 ||
          data.request.indexOf('/dist/') === 0
        ) {
          callback(null, this.override(data));
        } else {
          callback(null, data);
        }
      });
    });
  }
};