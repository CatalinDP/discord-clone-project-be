import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node, // Habilita variables globales de Node (como process, console, etc.)
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Configuramos Prettier dentro de ESLint para que sea más permisivo con tu entorno
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto', // 1. Ignora si el salto de línea es de Windows (CRLF) o Mac/Linux (LF)
          trailingComma: 'es5', // 2. Solo exige comas al final donde JavaScript viejo lo permita (evita líos en arrays/objetos)
          singleQuote: true, // 3. (Opcional) Te obliga a usar comillas simples, muy común en backend
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'off',
    },
  },
  prettierConfig,
);
