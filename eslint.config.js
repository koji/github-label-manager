
import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginImport from 'eslint-plugin-import';
import eslintComments from 'eslint-plugin-eslint-comments';
import * as eslintImportResolverTypescript from 'eslint-import-resolver-typescript';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ["node_modules", "build", "coverage", "diff"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'eslint-comments': eslintComments,
      'import': eslintPluginImport,
    },
    rules: {
        ...eslintComments.configs.recommended.rules,
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
        'eslint-comments/no-unused-disable': 'error',
        'import/order': ['error', { 'newlines-between': 'always', 'alphabetize': { order: 'asc' } }],
        'sort-imports': ['error', { ignoreDeclarationSort: true, ignoreCase: true }],
    },
    settings: {
        'import/resolver': {
            typescript: eslintImportResolverTypescript,
        }
    },
    languageOptions: {
      globals: {
        ...globals.es2021,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  eslintConfigPrettier,
];
