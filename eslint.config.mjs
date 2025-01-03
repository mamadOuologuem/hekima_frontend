import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import tailwind from 'eslint-plugin-tailwindcss';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const shadcnFiles = ['src/components/ui/*.tsx'];

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...tailwind.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    files: shadcnFiles,
    rules: {
      'tailwindcss/enforces-shorthand': 'off',
      '@typescript-eslint/no-empty-object-type': 'off'
    }
  },
  { rules: { quotes: ['error', 'single'], 'react/jsx-no-literals': 'error' } }
];

export default eslintConfig;
