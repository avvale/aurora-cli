export { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Dto } from './{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleName }}.dto';
export { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Dto } from './{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleNames }}.dto';
export { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdDto } from './{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleName }}-by-id.dto';
export { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto } from './{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.dto';