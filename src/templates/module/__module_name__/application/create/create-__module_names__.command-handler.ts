/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Create{{ toPascalCase schema.moduleNames }}Command } from './create-{{ toKebabCase schema.moduleNames }}.command';
import { Create{{ toPascalCase schema.moduleNames }}Service } from './create-{{ toKebabCase schema.moduleNames }}.service';
import {
    {{#each schema.properties.valueObjects}}
    {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }},
    {{/each}}
    {{#each schema.propertiesI18n.valueObjects}}
    {{#if @first}}

    // i18n
    {{/if}}
    {{#allowI18nProperty ../schema.moduleName name}}
    {{ toPascalCase ../schema.moduleName }}I18N{{ toPascalCase name }},
    {{/allowI18nProperty}}
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
                        {{#if hasTimezone}}
                        {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }}({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}, {}, { removeTimezone: command.cQMetadata.timezone }),
                        {{else}}
                        {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }}({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}),
                        {{/if}}
                        {{/each}}
                        {{#each schema.propertiesI18n.createCommandHandler}}
                        {{#if @first}}

                        // i18n
                        {{/if}}
                        {{#allowI18nProperty ../schema.moduleName name}}
                        {{#if hasTimezone}}
                        {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}I18N{{ toPascalCase name }}({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}, {}, { removeTimezone: command.cQMetadata.timezone }),
                        {{else}}
                        {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}I18N{{ toPascalCase name }}({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}),
                        {{/if}}
                        {{/allowI18nProperty}}
                        {{/each}}
                    };
                })
        );
    }
}