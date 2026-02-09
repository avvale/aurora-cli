module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'docs',
        'style',
        'test',
        'chore',
        'perf',
        'ci',
        'build',
        'revert',
      ],
    ],
    // Subject (disabled to allow uppercase in file names like CONTEXT.md)
    'subject-case': [0],
    'subject-empty': [2, 'never'],
    'subject-max-length': [2, 'always', 72],
    // Body
    'body-max-line-length': [2, 'always', 100],
    // Header
    'header-max-length': [2, 'always', 100],
  },
  // ignore commit messages that are just version numbers
  // e.g., "v1.0.0"
  ignores: [(message) => /^v\d+\.\d+\.\d+$/.test(message)],
};
