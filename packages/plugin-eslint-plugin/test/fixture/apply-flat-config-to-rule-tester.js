 const parserTester = new RuleTester({
    parser: require.resolve('@babel/eslint-parser/experimental-worker'),
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            plugins: ['@babel/plugin-syntax-typescript'],
        }
    }
 });

 const test = new RuleTester({
     languageOptions: {
        parser: require.resolve('@babel/eslint-parser/experimental-worker'),
        parserOptions: {
            requireConfigFile: false,
            babelOptions: {
                plugins: ['@babel/plugin-syntax-typescript'],
            }
        }
     }
 });