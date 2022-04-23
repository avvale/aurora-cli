/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Create{{ toPascalCase schema.moduleName }}Command } from './create-{{ toKebabCase schema.moduleName }}.command';
import { Create{{ toPascalCase schema.moduleName }}Service } from './create-{{ toKebabCase schema.moduleName }}.service';
import {
    {{> importValueObjects }}
} from '../../domain/value-objects';

@CommandHandler(Create{{ toPascalCase schema.moduleName }}Command)
export class Create{{ toPascalCase schema.moduleName }}CommandHandler implements ICommandHandler<Create{{ toPascalCase schema.moduleName }}Command>
{
    constructor(
        private readonly create{{ toPascalCase schema.moduleName }}Service: Create{{ toPascalCase schema.moduleName }}Service,
    ) {}

    async execute(command: Create{{ toPascalCase schema.moduleName }}Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.create{{ toPascalCase schema.moduleName }}Service.main(
            {
                {{#each schema.properties.createCommandHandler}}
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