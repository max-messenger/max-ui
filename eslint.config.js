import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import storybookPlugin from 'eslint-plugin-storybook';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/', 'dist/', 'storybook-static/'],
  },

  js.configs.recommended,

  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      '@eslint-react': eslintReact,
      '@stylistic': stylistic,
      '@typescript-eslint': tsPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...eslintReact.configs['recommended-typescript'].rules,
      ...tsPlugin.configs.recommended.rules,

      '@eslint-react/no-missing-component-display-name': 'error',
      '@eslint-react/no-missing-key': 'error',
      '@eslint-react/jsx-no-comment-textnodes': 'error',
      '@eslint-react/dom-no-unsafe-target-blank': 'error',
      '@eslint-react/jsx-no-children-prop': 'error',
      '@eslint-react/dom-no-dangerously-set-innerhtml-with-children': 'error',
      '@eslint-react/no-direct-mutation-state': 'error',
      '@eslint-react/dom-no-find-dom-node': 'error',
      '@eslint-react/dom-no-render-return-value': 'error',
      '@eslint-react/dom-no-unknown-property': 'error',

      // TODO(ONEME-74088): In React 19, forwardRef is considered legacy, and ref can be passed as a regular prop.
      '@eslint-react/no-forward-ref': 'off',

      // TODO(ONEME-74088): Consider migrating to the React 19 Context API.
      '@eslint-react/no-context-provider': 'off',
      '@eslint-react/no-use-context': 'off',

      // TODO(ONEME-74088): Review existing hooks before enabling these rules.
      '@eslint-react/exhaustive-deps': 'off',
      '@eslint-react/purity': 'off',
      '@eslint-react/rules-of-hooks': 'off',
      '@eslint-react/set-state-in-effect': 'off',

      // Required for the asChild composition pattern.
      '@eslint-react/no-children-only': 'off',
      '@eslint-react/no-clone-element': 'off',

      // TODO(ONEME-74088): Fix existing JSX key violations before enabling these rules.
      '@eslint-react/no-array-index-key': 'off',

      // TODO(ONEME-74088): Rename utilities that are not hooks but use the "use" prefix.
      // Remove this TODO if the naming is considered architecturally valid.
      '@eslint-react/no-unnecessary-use-prefix': 'off',

      // Common
      semi: ['error', 'always'],
      '@typescript-eslint/semi': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      '@stylistic/jsx-wrap-multilines': ['error', {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      }],

      // Require that the first prop in a JSX element be on a new line when the element is multiline
      '@stylistic/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],

      // Prevent extra closing tags for components without children
      '@stylistic/jsx-self-closing-comp': 'error',

      // One JSX Element Per Line
      '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],

      // Validate closing tag location in JSX
      '@stylistic/jsx-closing-tag-location': 'error',

      // Limit maximum of props on a single line in JSX
      '@stylistic/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],

      // Enforce indentation
      '@stylistic/indent': ['error', 2],

      // Validate closing bracket location in JSX
      '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],

      // Validate whitespace in and around the JSX opening and closing brackets
      '@stylistic/jsx-tag-spacing': ['error', {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      }],
    },
    settings: {
      ...eslintReact.configs['recommended-typescript'].settings,
    },
  },

  {
    files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)', '**/*.story.@(ts|tsx|js|jsx|mjs|cjs)'],
    plugins: {
      storybook: storybookPlugin,
    },
    rules: {
      ...storybookPlugin.configs.recommended.rules,
    },
  },
];
