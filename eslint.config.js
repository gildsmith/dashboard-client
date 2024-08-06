import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

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
        rules: {
            'quotes': ['warn', 'single'],
            'semi': ['warn', 'never']
        },
    },
]