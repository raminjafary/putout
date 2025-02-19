'use strict';

const {types, operator} = require('putout');
const {__ignore} = operator;
const {StringLiteral} = types;
const getValue = ({value}) => value;

const names = [
    '.idea',
    '*.swp',
    'yarn-error.log',
    'coverage',
];

module.exports.report = () => `Dot files should be added to .gitignore`;

module.exports.match = ({options}) => {
    const {dismiss = []} = options;
    const newNames = filterNames(names, dismiss);
    
    return {
        [__ignore]: ({__array}) => {
            const list = __array.elements.map(getValue);
            
            for (const name of newNames) {
                if (!list.includes(name))
                    return true;
            }
            
            return false;
        },
    };
};

module.exports.replace = ({options}) => {
    const {dismiss = []} = options;
    const newNames = filterNames(names, dismiss);
    
    return {
        [__ignore]: ({__array}, path) => {
            const list = __array.elements.map(getValue);
            
            for (const name of newNames) {
                if (!list.includes(name))
                    __array.elements.push(StringLiteral(name));
            }
            
            return path;
        },
    };
};

function filterNames(names, dismiss) {
    const newNames = [];
    
    for (const name of names) {
        if (dismiss.includes(name))
            continue;
        
        newNames.push(name);
    }
    
    return newNames;
}
