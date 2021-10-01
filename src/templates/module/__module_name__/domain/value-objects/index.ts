{{#each schema.properties.valueObjects}}
export { {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }} } from './{{ toKebabCase ../schema.moduleName }}-{{ toKebabCase name }}';
{{/each}}