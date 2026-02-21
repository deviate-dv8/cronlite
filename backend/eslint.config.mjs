// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  // ------------------------
  // Main config
  // ------------------------
  tseslint.config(
    {
      ignores: ['eslint.config.mjs'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.jest,
        },
        sourceType: 'commonjs',
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
    {
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        // Addid this to allow unused variables that start with an underscore, which is a common convention to indicate that the variable is intentionally unused.
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        // Add this to disable unbound-method warnings in test files
        '@typescript-eslint/unbound-method': [
          'error',
          {
            ignoreStatic: true,
          },
        ],
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
      },
    },
  ),

  // ------------------------
  // Test files config
  // ------------------------
  {
    files: ['*.spec.ts', '*.test.ts'],
    rules: {
      // Disable unbound-method in test files because Jest mocks rely on unbound methods
      '@typescript-eslint/unbound-method': 'off',
    },
  },
];
