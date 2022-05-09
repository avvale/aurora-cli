/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Update{{ toPascalCase schema.moduleNames }}Command } from './update-{{ toKebabCase schema.moduleNames }}.command';
import { Update{{ toPascalCase schema.moduleNames }}Service } from './update-{{ toKebabCase schema.moduleNames }}.service';
import {
    {{> importValueObjects }}
} from '../../domain/value-objects';

@CommandHandler(Update{{ toPascalCase schema.moduleNames }}Command)
export class Update{{ toPascalCase schema.moduleNames }}CommandHandler implements ICommandHandler<Update{{ toPascalCase schema.moduleNames }}Command>
{
    constructor(
        private readonly update{{ toPascalCase schema.moduleNames }}Service: Update{{ toPascalCase schema.moduleNames }}Service,
    ) {}

    async execute(command: Update{{ toPascalCase schema.moduleNames }}Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.update{{ toPascalCase schema.moduleNames }}Service.main(
            {
                {{#each schema.properties.updateCommandHandler}}
                {{#if (allowProperty ../schema.moduleName this) }}
                {{#if hasTimezone}}
                {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}, { {{~#unless nullable}} undefinable: true {{/unless~}} }, { removeTimezone: command.cQMetadata.timezone }),
                {{else}}
                {{#unless (isI18NDataLangProperty . ../schema.properties)}}
                {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}{{#unless nullable}}, { undefinable: true }{{/unless}}),
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