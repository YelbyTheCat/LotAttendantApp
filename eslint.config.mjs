import react from 'eslint-plugin-react';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [...compat.extends('eslint:recommended', 'plugin:react/recommended'), {
  plugins: {
    react,
  },

  ignores: ['node_modules/', 'dist/', '*.config.js'],

  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.jest,
      _: true,
    },

    parser: babelParser,
    ecmaVersion: 'latest',
    sourceType: 'module',

    parserOptions: {
      requireConfigFile: false,

      babelOptions: {
        presets: ['@babel/preset-react'],
      },

      ecmaFeatures: {
        experimentalObjectRestSpread: true,
        jsx: true,
      },
    },
  },

  settings: {
    react: {
      version: '16.7.0',
    },
  },

  rules: {
    'arrow-parens': ['error', 'as-needed'],
    eqeqeq: 'error',

    indent: ['error', 2, {
      SwitchCase: 1,
    }],

    'linebreak-style': ['error', 'unix'],
    'prefer-arrow-callback': 'error',

    quotes: ['error', 'single', {
      avoidEscape: true,
    }],

    'react/jsx-tag-spacing': ['error', {
      afterOpening: 'never',
      beforeClosing: 'never',
      beforeSelfClosing: 'never',
    }],

    'react/no-unescaped-entities': ['error', {
      forbid: ['>', '"', '}'],
    }],

    semi: ['error', 'always'],
  },
}];
