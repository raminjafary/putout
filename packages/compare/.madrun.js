'use strict';

const {run} = require('madrun');

module.exports = {
    'test': () => `tape test/*.js 'lib/**/*.spec.js'`,
    'watch:test': () => `nodemon -w lib -w test -x ${run('test')}`,
    'lint': () => `putout lib test .*.js *.md`,
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': () => `nyc ${run('test')}`,
    'report': () => `nyc report --reporter=text-lcov | coveralls || true`,
};

