import pluginJs from '@eslint/js'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

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
            'simple-import-sort/imports': 'warn',
            'simple-import-sort/exports': 'warn',
        },
    },
]