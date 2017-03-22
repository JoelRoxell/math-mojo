// @flow
const util = require('util');
const fs = require('fs');
const debug = require('debug')('css-modules-flow-type-generator');

module.exports = function(sourceCode: string): string {
  const cssTokens: string = sourceCode.replace(/\s/g, '').match('exports.locals=(.*);');
  const template: string = `// @flow\nexport default ${util.inspect(JSON.parse(cssTokens[1]))};`;

  fs.writeFile(`${this.resourcePath}.flow`, template, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    debug(`wrote: ${this.resourcePath}.flow`);
  });

  return sourceCode;
};
