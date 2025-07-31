module.exports = {
    extends: ['@commitlint/config-conventional'],
    // ignore commit messages that are just version numbers
    // e.g., "v1.0.0"
    ignores: [
        (message) => /^v\d+\.\d+\.\d+$/.test(message)
    ]
};