/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Create{{ toPascalCase schema.moduleName }}Command } from './create-{{ toKebabCase schema.moduleName }}.command';
import { Create{{ toPascalCase schema.moduleName }}Service } from './create-{{ toKebabCase schema.moduleName }}.service';
import {
    {{#each schema.properties.valueObjects}}
    {{#unless isI18n}}
    {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }},
    {{/unless}}
    {{#and isI18n (allowI18nProperty2 ../schema.moduleName name)}}
    {{ toPascalCase ../schema.moduleName }}I18N{{ toPascalCase name }},
    {{/and}}
    {{/each}}
} from './../../domain/value-objects';

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
                {{#unless isI18n}}
                {{#if hasTimezone}}
                {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}, {}, { removeTimezone: command.cQMetadata.timezone }),
                {{else}}
                {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}),
                {{/if}}
                {{/unless}}
                {{#and isI18n (allowI18nProperty2 ../schema.moduleName name)}}
                {{#if hasTimezone}}
                {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}I18N{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}, {}, { removeTimezone: command.cQMetadata.timezone }),
                {{else}}
                {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}I18N{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}),
                {{/if}}
                {{/and}}
                {{/each}}
            }
        );
    }
}