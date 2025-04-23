import path from 'node:path';
import antfu from '@antfu/eslint-config';


export default antfu(
  {
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },

    typescript: {
      tsconfigPath: path.resolve('./tsconfig.json'),
      overridesTypeAware: {
        'ts/restrict-template-expressions': ['error', {
          allowAny: false,
          allowBoolean: false,
          allowNullish: false,
          allowNumber: true,
          allowRegExp: false,
          allowNever: false,
        }],
        'ts/no-misused-promises': ['error', { checksVoidReturn: false }],
        'ts/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      },
    },

    isInEditor: true,

    vue: true,

    formatters: {
      css: true,
    },

    ignores: [
      'public',
      '**/node_modules/**',
      '**/build/**',
      '**/out/**',
      '**/dist/**',
      '.netlify',
    ],

    rules: {
      'ts/no-non-null-assertion': 'error',
      'unused-imports/no-unused-imports': 'error',
      'import/newline-after-import': ['error', { count: 2 }],
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          internalPattern: ['^(~|@)/.*'],
          newlinesBetween: 'never',
          groups: [
            'custom',
            'style',
            'side-effect',
            'side-effect-style',
            ['builtin', 'builtin-type'],
            ['external', 'external-type'],
            ['internal', 'internal-type'],
            ['sibling', 'sibling-type'],
            ['parent', 'parent-type'],
            ['index', 'index-type'],
            'object',
            'unknown',
          ],
          customGroups: {
            value: {
              custom: ['react', 'react-dom', 'next', 'next/*'],
            },
            type: {
              custom: ['react', 'react-dom', 'next', 'next/*'],
            },
          },
        },
      ],
      'no-restricted-imports': ['error', { patterns: ['../'] }],
      'style/no-multiple-empty-lines': ['error', { max: 2 }],
      'style/quote-props': ['error', 'consistent'],
      'style/brace-style': ['off', '1tbs'],
      'style/object-curly-newline': ['error', { consistent: true, minProperties: 4 }],
      'antfu/if-newline': 'off',
      'no-shadow': 'error',
      'object-curly-newline': ['error', {
        minProperties: 6,
        multiline: false,
        consistent: true,
      }],
      'max-lines-per-function': ['error', 200],
      'max-statements': ['error', 50, { ignoreTopLevelFunctions: true }],
      'node/prefer-global/process': 'off',
    },
  },
);
