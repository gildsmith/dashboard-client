import pluginJs from '@eslint/js'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import parser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

// noinspection JSUnusedGlobalSymbols
export default [
    pluginJs.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    {
        files: ['*.ts', '*.vue'],
        parser,
        languageOptions: {
            globals: {
                ...globals.browser,
                axios: 'readonly',
            },
        },
        plugins: {
            'simple-import-sort': simpleImportSort,
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            'quotes': ['warn', 'single'],
            'semi': ['warn', 'never'],
            'simple-import-sort/imports': 'warn',
            'simple-import-sort/exports': 'warn',
        },
    },
]