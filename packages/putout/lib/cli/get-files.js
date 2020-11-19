'use strict';

const {normalize} = require('path');
const {lstat} = require('fs').promises;

const fastGlob = require('fast-glob');
const tryToCatch = require('try-to-catch');

const {getSupportedGlob} = require('./supported-files');

const mergeArrays = (a) => [].concat(...a);
const rmDuplicates = (a) => Array.from(new Set(a));

module.exports = async (args, options) => {
    return await tryToCatch(getFiles, args, options);
};

async function getFiles(args, options) {
    const promises = args.map(addExt(options));
    const files = await Promise.all(promises);
    const mergedFiles = mergeArrays(files);
    
    return rmDuplicates(mergeArrays(mergedFiles))
        .map(normalize);
}

const globOptions = {
    unique: true,
    dot: true,
};

const addExt = (options) => async function addExt(a) {
    const [[e], files] = await Promise.all([
        tryToCatch(lstat, a),
        fastGlob(a, {
            onlyFiles: false,
            ...globOptions,
            ...options,
        }),
    ]);
    
    if (e && e.code === 'ENOENT' && !files.length)
        return throwNotFound(a);
    
    const jsFiles = [];
    const promises = [];
    for (const file of files) {
        const info = await lstat(file);
        
        if (info.isDirectory()) {
            promises.push(fastGlob(getSupportedGlob(file), {
                ...globOptions,
                ...options,
            }));
            continue;
        }
        
        jsFiles.push(file);
    }
    
    const promiseResults = !promises.length ? [] : await Promise.all(promises);
    
    const result = [
        ...jsFiles,
        ...mergeArrays(promiseResults),
    ];
    
    return result;
};

function throwNotFound(a) {
    throw Error(`No files matching the pattern "${a}" were found`);
}

