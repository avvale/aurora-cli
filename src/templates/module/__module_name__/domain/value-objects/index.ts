{{#each schema.properties.valueObjects}}
{{#unless isI18n}}
export { {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }} } from './{{ toKebabCase ../schema.moduleName }}-{{ toKebabCase name }}';
{{/unless}}
{{#and isI18n (allowI18nProperty2 ../schema.moduleName name)}}
export { {{ toPascalCase ../schema.moduleName }}I18N{{ toPascalCase name }} } from './{{ toKebabCase ../schema.moduleName }}-i18n-{{ toKebabCase name }}';
{{/and}}
{{/each}}