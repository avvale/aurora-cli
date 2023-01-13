{{#each schema.properties.valueObjects}}
{{#if (isAllowProperty ../schema.moduleName this) }}
export { {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }} } from './{{ toKebabCase ../schema.moduleName }}{{#if isI18n }}-i18n{{/if}}-{{ toKebabCase name }}';
{{/if}}
{{/each}}