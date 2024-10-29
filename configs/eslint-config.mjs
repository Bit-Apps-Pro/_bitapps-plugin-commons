import { fixupPluginRules } from '@eslint/compat'
import { default as eslint } from '@eslint/js'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import { eslintRulesNoImportFromSubmodule } from 'bitapps-dev-utils'
import cypress from 'eslint-plugin-cypress'
import importPlugin from 'eslint-plugin-import'
import jsxA11Y from 'eslint-plugin-jsx-a11y'
// eslint-disable-next-line import/no-extraneous-dependencies
import perfectionist from 'eslint-plugin-perfectionist'
import prettier from 'eslint-plugin-prettier'
import promise from 'eslint-plugin-promise'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  perfectionist.configs['recommended-natural'],
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
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      custom: {
        rules: {
          'no-import-from-submodule': eslintRulesNoImportFromSubmodule
        }
      },
      cypress,
      import: fixupPluginRules(importPlugin),
      jsxA11Y,
      prettier,
      promise,
      react,
      'react-hooks': fixupPluginRules(reactHooks),
      'react-refresh': reactRefresh,
      stylisticTs,
      unicorn: eslintPluginUnicorn,
      'unused-imports': unusedImports
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...eslintPluginUnicorn.configs['flat/recommended'].rules,
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-use-before-define': ['error', { classes: false, functions: false }],
      '@typescript-eslint/semi': 'off',
      allowImplicit: 'off',
      'array-callback-return': 'off',
      'arrow-parens': 0,
      camelcase: ['error', { properties: 'never' }],
      'consistent-return': 'off',
      'custom/no-import-from-submodule': ['error', { forbiddenFolder: '_bitapps-plugin-commons' }],
      // "import/no-relative-parent-imports": "error",
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
      'import/extensions': 'off',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-empty-named-blocks': 'error',
      'import/no-extraneous-dependencies': 'error',
      'import/no-import-module-exports': 'error',
      'import/no-relative-packages': 'error',
      'import/no-self-import': 'error',
      'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
      indent: 'off',
      'linebreak-style': ['error', 'unix'],
      'max-len': ['error', { code: 350 }],
      'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      'no-param-reassign': [
        'error',
        { ignorePropertyModificationsForRegex: ['^draft', '^prev', '^prv', 'acc'], props: true }
      ],

      'object-curly-newline': [
        'error',
        {
          ExportDeclaration: { consistent: true },
          ImportDeclaration: { consistent: true },
          ObjectExpression: { consistent: true },
          ObjectPattern: { consistent: true }
        }
      ],

      'prettier/prettier': ['warn', {}],
      'react/destructuring-assignment': 0,
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'react/jsx-uses-react': 'off',
      'react/no-unescaped-entities': [
        'error',
        {
          forbid: [
            { alternatives: ['&gt;'], char: '>' },
            { alternatives: ['&lt;'], char: '<' }
          ]
        }
      ],
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': [0, { functions: 'ignore' }],
      'react-hooks/exhaustive-deps': 'warn',
      'template-curly-spacing': 'off',
      'unicorn/explicit-length-check': 'off',
      'unicorn/filename-case': [
        'error',
        { cases: { camelCase: true, kebabCase: true, pascalCase: true } }
      ],
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/prefer-switch': ['error', { minimumCases: 6 }],

      'unicorn/prevent-abbreviations': [
        'error',
        {
          replacements: {
            arg: false,
            args: false,
            arr: false,
            btn: false,
            db: false,
            doc: false,
            docs: false,
            e: false,
            elm: false,
            err: false,
            func: false,
            i: false,
            idx: false,
            msg: false,
            num: false,
            obj: false,
            param: false,
            params: false,
            prev: false,
            prop: false,
            props: false,
            prv: false,
            ref: false,
            req: false,
            res: false,
            str: false,
            tmp: false,
            val: false,
            var: false,
            vars: false
          }
        }
      ],

      'unused-imports/no-unused-imports': 'error',

      'unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_'
        }
      ]
    },
    settings: {
      'import/resolver': { typescript: true },
      react: { version: 'detect' }
    }
  }
)
