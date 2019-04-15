/* eslint-disable func-names */
/* eslint-disable global-require */
module.exports = function (wallaby) {
    return {
        files: [
            'src/**/*.ts',
            'tests/**/*.helper.ts',
            'src/**/*.vue',
            { pattern: 'tests/**/*.sqlplan', instrument: false },
            'package.json',
            'tsconfig.json',
            'tsconfig.jest.json',
            { pattern: 'jest.config.js', instrument: false },
            { pattern: '.babelrc', instrument: false },
        ],

        tests: ['tests/**/*.spec.ts'],

        compilers: {
            '**/*.ts?(x)': wallaby.compilers.typeScript(require('./tsconfig.jest.json').compilerOptions),
            '**/*.js': wallaby.compilers.babel(),
        },
        env: {
            type: 'node',
            runner: 'node',
        },

        testFramework: 'jest',
        debug: false,

        setup(w) {
            // prevent ts-jest from double compiling the typescript and javascript
            const jestConfig = require('./package').jest || require('./jest.config');
            delete jestConfig.transform['^.+\\.tsx?$'];
            delete jestConfig.transform['^.+\\.js$'];
            w.testFramework.configure(jestConfig);
        },
    };
};
