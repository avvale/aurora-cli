// commands
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/create/create-' (toKebabCase schema.moduleName) '.command-handler.ts'}}
import { Create{{ toPascalCase schema.moduleName }}CommandHandler } from './application/create/create-{{ toKebabCase schema.moduleName }}.command-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/create/create-' (toKebabCase schema.moduleNames) '.command-handler.ts'}}
import { Create{{ toPascalCase schema.moduleNames }}CommandHandler } from './application/create/create-{{ toKebabCase schema.moduleNames }}.command-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/update/update-' (toKebabCase schema.moduleName) '-by-id.command-handler.ts'}}
import { Update{{ toPascalCase schema.moduleName }}ByIdCommandHandler } from './application/update/update-{{ toKebabCase schema.moduleName }}-by-id.command-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/update/update-' (toKebabCase schema.moduleNames) '.command-handler.ts'}}
import { Update{{ toPascalCase schema.moduleNames }}CommandHandler } from './application/update/update-{{ toKebabCase schema.moduleNames }}.command-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/upsert/upsert-' (toKebabCase schema.moduleName) '.command-handler.ts'}}
import { Upsert{{ toPascalCase schema.moduleName }}CommandHandler } from './application/upsert/upsert-{{ toKebabCase schema.moduleName }}.command-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/delete-' (toKebabCase schema.moduleName) '-by-id.command-handler.ts'}}
import { Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler } from './application/delete/delete-{{ toKebabCase schema.moduleName }}-by-id.command-handler';
{{/notInArray}}
{{#if schema.properties.hasI18n}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/delete-' (toKebabCase schema.moduleName) '-by-id-i18n.command-handler.ts'}}
import { Delete{{ toPascalCase schema.moduleName }}ByIdI18NCommandHandler } from './application/delete/delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.command-handler';
{{/notInArray}}
{{/if}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/delete-' (toKebabCase schema.moduleNames) '.command-handler.ts'}}
import { Delete{{ toPascalCase schema.moduleNames }}CommandHandler } from './application/delete/delete-{{ toKebabCase schema.moduleNames }}.command-handler';
{{/notInArray}}

// queries
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/paginate/paginate-' (toKebabCase schema.moduleNames) '.query-handler.ts'}}
import { Paginate{{ toPascalCase schema.moduleNames }}QueryHandler } from './application/paginate/paginate-{{ toKebabCase schema.moduleNames }}.query-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/get/get-' (toKebabCase schema.moduleNames) '.query-handler.ts'}}
import { Get{{ toPascalCase schema.moduleNames }}QueryHandler } from './application/get/get-{{ toKebabCase schema.moduleNames }}.query-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/find/find-' (toKebabCase schema.moduleName) '.query-handler.ts'}}
import { Find{{ toPascalCase schema.moduleName }}QueryHandler } from './application/find/find-{{ toKebabCase schema.moduleName }}.query-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/find/find-' (toKebabCase schema.moduleName) '-by-id.query-handler.ts'}}
import { Find{{ toPascalCase schema.moduleName }}ByIdQueryHandler } from './application/find/find-{{ toKebabCase schema.moduleName }}-by-id.query-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/raw-sql/raw-sql-' (toKebabCase schema.moduleNames) '.query-handler.ts'}}
import { RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler } from './application/raw-sql/raw-sql-{{ toKebabCase schema.moduleNames }}.query-handler';
{{/notInArray}}

// events
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/created-' (toKebabCase schema.moduleName) '.event-handler.ts'}}
import { Created{{ toPascalCase schema.moduleName }}EventHandler } from './application/events/created-{{ toKebabCase schema.moduleName }}.event-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/created-' (toKebabCase schema.moduleNames) '.event-handler.ts'}}
import { Created{{ toPascalCase schema.moduleNames }}EventHandler } from './application/events/created-{{ toKebabCase schema.moduleNames }}.event-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/updated-' (toKebabCase schema.moduleName) '.event-handler.ts'}}
import { Updated{{ toPascalCase schema.moduleName }}EventHandler } from './application/events/updated-{{ toKebabCase schema.moduleName }}.event-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/updated-' (toKebabCase schema.moduleNames) '.event-handler.ts'}}
import { Updated{{ toPascalCase schema.moduleNames }}EventHandler } from './application/events/updated-{{ toKebabCase schema.moduleNames }}.event-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/deleted-' (toKebabCase schema.moduleName) '.event-handler.ts'}}
import { Deleted{{ toPascalCase schema.moduleName }}EventHandler } from './application/events/deleted-{{ toKebabCase schema.moduleName }}.event-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/deleted-' (toKebabCase schema.moduleNames) '.event-handler.ts'}}
import { Deleted{{ toPascalCase schema.moduleNames }}EventHandler } from './application/events/deleted-{{ toKebabCase schema.moduleNames }}.event-handler';
{{/notInArray}}

// services
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/create/create-' (toKebabCase schema.moduleName) '.service.ts'}}
import { Create{{ toPascalCase schema.moduleName }}Service } from './application/create/create-{{ toKebabCase schema.moduleName }}.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/create/create-' (toKebabCase schema.moduleNames) '.service.ts'}}
import { Create{{ toPascalCase schema.moduleNames }}Service } from './application/create/create-{{ toKebabCase schema.moduleNames }}.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/paginate/paginate-' (toKebabCase schema.moduleNames) '.service.ts'}}
import { Paginate{{ toPascalCase schema.moduleNames }}Service } from './application/paginate/paginate-{{ toKebabCase schema.moduleNames }}.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/get/get-' (toKebabCase schema.moduleNames) '.service.ts'}}
import { Get{{ toPascalCase schema.moduleNames }}Service } from './application/get/get-{{ toKebabCase schema.moduleNames }}.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/find/find-' (toKebabCase schema.moduleName) '.service.ts'}}
import { Find{{ toPascalCase schema.moduleName }}Service } from './application/find/find-{{ toKebabCase schema.moduleName }}.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/find/find-' (toKebabCase schema.moduleName) '-by-id.service.ts'}}
import { Find{{ toPascalCase schema.moduleName }}ByIdService } from './application/find/find-{{ toKebabCase schema.moduleName }}-by-id.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/raw-sql/raw-sql-' (toKebabCase schema.moduleNames) '.service.ts'}}
import { RawSQL{{ toPascalCase schema.moduleNames }}Service } from './application/raw-sql/raw-sql-{{ toKebabCase schema.moduleNames }}.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/update/update-' (toKebabCase schema.moduleName) '-by-id.service.ts'}}
import { Update{{ toPascalCase schema.moduleName }}ByIdService } from './application/update/update-{{ toKebabCase schema.moduleName }}-by-id.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/update/update-' (toKebabCase schema.moduleNames) '.service.ts'}}
import { Update{{ toPascalCase schema.moduleNames }}Service } from './application/update/update-{{ toKebabCase schema.moduleNames }}.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/upsert/upsert-' (toKebabCase schema.moduleName) '.service.ts'}}
import { Upsert{{ toPascalCase schema.moduleName }}Service } from './application/upsert/upsert-{{ toKebabCase schema.moduleName }}.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/delete-' (toKebabCase schema.moduleName) '-by-id.service.ts'}}
import { Delete{{ toPascalCase schema.moduleName }}ByIdService } from './application/delete/delete-{{ toKebabCase schema.moduleName }}-by-id.service';
{{/notInArray}}
{{#if schema.properties.hasI18n}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/delete-' (toKebabCase schema.moduleName) '-by-id-i18n.service.ts'}}
import { Delete{{ toPascalCase schema.moduleName }}ByIdI18NService } from './application/delete/delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.service';
{{/notInArray}}
{{/if}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/delete-' (toKebabCase schema.moduleNames) '.service.ts'}}
import { Delete{{ toPascalCase schema.moduleNames }}Service } from './application/delete/delete-{{ toKebabCase schema.moduleNames }}.service';
{{/notInArray}}

// models
export { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Model } from './infrastructure/sequelize/sequelize-{{ toKebabCase schema.moduleName }}.model';
{{#if schema.properties.hasI18n}}
export { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}I18NModel } from './infrastructure/sequelize/sequelize-{{ toKebabCase schema.moduleName }}-i18n.model';
{{/if}}
{{#each schema.properties.withRelationshipManyToMany}}
{{#if (isPivotPath this ../schema.boundedContextName ../schema.moduleName)}}
export { {{ relationship.pivot.aggregate }}Model } from './infrastructure/sequelize/sequelize-{{ relationship.pivot.fileName }}.model';
{{/if}}
{{/each}}

// repository
export { I{{ toPascalCase schema.moduleName }}Repository } from './domain/{{ toKebabCase schema.moduleName }}.repository';
export { Sequelize{{ toPascalCase schema.moduleName }}Repository } from './infrastructure/sequelize/sequelize-{{ toKebabCase schema.moduleName }}.repository';
{{#if schema.properties.hasI18n}}
export { I{{ toPascalCase schema.moduleName }}I18NRepository } from './domain/{{ toKebabCase schema.moduleName }}-i18n.repository';
export { Sequelize{{ toPascalCase schema.moduleName }}I18NRepository } from './infrastructure/sequelize/sequelize-{{ toKebabCase schema.moduleName }}-i18n.repository';
{{/if}}

// sagas
export { {{ toPascalCase schema.moduleName }}Sagas } from './application/sagas/{{ toKebabCase schema.moduleName }}.sagas';

export const {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Handlers = [
    // commands
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/create/create-' (toKebabCase schema.moduleName) '.command-handler.ts'}}
    Create{{ toPascalCase schema.moduleName }}CommandHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/create/create-' (toKebabCase schema.moduleNames) '.command-handler.ts'}}
    Create{{ toPascalCase schema.moduleNames }}CommandHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/update/update-' (toKebabCase schema.moduleName) '-by-id.command-handler.ts'}}
    Update{{ toPascalCase schema.moduleName }}ByIdCommandHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/update/update-' (toKebabCase schema.moduleNames) '.command-handler.ts'}}
    Update{{ toPascalCase schema.moduleNames }}CommandHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/upsert/upsert-' (toKebabCase schema.moduleName) '.command-handler.ts'}}
    Upsert{{ toPascalCase schema.moduleName }}CommandHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/delete-' (toKebabCase schema.moduleName) '-by-id.command-handler.ts'}}
    Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler,
    {{/notInArray}}
    {{#if schema.properties.hasI18n}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/delete-' (toKebabCase schema.moduleName) '-by-id-i18n.command-handler.ts'}}
    Delete{{ toPascalCase schema.moduleName }}ByIdI18NCommandHandler,
    {{/notInArray}}
    {{/if}} 
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/delete-' (toKebabCase schema.moduleNames) '.command-handler.ts'}}
    Delete{{ toPascalCase schema.moduleNames }}CommandHandler,
    {{/notInArray}}

    // queries
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/paginate/paginate-' (toKebabCase schema.moduleNames) '.query-handler.ts'}}
    Paginate{{ toPascalCase schema.moduleNames }}QueryHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/get/get-' (toKebabCase schema.moduleNames) '.query-handler.ts'}}
    Get{{ toPascalCase schema.moduleNames }}QueryHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/find/find-' (toKebabCase schema.moduleName) '.query-handler.ts'}}
    Find{{ toPascalCase schema.moduleName }}QueryHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/find/find-' (toKebabCase schema.moduleName) '-by-id.query-handler.ts'}}
    Find{{ toPascalCase schema.moduleName }}ByIdQueryHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/raw-sql/raw-sql-' (toKebabCase schema.moduleNames) '.query-handler.ts'}}
    RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler,
    {{/notInArray}}

    // events
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/created-' (toKebabCase schema.moduleName) '.event-handler.ts'}}
    Created{{ toPascalCase schema.moduleName }}EventHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/created-' (toKebabCase schema.moduleNames) '.event-handler.ts'}}
    Created{{ toPascalCase schema.moduleNames }}EventHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/updated-' (toKebabCase schema.moduleName) '.event-handler.ts'}}
    Updated{{ toPascalCase schema.moduleName }}EventHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/updated-' (toKebabCase schema.moduleNames) '.event-handler.ts'}}
    Updated{{ toPascalCase schema.moduleNames }}EventHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/deleted-' (toKebabCase schema.moduleName) '.event-handler.ts'}}
    Deleted{{ toPascalCase schema.moduleName }}EventHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/deleted-' (toKebabCase schema.moduleNames) '.event-handler.ts'}}
    Deleted{{ toPascalCase schema.moduleNames }}EventHandler,
    {{/notInArray}}
];

export const {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Services = [
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/create/create-' (toKebabCase schema.moduleName) '.service.ts'}}
    Create{{ toPascalCase schema.moduleName }}Service,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/create/create-' (toKebabCase schema.moduleNames) '.service.ts'}}
    Create{{ toPascalCase schema.moduleNames }}Service,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/paginate/paginate-' (toKebabCase schema.moduleNames) '.service.ts'}}
    Paginate{{ toPascalCase schema.moduleNames }}Service,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/get/get-' (toKebabCase schema.moduleNames) '.service.ts'}}
    Get{{ toPascalCase schema.moduleNames }}Service,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/find/find-' (toKebabCase schema.moduleName) '.service.ts'}}
    Find{{ toPascalCase schema.moduleName }}Service,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/find/find-' (toKebabCase schema.moduleName) '-by-id.service.ts'}}
    Find{{ toPascalCase schema.moduleName }}ByIdService,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/raw-sql/raw-sql-' (toKebabCase schema.moduleNames) '.service.ts'}}
    RawSQL{{ toPascalCase schema.moduleNames }}Service,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/update/update-' (toKebabCase schema.moduleName) '-by-id.service.ts'}}
    Update{{ toPascalCase schema.moduleName }}ByIdService,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/update/update-' (toKebabCase schema.moduleNames) '.service.ts'}}
    Update{{ toPascalCase schema.moduleNames }}Service,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/upsert/upsert-' (toKebabCase schema.moduleName) '.service.ts'}}
    Upsert{{ toPascalCase schema.moduleName }}Service,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/delete-' (toKebabCase schema.moduleName) '-by-id.service.ts'}}
    Delete{{ toPascalCase schema.moduleName }}ByIdService,
    {{/notInArray}}
    {{#if schema.properties.hasI18n}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/delete-' (toKebabCase schema.moduleName) '-by-id-i18n.service.ts'}}
    Delete{{ toPascalCase schema.moduleName }}ByIdI18NService,
    {{/notInArray}}
    {{/if}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/delete-' (toKebabCase schema.moduleNames) '.service.ts'}}
    Delete{{ toPascalCase schema.moduleNames }}Service,
    {{/notInArray}}
];