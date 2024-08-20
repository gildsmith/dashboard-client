import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

// noinspection JSUnusedGlobalSymbols
export default [
    pluginJs.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                axios: 'readonly',
            },
        },
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'quotes': ['warn', 'single'],
            'semi': ['warn', 'never'],
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
        },
    },
]