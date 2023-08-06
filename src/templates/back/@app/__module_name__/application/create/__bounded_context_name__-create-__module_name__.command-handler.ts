/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Command } from './{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleName }}.command';
import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Service } from './{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleName }}.service';
import {
    {{> importValueObjects }}
} from '../../domain/value-objects';

@CommandHandler({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Command)
export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}CommandHandler implements ICommandHandler<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Command>
{
    constructor(
        private readonly create{{ toPascalCase schema.moduleName }}Service: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Service,
    ) {}

    async execute(command: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.create{{ toPascalCase schema.moduleName }}Service.main(
            {
                {{#each schema.properties.createCommandHandler}}
                {{#if (isAllowProperty ../schema.moduleName this) }}
                {{#if hasTimezone}}
                {{ toCamelCase name }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}, {}, { removeTimezone: command.cQMetadata.timezone }),
                {{else}}
                {{#unless (isI18nAvailableLangsProperty . ../schema.properties)}}
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
