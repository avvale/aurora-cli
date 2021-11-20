{{#each schema.properties.valueObjects}}
{{#if isI18n}}
{{#allowI18nProperty ../schema.moduleName name}}
export { {{ toPascalCase ../schema.moduleName }}I18N{{ toPascalCase name }} } from './{{ toKebabCase ../schema.moduleName }}-i18n-{{ toKebabCase name }}';
{{/allowI18nProperty}}
{{else}}
export { {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }} } from './{{ toKebabCase ../schema.moduleName }}-{{ toKebabCase name }}';
{{/if}}
{{/each}}