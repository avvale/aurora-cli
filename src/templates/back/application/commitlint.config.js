module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'header-max-length': [2, 'always', 120],
    },
    // ignore commit messages that are just version numbers
    // e.g., "v1.0.0"
    ignores: [
        (message) => /^v\d+\.\d+\.\d+$/.test(message)
    ]
};