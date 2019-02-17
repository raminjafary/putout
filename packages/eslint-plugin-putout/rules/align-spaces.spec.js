'use strict';

const rule = require('./align-spaces');
const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2019,
    },
});

ruleTester.run('align-spaces', rule, {
    valid: [
        ['function hello() {',
            '    const result = [];',
            '    ',
            '    return resutl;',
            '}'].join('\n'),
    ],
    invalid: [{
        code: [
            'function hello() {',
            '    const result = [];',
            '',
            '    return resutl;',
            '}',
        ].join('\n'),
        errors: [{
            message: 'Spaces should be aligned on empty lines',
            type: 'Program',
        }],
    }],
});

