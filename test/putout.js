'use strict';

const test = require('tape');

const putout = require('..');
const {readFixtures} = require('./fixture');

const fixture = readFixtures([
    'no-vars',
    'root-vars',
    'aligned',
    'not-aligned',
    'shebang',
]);

test('putout: no vars', (t) => {
    const result = putout(fixture.noVars);
    const expected = {
        code: '',
        unused: [],
    };
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: root vars', (t) => {
    const {code} = putout(fixture.rootVars);
    const expected = 'const str = \'hello\';\n';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: align', (t) => {
    const {code} = putout(fixture.notAligned);
    
    t.deepEqual(code, fixture.aligned, 'should equal');
    t.end();
});

test('putout: shebang', (t) => {
    const {code} = putout(fixture.shebang);
    const expected = '#!/usr/bin/env node\n\n\n\n'
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

