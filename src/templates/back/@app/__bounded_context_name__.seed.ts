export const boundedContexts = [
    {
        id      : '{{ uuid }}',
        name    : '{{ toPascalCase schema.boundedContextName }}',
        root    : '{{ toKebabCase schema.boundedContextName }}',
        sort    : 0,
        isActive: true,
    },
];

export const permissions = [
    { id: '{{ uuid }}',  name: '{{ toCamelCase schema.boundedContextName }}.access', boundedContextId: '??', roleIds: []},
];
