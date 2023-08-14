/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Command } from './{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleNames }}.command';
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Service } from './{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleNames }}.service';
import {
    {{> importValueObjects }}
} from '../../domain/value-objects';

@CommandHandler({{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Command)
export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}CommandHandler implements ICommandHandler<{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Command>
{
    constructor(
        private readonly update{{ toPascalCase schema.moduleNames }}Service: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Service,
    ) {}

    async execute(command: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.update{{ toPascalCase schema.moduleNames }}Service.main(
            {
                {{#each schema.aggregateProperties.updateCommandHandler}}
                {{#if (isAllowProperty ../schema.moduleName this) }}
                {{#if hasTimezone}}
                {{ toCamelCase name }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}, { {{~#unless nullable}} undefinable: true {{/unless~}} }, { removeTimezone: command.cQMetadata.timezone }),
                {{else}}
                {{#unless (isI18nAvailableLangsProperty . ../schema.aggregateProperties)}}
                {{ toCamelCase name }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}{{#unless nullable}}, { undefinable: true }{{/unless}}),
                {{/unless}}
                {{/if}}
                {{/if}}
                {{/each}}
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
