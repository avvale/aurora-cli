// export commands
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/create/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleName) '.command.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Command } from './application/create/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleName }}.command';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/create/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleNames) '.command.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Command } from './application/create/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleNames }}.command';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/update/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleName) '-by-id.command.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdCommand } from './application/update/{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleName }}-by-id.command';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/update/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleNames) '.command.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Command } from './application/update/{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleNames }}.command';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/upsert/' (toKebabCase schema.boundedContextName) '-upsert-' (toKebabCase schema.moduleName) '.command.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Command } from './application/upsert/{{ toKebabCase schema.boundedContextName }}-upsert-{{ toKebabCase schema.moduleName }}.command';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id.command.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdCommand } from './application/delete/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id.command';
{{/notInArray}}
{{#if schema.properties.hasI18n}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id-i18n.command.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdI18nCommand } from './application/delete/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.command';
{{/notInArray}}
{{/if}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleNames) '.command.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Command } from './application/delete/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleNames }}.command';
{{/notInArray}}

// export queries
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/paginate/' (toKebabCase schema.boundedContextName) '-paginate-' (toKebabCase schema.moduleNames) '.query.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Query } from './application/paginate/{{ toKebabCase schema.boundedContextName }}-paginate-{{ toKebabCase schema.moduleNames }}.query';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/get/' (toKebabCase schema.boundedContextName) '-get-' (toKebabCase schema.moduleNames) '.query.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Query } from './application/get/{{ toKebabCase schema.boundedContextName }}-get-{{ toKebabCase schema.moduleNames }}.query';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/find/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '.query.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Query } from './application/find/{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}.query';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/find/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '-by-id.query.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdQuery } from './application/find/{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}-by-id.query';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/raw-sql/' (toKebabCase schema.boundedContextName) '-raw-sql-' (toKebabCase schema.moduleNames) '.query.ts'}}
export { {{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}Query } from './application/raw-sql/{{ toKebabCase schema.boundedContextName }}-raw-sql-{{ toKebabCase schema.moduleNames }}.query';
{{/notInArray}}

// export mocks
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/infrastructure/mock/' (toKebabCase schema.boundedContextName) '-mock-' (toKebabCase schema.moduleName) '.data.ts'}}
export { {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data } from './infrastructure/mock/{{ toKebabCase schema.boundedContextName }}-mock-{{ toKebabCase schema.moduleName }}.data';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/infrastructure/mock/' (toKebabCase schema.boundedContextName) '-mock-' (toKebabCase schema.moduleName) '.seeder.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Seeder } from './infrastructure/mock/{{ toKebabCase schema.boundedContextName }}-mock-{{ toKebabCase schema.moduleName }}.seeder';
{{/notInArray}}

// export events
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-add-' (toKebabCase schema.moduleNames) '-context.event.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Add{{ toPascalCase schema.moduleNames }}ContextEvent } from './application/events/{{ toKebabCase schema.boundedContextName }}-add-{{ toKebabCase schema.moduleNames }}-context.event';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-created-' (toKebabCase schema.moduleNames) '.event.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleNames }}Event } from './application/events/{{ toKebabCase schema.boundedContextName }}-created-{{ toKebabCase schema.moduleNames }}.event';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-created-' (toKebabCase schema.moduleName) '.event.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}Event } from './application/events/{{ toKebabCase schema.boundedContextName }}-created-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-deleted-' (toKebabCase schema.moduleNames) '.event.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleNames }}Event } from './application/events/{{ toKebabCase schema.boundedContextName }}-deleted-{{ toKebabCase schema.moduleNames }}.event';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-deleted-' (toKebabCase schema.moduleName) '.event.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleName }}Event } from './application/events/{{ toKebabCase schema.boundedContextName }}-deleted-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-updated-' (toKebabCase schema.moduleNames) '.event.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleNames }}Event } from './application/events/{{ toKebabCase schema.boundedContextName }}-updated-{{ toKebabCase schema.moduleNames }}.event';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-updated-' (toKebabCase schema.moduleName) '.event.ts'}}
export { {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleName }}Event } from './application/events/{{ toKebabCase schema.boundedContextName }}-updated-{{ toKebabCase schema.moduleName }}.event';
{{/notInArray}}

// domain
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/domain' (toKebabCase schema.boundedContextName) '-' (toKebabCase schema.moduleName) '.aggregate.ts'}}
export { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }} } from './domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.aggregate';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/domain' (toKebabCase schema.boundedContextName) '-' (toKebabCase schema.moduleName) '.mapper.ts'}}
export { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper } from './domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.mapper';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/domain' (toKebabCase schema.boundedContextName) '-' (toKebabCase schema.moduleName) '.repository.ts'}}
export { {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository } from './domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.repository';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/domain' (toKebabCase schema.boundedContextName) '-' (toKebabCase schema.moduleName) '.response.ts'}}
export { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Response } from './domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.response';
{{/notInArray}}
{{#if schema.properties.hasI18n}}
export { {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}I18nRepository } from './domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}-i18n.repository';
{{/if}}

// infrastructure
export { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Model } from './infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.model';
{{#if schema.properties.hasI18n}}
export { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}I18nModel } from './infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}-i18n.model';
{{/if}}
{{#each schema.properties.withRelationshipManyToMany}}
{{#if (isPivotPath this ../schema.boundedContextName ../schema.moduleName)}}
export { {{ relationship.pivot.aggregate }}Model } from './infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.boundedContextName }}-{{ relationship.pivot.fileName }}.model';
{{/if}}
{{/each}}
export { {{ toPascalCase schema.boundedContextName }}Sequelize{{ toPascalCase schema.moduleName }}Repository } from './infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.repository';
{{#if schema.properties.hasI18n}}
export { {{ toPascalCase schema.boundedContextName }}Sequelize{{ toPascalCase schema.moduleName }}I18nRepository } from './infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}-i18n.repository';
{{/if}}

// sagas
export { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Sagas } from './application/sagas/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.sagas';

// command handlers
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/create/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleName) '.command-handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}CommandHandler } from './application/create/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleName }}.command-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/create/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleNames) '.command-handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}CommandHandler } from './application/create/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleNames }}.command-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/update/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleName) '-by-id.command-handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdCommandHandler } from './application/update/{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleName }}-by-id.command-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/update/'(toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleNames) '.command-handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}CommandHandler } from './application/update/{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleNames }}.command-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/upsert/' (toKebabCase schema.boundedContextName) '-upsert-' (toKebabCase schema.moduleName) '.command-handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}CommandHandler } from './application/upsert/{{ toKebabCase schema.boundedContextName }}-upsert-{{ toKebabCase schema.moduleName }}.command-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id.command-handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler } from './application/delete/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id.command-handler';
{{/notInArray}}
{{#if schema.properties.hasI18n}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id-i18n.command-handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdI18nCommandHandler } from './application/delete/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.command-handler';
{{/notInArray}}
{{/if}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleNames) '.command-handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}CommandHandler } from './application/delete/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleNames }}.command-handler';
{{/notInArray}}

// query handlers
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/paginate/' (toKebabCase schema.boundedContextName) '-paginate-' (toKebabCase schema.moduleNames) '.query-handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}QueryHandler } from './application/paginate/{{ toKebabCase schema.boundedContextName }}-paginate-{{ toKebabCase schema.moduleNames }}.query-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/get/' (toKebabCase schema.boundedContextName) '-get-' (toKebabCase schema.moduleNames) '.query-handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}QueryHandler } from './application/get/{{ toKebabCase schema.boundedContextName }}-get-{{ toKebabCase schema.moduleNames }}.query-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/find/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '.query-handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}QueryHandler } from './application/find/{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}.query-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/find/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '-by-id.query-handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdQueryHandler } from './application/find/{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}-by-id.query-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/raw-sql/' (toKebabCase schema.boundedContextName) '-raw-sql-' (toKebabCase schema.moduleNames) '.query-handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler } from './application/raw-sql/{{ toKebabCase schema.boundedContextName }}-raw-sql-{{ toKebabCase schema.moduleNames }}.query-handler';
{{/notInArray}}

// event handlers
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-created-' (toKebabCase schema.moduleName) '.event-handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}EventHandler } from './application/events/{{ toKebabCase schema.boundedContextName }}-created-{{ toKebabCase schema.moduleName }}.event-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-created-' (toKebabCase schema.moduleNames) '.event-handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleNames }}EventHandler } from './application/events/{{ toKebabCase schema.boundedContextName }}-created-{{ toKebabCase schema.moduleNames }}.event-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-updated-' (toKebabCase schema.moduleName) '.event-handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleName }}EventHandler } from './application/events/{{ toKebabCase schema.boundedContextName }}-updated-{{ toKebabCase schema.moduleName }}.event-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-updated-' (toKebabCase schema.moduleNames) '.event-handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleNames }}EventHandler } from './application/events/{{ toKebabCase schema.boundedContextName }}-updated-{{ toKebabCase schema.moduleNames }}.event-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-deleted-' (toKebabCase schema.moduleName) '.event-handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleName }}EventHandler } from './application/events/{{ toKebabCase schema.boundedContextName }}-deleted-{{ toKebabCase schema.moduleName }}.event-handler';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-deleted-' (toKebabCase schema.moduleNames) '.event-handler.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleNames }}EventHandler } from './application/events/{{ toKebabCase schema.boundedContextName }}-deleted-{{ toKebabCase schema.moduleNames }}.event-handler';
{{/notInArray}}

// services
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/create/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleName) '.service.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Service } from './application/create/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleName }}.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/create/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleNames) '.service.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Service } from './application/create/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleNames }}.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/paginate/' (toKebabCase schema.boundedContextName) '-paginate-' (toKebabCase schema.moduleNames) '.service.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Service } from './application/paginate/{{ toKebabCase schema.boundedContextName }}-paginate-{{ toKebabCase schema.moduleNames }}.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/get/' (toKebabCase schema.boundedContextName) '-get-' (toKebabCase schema.moduleNames) '.service.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Service } from './application/get/{{ toKebabCase schema.boundedContextName }}-get-{{ toKebabCase schema.moduleNames }}.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/find/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '.service.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Service } from './application/find/{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/find/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '-by-id.service.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdService } from './application/find/{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}-by-id.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/raw-sql/' (toKebabCase schema.boundedContextName) '-raw-sql-' (toKebabCase schema.moduleNames) '.service.ts'}}
import { {{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}Service } from './application/raw-sql/{{ toKebabCase schema.boundedContextName }}-raw-sql-{{ toKebabCase schema.moduleNames }}.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/update/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleName) '-by-id.service.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdService } from './application/update/{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleName }}-by-id.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/update/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleNames) '.service.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Service } from './application/update/{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleNames }}.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/upsert/' (toKebabCase schema.boundedContextName) '-upsert-' (toKebabCase schema.moduleName) '.service.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Service } from './application/upsert/{{ toKebabCase schema.boundedContextName }}-upsert-{{ toKebabCase schema.moduleName }}.service';
{{/notInArray}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id.service.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdService } from './application/delete/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id.service';
{{/notInArray}}
{{#if schema.properties.hasI18n}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id-i18n.service.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdI18nService } from './application/delete/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.service';
{{/notInArray}}
{{/if}}
{{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/' (toKebabCase schema.boundedContextName) '-delete/delete-' (toKebabCase schema.moduleNames) '.service.ts'}}
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Service } from './application/delete/{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleNames }}.service';
{{/notInArray}}

export const {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Handlers = [
    // commands
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/create/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleName) '.command-handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}CommandHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/create/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleNames) '.command-handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}CommandHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/update/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleName) '-by-id.command-handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdCommandHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/update/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleNames) '.command-handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}CommandHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/upsert/' (toKebabCase schema.boundedContextName) '-upsert-' (toKebabCase schema.moduleName) '.command-handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}CommandHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id.command-handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler,
    {{/notInArray}}
    {{#if schema.properties.hasI18n}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id-i18n.command-handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdI18nCommandHandler,
    {{/notInArray}}
    {{/if}} 
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleNames) '.command-handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}CommandHandler,
    {{/notInArray}}

    // queries
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/paginate/' (toKebabCase schema.boundedContextName) '-paginate-' (toKebabCase schema.moduleNames) '.query-handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}QueryHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/get/' (toKebabCase schema.boundedContextName) '-get-' (toKebabCase schema.moduleNames) '.query-handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}QueryHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/find/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '.query-handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}QueryHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/find/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '-by-id.query-handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdQueryHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/raw-sql/' (toKebabCase schema.boundedContextName) '-raw-sql-' (toKebabCase schema.moduleNames) '.query-handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler,
    {{/notInArray}}

    // events
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-created-' (toKebabCase schema.moduleName) '.event-handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}EventHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-created-' (toKebabCase schema.moduleNames) '.event-handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleNames }}EventHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-updated-' (toKebabCase schema.moduleName) '.event-handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleName }}EventHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-updated-' (toKebabCase schema.moduleNames) '.event-handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleNames }}EventHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-deleted-' (toKebabCase schema.moduleName) '.event-handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleName }}EventHandler,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/events/' (toKebabCase schema.boundedContextName) '-deleted-' (toKebabCase schema.moduleNames) '.event-handler.ts'}}
    {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleNames }}EventHandler,
    {{/notInArray}}
];

export const {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Services = [
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/create/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleName) '.service.ts'}}
    {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Service,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/create/' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleNames) '.service.ts'}}
    {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Service,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/paginate/' (toKebabCase schema.boundedContextName) '-paginate-' (toKebabCase schema.moduleNames) '.service.ts'}}
    {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Service,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/get/' (toKebabCase schema.boundedContextName) '-get-' (toKebabCase schema.moduleNames) '.service.ts'}}
    {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Service,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/find/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '.service.ts'}}
    {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Service,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/find/' (toKebabCase schema.boundedContextName) '-find-' (toKebabCase schema.moduleName) '-by-id.service.ts'}}
    {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdService,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/raw-sql/' (toKebabCase schema.boundedContextName) '-raw-sql-' (toKebabCase schema.moduleNames) '.service.ts'}}
    {{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}Service,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/update/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleName) '-by-id.service.ts'}}
    {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdService,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/update/' (toKebabCase schema.boundedContextName) '-update-' (toKebabCase schema.moduleNames) '.service.ts'}}
    {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Service,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/upsert/' (toKebabCase schema.boundedContextName) '-upsert-' (toKebabCase schema.moduleName) '.service.ts'}}
    {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Service,
    {{/notInArray}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id.service.ts'}}
    {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdService,
    {{/notInArray}}
    {{#if schema.properties.hasI18n}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleName) '-by-id-i18n.service.ts'}}
    {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdI18nService,
    {{/notInArray}}
    {{/if}}
    {{#notInArray schema.excluded 'src/' config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)  '/application/delete/' (toKebabCase schema.boundedContextName) '-delete-' (toKebabCase schema.moduleNames) '.service.ts'}}
    {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Service,
    {{/notInArray}}
];