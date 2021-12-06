/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Update{{ toPascalCase schema.moduleName }}Command } from './update-{{ toKebabCase schema.moduleName }}.command';
import { Update{{ toPascalCase schema.moduleName }}Service } from './update-{{ toKebabCase schema.moduleName }}.service';
import {
    {{> importValueObjects }}
} from './../../domain/value-objects';

@CommandHandler(Update{{ toPascalCase schema.moduleName }}Command)
export class Update{{ toPascalCase schema.moduleName }}CommandHandler implements ICommandHandler<Update{{ toPascalCase schema.moduleName }}Command>
{
    constructor(
        private readonly update{{ toPascalCase schema.moduleName }}Service: Update{{ toPascalCase schema.moduleName }}Service,
    ) {}

    async execute(command: Update{{ toPascalCase schema.moduleName }}Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.update{{ toPascalCase schema.moduleName }}Service.main(
            {
                {{#each schema.properties.updateCommandHandler}}
                {{#if (allowProperty ../schema.moduleName this) }}
                {{#if hasTimezone}}
                {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}, { {{~#unless nullable}}{{#unlessEq name 'id'}} undefinable: true {{/unlessEq}}{{/unless~}} }, { removeTimezone: command.cQMetadata.timezone }),
                {{else}}
                {{#unless (isI18NDataLangProperty . ../schema.properties)}}
                {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}{{#unless nullable}}{{#unlessEq name 'id'}}, { undefinable: true }{{/unlessEq}}{{/unless}}),
                {{/unless}}
                {{/if}}
                {{/if}}
                {{/each}}
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}