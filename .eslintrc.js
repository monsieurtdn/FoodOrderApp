module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-native/no-inline-styles': 0,
        'prettier/prettier': [
          'error',
          {endOfLine: 'auto', 'no-inline-styles': false},
        ],
        'react-hooks/exhaustive-deps': 'off',
      },
    },
  ],
};
