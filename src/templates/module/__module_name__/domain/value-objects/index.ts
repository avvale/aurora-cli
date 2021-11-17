{{#each schema.properties.valueObjects}}
export { {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }} } from './{{ toKebabCase ../schema.moduleName }}-{{ toKebabCase name }}';
{{/each}}

{{#each schema.propertiesI18n.valueObjects}}
{{#if @first}}
// i18n
{{/if}}
export { {{ toPascalCase ../schema.moduleName }}I18N{{ toPascalCase name }} } from './{{ toKebabCase ../schema.moduleName }}-i18n-{{ toKebabCase name }}';
{{/each}}