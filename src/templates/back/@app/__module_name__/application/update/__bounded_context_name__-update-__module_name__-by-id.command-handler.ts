/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdCommand } from './{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleName }}-by-id.command';
import { {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdService } from './{{ toKebabCase schema.boundedContextName }}-update-{{ toKebabCase schema.moduleName }}-by-id.service';
import {
    {{> importValueObjects }}
} from '../../domain/value-objects';

@CommandHandler({{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdCommand)
export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdCommandHandler implements ICommandHandler<{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdCommand>
{
    constructor(
        private readonly update{{ toPascalCase schema.moduleName }}ByIdService: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdService,
    ) {}

    async execute(command: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.update{{ toPascalCase schema.moduleName }}ByIdService.main(
            {
                {{#each schema.aggregateProperties.updateCommandHandler}}
                {{#if (isAllowProperty ../schema.moduleName this) }}
                {{#if hasTimezone}}
                {{ toCamelCase name }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}, { {{~#unless nullable}}{{#unlessEq name 'id'}} undefinable: true {{/unlessEq}}{{/unless~}} }, { removeTimezone: command.cQMetadata.timezone }),
                {{else}}
                {{#unless (isI18nAvailableLangsProperty . ../schema.aggregateProperties)}}
                {{ toCamelCase name }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}{{#unless nullable}}{{#unlessEq name 'id'}}, { undefinable: true }{{/unlessEq}}{{/unless}}),
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
