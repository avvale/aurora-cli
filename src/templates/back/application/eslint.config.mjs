// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import stylisticTs from '@stylistic/eslint-plugin-ts'

export default tseslint.config(
    {
        ignores: ['eslint.config.mjs'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        plugins: {
            '@stylistic/ts': stylisticTs
        },
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            ecmaVersion: 5,
            sourceType: 'module',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        rules: {
            '@typescript-eslint/explicit-member-accessibility': [
                'off',
                {
                    accessibility: 'explicit',
                },
            ],
            '@typescript-eslint/explicit-function-return-type': ['error', {
                allowExpressions: true,
            }],
            '@stylistic/ts/member-delimiter-style': ['error', {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true,
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: true,
                },
            }],
            '@typescript-eslint/no-inferrable-types': 'off',
            '@typescript-eslint/no-misused-promises': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            "@typescript-eslint/no-unsafe-return": "off",
            '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: false }],
            'array-bracket-spacing': ['error', 'never'],
            'arrow-parens': ['error', 'as-needed'],
            'brace-style': ['error', 'allman', { allowSingleLine: true }],
            camelcase: 'error',
            'comma-dangle': ['error', {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'always-multiline',
            }],
            curly: 'off',
            'grouped-accessor-pairs': ['error', 'setBeforeGet'],
            'import/order': 'off',
            'import/prefer-default-export': 'off',
            indent: ['error', 4, { SwitchCase: 1 }],
            'key-spacing': ['error', {
                singleLine: {
                    beforeColon: false,
                    afterColon: true,
                },
                multiLine: {
                    beforeColon: false,
                    afterColon: true,
                },
                align: {
                    beforeColon: false,
                    afterColon: true,
                    on: 'colon',
                },
            }],
            'max-len': [
                'error',
                {
                    ignorePattern: '^import |^export | implements',
                    code: 180,
                },
            ],
            'no-await-in-loop': 'error',
            'no-case-declarations': 'off',
            'no-duplicate-case': 'error',
            'no-irregular-whitespace': ['error', { skipRegExps: true }],
            'no-trailing-spaces': 'error',
            'no-underscore-dangle': 'off',
            'no-var': 'error',
            'object-curly-spacing': ['error', 'always', { objectsInObjects: false, arraysInObjects: false }],
            'object-shorthand': ['error', 'always', { avoidQuotes: true }],
            'prefer-const': 'error',
            'quote-props': ['error', 'as-needed'],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
        },
    },
);