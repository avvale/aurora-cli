/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Update{{ toPascalCase schema.moduleName }}ByIdCommand } from './update-{{ toKebabCase schema.moduleName }}-by-id.command';
import { Update{{ toPascalCase schema.moduleName }}ByIdService } from './update-{{ toKebabCase schema.moduleName }}-by-id.service';
import {
    {{> importValueObjects }}
} from '../../domain/value-objects';

@CommandHandler(Update{{ toPascalCase schema.moduleName }}ByIdCommand)
export class Update{{ toPascalCase schema.moduleName }}ByIdCommandHandler implements ICommandHandler<Update{{ toPascalCase schema.moduleName }}ByIdCommand>
{
    constructor(
        private readonly update{{ toPascalCase schema.moduleName }}ByIdService: Update{{ toPascalCase schema.moduleName }}ByIdService,
    ) {}

    async execute(command: Update{{ toPascalCase schema.moduleName }}ByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.update{{ toPascalCase schema.moduleName }}ByIdService.main(
            {
                {{#each schema.properties.updateCommandHandler}}
                {{#if (isAllowProperty ../schema.moduleName this) }}
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