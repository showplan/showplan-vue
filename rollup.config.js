/* eslint-disable global-require */
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import scss from 'rollup-plugin-scss';
import typescript from 'rollup-plugin-typescript2';

import tsconfig from './tsconfig.json';
import pkg from './package.json';

const globals = { vue: 'Vue' };

export default {
    input: ['src/index.ts'],
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            globals,
        },
        {
            file: pkg.module,
            format: 'es',
        },
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
        typescript({
            objectHashIgnoreUnknownHack: true,
            typescript: require('typescript'),
        }),
        vue({
            typescript: tsconfig,
            css: false,
        }),
        scss(),
        commonjs(),
    ],
};
