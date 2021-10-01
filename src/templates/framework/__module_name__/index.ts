// controllers
{{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleName) '.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Controller } from './controllers/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleName }}.controller';
{{/notInArray}}
{{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleNames) '.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller } from './controllers/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleNames }}.controller';
{{/notInArray}}
{{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-paginate-' (toKebabCase schema.moduleNames) '.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Controller } from './controllers/{{ toKebabCase schema.boundedContextName }}-paginate-{{ toKebabCase schema.moduleNames }}.controller';
{{/notInArray}}
{{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-get-' (toKebabCase schema.moduleNames) '.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Controller } from './controllers/{{ toKebabCase schema.boundedContextName }}-get-{{ toKebabCase schema.moduleNames }}.controller';
{{/notInArray}}
{{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '-by-id.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdController } from './controllers/{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}-by-id.controller';
{{/notInArray}}
{{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Controller } from './controllers/{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}.controller';
{{/notInArray}}
{{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleName) '.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Controller } from './controllers/{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleName }}.controller';
{{/notInArray}}
{{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdController } from './controllers/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id.controller';
{{/notInArray}}
{{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleNames) '.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Controller } from './controllers/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleNames }}.controller';
{{/notInArray}}

// resolvers
{{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleName) '.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Resolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleName }}.resolver';
{{/notInArray}}
{{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleNames) '.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleNames }}.resolver';
{{/notInArray}}
{{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-paginate-' (toKebabCase schema.moduleNames) '.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Resolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-paginate-{{ toKebabCase schema.moduleNames }}.resolver';
{{/notInArray}}
{{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-get-' (toKebabCase schema.moduleNames) '.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Resolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-get-{{ toKebabCase schema.moduleNames }}.resolver';
{{/notInArray}}
{{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '-by-id.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdResolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}-by-id.resolver';
{{/notInArray}}
{{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Resolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}.resolver';
{{/notInArray}}
{{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleName) '.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Resolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleName }}.resolver';
{{/notInArray}}
{{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdResolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id.resolver';
{{/notInArray}}
{{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleNames) '.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Resolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleNames }}.resolver';
{{/notInArray}}

export const {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Controllers = [
    {{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleName) '.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Controller,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleNames) '.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-paginate-' (toKebabCase schema.moduleNames) '.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Controller,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-get-' (toKebabCase schema.moduleNames) '.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Controller,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '-by-id.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdController,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Controller,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleName) '.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Controller,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdController,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleNames) '.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Controller,
    {{/notInArray}}
];

export const {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Resolvers = [
    {{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleName) '.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Resolver,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleNames) '.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-paginate-' (toKebabCase schema.moduleNames) '.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Resolver,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-get-' (toKebabCase schema.moduleNames) '.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Resolver,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '-by-id.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdResolver,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Resolver,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleName) '.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}Resolver,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdResolver,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/apps/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleNames) '.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Resolver,
    {{/notInArray}}
];