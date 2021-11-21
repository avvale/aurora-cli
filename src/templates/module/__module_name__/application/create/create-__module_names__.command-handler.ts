/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Create{{ toPascalCase schema.moduleNames }}Command } from './create-{{ toKebabCase schema.moduleNames }}.command';
import { Create{{ toPascalCase schema.moduleNames }}Service } from './create-{{ toKebabCase schema.moduleNames }}.service';
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

@CommandHandler(Create{{ toPascalCase schema.moduleNames }}Command)
export class Create{{ toPascalCase schema.moduleNames }}CommandHandler implements ICommandHandler<Create{{ toPascalCase schema.moduleNames }}Command>
{
    constructor(
        private readonly create{{ toPascalCase schema.moduleNames }}Service: Create{{ toPascalCase schema.moduleNames }}Service,
    ) {}

    async execute(command: Create{{ toPascalCase schema.moduleNames }}Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.create{{ toPascalCase schema.moduleNames }}Service.main(
            command.payload
                .map({{ toCamelCase schema.moduleName }} =>
                {
                    return {
                        {{#each schema.properties.createCommandHandler}}
                        {{#unless isI18n}}
                        {{#if hasTimezone}}
                        {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }}({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}, {}, { removeTimezone: command.cQMetadata.timezone }),
                        {{else}}
                        {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }}({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}),
                        {{/if}}
                        {{/unless}}
                        {{#and isI18n (allowI18nProperty2 ../schema.moduleName name)}}
                        {{#if hasTimezone}}
                        {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}I18N{{ toPascalCase name }}({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}, {}, { removeTimezone: command.cQMetadata.timezone }),
                        {{else}}
                        {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}I18N{{ toPascalCase name }}({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}),
                        {{/if}}
                        {{/and}}
                        {{/each}}
                    };
                })
        );
    }
}