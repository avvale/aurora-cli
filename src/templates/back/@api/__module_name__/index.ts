// controllers
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleName) '.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Controller } from './controllers/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleName }}.controller';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleNames) '.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller } from './controllers/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleNames }}.controller';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-paginate-' (toKebabCase schema.moduleNames) '.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Controller } from './controllers/{{ toKebabCase schema.boundedContextName }}-paginate-{{ toKebabCase schema.moduleNames }}.controller';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-get-' (toKebabCase schema.moduleNames) '.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Controller } from './controllers/{{ toKebabCase schema.boundedContextName }}-get-{{ toKebabCase schema.moduleNames }}.controller';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '-by-id.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdController } from './controllers/{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}-by-id.controller';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Controller } from './controllers/{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}.controller';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleName) '-by-id.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdController } from './controllers/{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleName }}-by-id.controller';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleNames) '.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Controller } from './controllers/{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleNames }}.controller';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-upsert-' (toKebabCase schema.moduleName) '.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Controller } from './controllers/{{ toKebabCase schema.boundedContextName }}-upsert-{{ toKebabCase schema.moduleName }}.controller';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdController } from './controllers/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id.controller';
{{/notInArray}}
{{#if schema.properties.hasI18n}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id-i18n.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdI18NController } from './controllers/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.controller';
{{/notInArray}}
{{/if}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleNames) '.controller.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Controller } from './controllers/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleNames }}.controller';
{{/notInArray}}
{{#unlessEq schema.additionalApis.length 0 }}

// additionalApis
{{#each schema.additionalApis}}
import { {{ getClassName }}Controller } from './controllers/{{ getApiFileName }}.controller';
{{/each}}
{{/unlessEq}}

// resolvers
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleName) '.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Resolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleName }}.resolver';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleNames) '.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleNames }}.resolver';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-paginate-' (toKebabCase schema.moduleNames) '.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Resolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-paginate-{{ toKebabCase schema.moduleNames }}.resolver';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-get-' (toKebabCase schema.moduleNames) '.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Resolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-get-{{ toKebabCase schema.moduleNames }}.resolver';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '-by-id.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdResolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}-by-id.resolver';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Resolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}.resolver';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleName) '-by-id.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdResolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleName }}-by-id.resolver';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleNames) '.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Resolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleNames }}.resolver';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-upsert-' (toKebabCase schema.moduleName) '.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Resolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-upsert-{{ toKebabCase schema.moduleName }}.resolver';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdResolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id.resolver';
{{/notInArray}}
{{#if schema.properties.hasI18n}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id-i18n.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdI18NResolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.resolver';
{{/notInArray}}
{{/if}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleNames) '.resolver.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Resolver } from './resolvers/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleNames }}.resolver';
{{/notInArray}}
{{#unlessEq schema.additionalApis.length 0 }}

// additionalApis
{{#each schema.additionalApis}}
import { {{ getClassName }}Resolver } from './resolvers/{{ getApiFileName }}.resolver';
{{/each}}
{{/unlessEq}}

// handlers
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleName) '.handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler } from './handlers/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleName }}.handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleNames) '.handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler } from './handlers/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleNames }}.handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-paginate-' (toKebabCase schema.moduleNames) '.handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Handler } from './handlers/{{ toKebabCase schema.boundedContextName }}-paginate-{{ toKebabCase schema.moduleNames }}.handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-get-' (toKebabCase schema.moduleNames) '.handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Handler } from './handlers/{{ toKebabCase schema.boundedContextName }}-get-{{ toKebabCase schema.moduleNames }}.handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '-by-id.handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdHandler } from './handlers/{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}-by-id.handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '.handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Handler } from './handlers/{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}.handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleName) '-by-id.handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdHandler } from './handlers/{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleName }}-by-id.handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleNames) '.handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Handler } from './handlers/{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleNames }}.handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-upsert-' (toKebabCase schema.moduleName) '.handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Handler } from './handlers/{{ toKebabCase schema.boundedContextName }}-upsert-{{ toKebabCase schema.moduleName }}.handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id.handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdHandler } from './handlers/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id.handler';
{{/notInArray}}
{{#if schema.properties.hasI18n}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id-i18n.handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdI18NHandler } from './handlers/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.handler';
{{/notInArray}}
{{/if}}
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleNames) '.handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Handler } from './handlers/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleNames }}.handler';
{{/notInArray}}

// seeder
{{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/seeder/' (toKebabCase schema.boundedContextName) '-' (toKebabCase schema.moduleName) '.seeder.ts'}}
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Seeder } from './seeder/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.seeder';
{{/notInArray}}
{{#unlessEq schema.additionalApis.length 0 }}

// additionalApis
{{#each schema.additionalApis}}
import { {{ getClassName }}Handler } from './handlers/{{ getApiFileName }}.handler';
{{/each}}
{{/unlessEq}}

export const {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Controllers = [
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleName) '.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Controller,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleNames) '.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-paginate-' (toKebabCase schema.moduleNames) '.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Controller,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-get-' (toKebabCase schema.moduleNames) '.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Controller,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '-by-id.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdController,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Controller,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleName) '-by-id.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdController,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleNames) '.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Controller,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-upsert-' (toKebabCase schema.moduleName) '.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Controller,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdController,
    {{/notInArray}}
    {{#if schema.properties.hasI18n}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id-i18n.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdI18NController,
    {{/notInArray}}
    {{/if}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/controllers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleNames) '.controller.ts'}}
    {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Controller,
    {{/notInArray}}
    {{#unlessEq schema.additionalApis.length 0 }}

    // additionalApis
    {{#each schema.additionalApis}}
    {{ getClassName }}Controller,
    {{/each}}
    {{/unlessEq}}
];

export const {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Resolvers = [
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleName) '.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Resolver,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleNames) '.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Resolver,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-paginate-' (toKebabCase schema.moduleNames) '.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Resolver,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-get-' (toKebabCase schema.moduleNames) '.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Resolver,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '-by-id.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdResolver,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Resolver,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleName) '-by-id.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdResolver,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleNames) '.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Resolver,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-upsert-' (toKebabCase schema.moduleName) '.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Resolver,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdResolver,
    {{/notInArray}}
    {{#if schema.properties.hasI18n}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id-i18n.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdI18NResolver,
    {{/notInArray}}
    {{/if}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/resolvers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleNames) '.resolver.ts'}}
    {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Resolver,
    {{/notInArray}}
    {{#unlessEq schema.additionalApis.length 0 }}

    // additionalApis
    {{#each schema.additionalApis}}
    {{ getClassName }}Resolver,
    {{/each}}
    {{/unlessEq}}
];

export const {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}ApiHandlers = [
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleName) '.handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleNames) '.handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-paginate-' (toKebabCase schema.moduleNames) '.handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Handler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-get-' (toKebabCase schema.moduleNames) '.handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Handler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '-by-id.handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '.handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Handler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleName) '-by-id.handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleNames) '.handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Handler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-upsert-' (toKebabCase schema.moduleName) '.handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Handler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id.handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdHandler,
    {{/notInArray}}
    {{#if schema.properties.hasI18n}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id-i18n.handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdI18NHandler,
    {{/notInArray}}
    {{/if}}
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/handlers/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleNames) '.handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Handler,
    {{/notInArray}}
    {{#unlessEq schema.additionalApis.length 0 }}

    // additionalApis
    {{#each schema.additionalApis}}
    {{ getClassName }}Handler,
    {{/each}}
    {{/unlessEq}}
];

export const {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Services = [
    {{#notInArray schema.excluded 'src/' config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/seeder/' (toKebabCase schema.boundedContextName) '-' (toKebabCase schema.moduleName) '.seeder.ts'}}
    {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Seeder,
    {{/notInArray}}
];