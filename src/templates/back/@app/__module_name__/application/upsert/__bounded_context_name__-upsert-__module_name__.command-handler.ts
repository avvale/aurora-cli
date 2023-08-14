/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Command } from './{{ toKebabCase schema.boundedContextName }}-upsert-{{ toKebabCase schema.moduleName }}.command';
import { {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Service } from './{{ toKebabCase schema.boundedContextName }}-upsert-{{ toKebabCase schema.moduleName }}.service';
import {
    {{> importValueObjects }}
} from '../../domain/value-objects';

@CommandHandler({{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Command)
export class {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}CommandHandler implements ICommandHandler<{{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Command>
{
    constructor(
        private readonly upsert{{ toPascalCase schema.moduleName }}Service: {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Service,
    ) {}

    async execute(command: {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsert{{ toPascalCase schema.moduleName }}Service.main(
            {
                {{#each schema.aggregateProperties.upsertCommandHandler}}
                {{#if (isAllowProperty ../schema.moduleName this) }}
                {{#if hasTimezone}}
                {{ toCamelCase name }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}, {}, { removeTimezone: command.cQMetadata.timezone }),
                {{else}}
                {{#unless (isI18nAvailableLangsProperty . ../schema.aggregateProperties)}}
                {{ toCamelCase name }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}),
                {{/unless}}
                {{/if}}
                {{/if}}
                {{/each}}
            },
            command.cQMetadata,
        );
    }
}
