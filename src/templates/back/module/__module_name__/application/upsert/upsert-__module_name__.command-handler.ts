/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Upsert{{ toPascalCase schema.moduleName }}Command } from './upsert-{{ toKebabCase schema.moduleName }}.command';
import { Upsert{{ toPascalCase schema.moduleName }}Service } from './upsert-{{ toKebabCase schema.moduleName }}.service';
import {
    {{> importValueObjects }}
} from '../../domain/value-objects';

@CommandHandler(Upsert{{ toPascalCase schema.moduleName }}Command)
export class Upsert{{ toPascalCase schema.moduleName }}CommandHandler implements ICommandHandler<Upsert{{ toPascalCase schema.moduleName }}Command>
{
    constructor(
        private readonly upsert{{ toPascalCase schema.moduleName }}Service: Upsert{{ toPascalCase schema.moduleName }}Service,
    ) {}

    async execute(command: Upsert{{ toPascalCase schema.moduleName }}Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsert{{ toPascalCase schema.moduleName }}Service.main(
            {
                {{#each schema.properties.upsertCommandHandler}}
                {{#if (allowProperty ../schema.moduleName this) }}
                {{#if hasTimezone}}
                {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}, {}, { removeTimezone: command.cQMetadata.timezone }),
                {{else}}
                {{#unless (isI18NDataLangProperty . ../schema.properties)}}
                {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}),
                {{/unless}}
                {{/if}}
                {{/if}}
                {{/each}}
            },
            command.cQMetadata,
        );
    }
}