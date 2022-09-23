/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Upsert{{ toPascalCase schema.moduleNames }}Command } from './upsert-{{ toKebabCase schema.moduleNames }}.command';
import { Upsert{{ toPascalCase schema.moduleNames }}Service } from './upsert-{{ toKebabCase schema.moduleNames }}.service';
import {
    {{> importValueObjects }}
} from '../../domain/value-objects';

@CommandHandler(Upsert{{ toPascalCase schema.moduleNames }}Command)
export class Upsert{{ toPascalCase schema.moduleNames }}CommandHandler implements ICommandHandler<Upsert{{ toPascalCase schema.moduleNames }}Command>
{
    constructor(
        private readonly upsert{{ toPascalCase schema.moduleNames }}Service: Upsert{{ toPascalCase schema.moduleNames }}Service,
    ) {}

    async execute(command: Upsert{{ toPascalCase schema.moduleNames }}Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsert{{ toPascalCase schema.moduleNames }}Service.main(
            command.payload
                .map({{ toCamelCase schema.moduleName }} =>
                {
                    return {
                        {{#each schema.properties.upsertCommandHandler}}
                        {{#if (allowProperty ../schema.moduleName this) }}
                        {{#if hasTimezone}}
                        {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}, {}, { removeTimezone: command.cQMetadata.timezone }),
                        {{else}}
                        {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}),
                        {{/if}}
                        {{/if}}
                        {{/each}}
                    };
                }),
            command.cQMetadata,
        );
    }
}