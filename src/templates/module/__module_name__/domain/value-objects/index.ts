{{#each schema.properties.valueObjects}}
{{#if (allowProperty ../schema.moduleName this) }}
export { {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }} } from './{{ toKebabCase ../schema.moduleName }}{{#if isI18n }}-i18n{{/if}}-{{ toKebabCase name }}';
{{/if}}
{{/each}}