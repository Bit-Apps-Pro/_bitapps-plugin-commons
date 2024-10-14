import { fixupPluginRules } from '@eslint/compat'
import { default as eslint } from '@eslint/js'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import cypress from 'eslint-plugin-cypress'
import _import from 'eslint-plugin-import'
import jsxA11Y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'
import promise from 'eslint-plugin-promise'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import { eslintRulesNoProModuleImport } from 'bitapps-dev-utils'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  jsxA11Y.flatConfigs.recommended,
  {
    ignores: [
      '**/vite.config.ts',
      '**/commitlint.config.js',
      '**/node_modules',
      '**/build',
      '**/coverage',
      '**/.eslintrc.js'
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: globals.browser
    },
    plugins: {
      react,
      'react-hooks': fixupPluginRules(reactHooks),
      jsxA11Y,
      import: fixupPluginRules(_import),
      cypress,
      prettier,
      promise,
      stylisticTs,
      'react-refresh': reactRefresh,
      unicorn: eslintPluginUnicorn,
      custom: {
        rules: { 'no-pro-module-import': eslintRulesNoProModuleImport }
      }
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': { typescript: true }
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...eslintPluginUnicorn.configs['flat/recommended'].rules,
      'custom/no-pro-module-import': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'unicorn/filename-case': [
        'error',
        { cases: { pascalCase: true, camelCase: true, kebabCase: true } }
      ],
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/explicit-length-check': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          replacements: {
            e: false,
            err: false,
            prv: false,
            prev: false,
            prop: false,
            props: false,
            param: false,
            params: false,
            num: false,
            msg: false,
            obj: false,
            res: false,
            val: false,
            req: false,
            arr: false,
            tmp: false,
            i: false,
            ref: false,
            arg: false,
            args: false,
            var: false,
            vars: false,
            func: false,
            btn: false,
            str: false,
            idx: false,
            elm: false,
            db: false,
            doc: false,
            docs: false
          }
        }
      ],
      'unicorn/prefer-switch': ['error', { minimumCases: 6 }],
      'unicorn/no-array-reduce': 'off',
      indent: 'off',
      allowImplicit: 'off',
      camelcase: ['error', { properties: 'never' }],

      'react/require-default-props': [0, { functions: 'ignore' }],

      'react/no-unescaped-entities': [
        'error',
        {
          forbid: [
            { char: '>', alternatives: ['&gt;'] },
            { char: '<', alternatives: ['&lt;'] }
          ]
        }
      ],

      'template-curly-spacing': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'react/destructuring-assignment': 0,
      'arrow-parens': 0,
      'react/prop-types': 0,
      'max-len': ['error', { code: 350 }],
      'linebreak-style': ['error', 'unix'],
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      'object-curly-newline': [
        'error',
        {
          ImportDeclaration: { consistent: true },
          ExportDeclaration: { consistent: true },
          ObjectPattern: { consistent: true },
          ObjectExpression: { consistent: true }
        }
      ],

      'array-callback-return': 'off',
      'consistent-return': 'off',

      'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'error',
      'import/no-duplicates': 'error',
      'import/no-self-import': 'error',
      'import/no-relative-packages': 'error',
      // "import/no-relative-parent-imports": "error",
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'import/no-empty-named-blocks': 'error',
      'import/no-import-module-exports': 'error',
      'import/newline-after-import': 'error',
      'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/semi': 'off',
      'prettier/prettier': ['warn', {}],

      '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false }],

      'react/no-unknown-property': ['error', { ignore: ['css'] }],

      'no-param-reassign': [
        'error',
        { props: true, ignorePropertyModificationsForRegex: ['^draft', '^prev', '^prv', 'acc'] }
      ]
    }
  }
)
