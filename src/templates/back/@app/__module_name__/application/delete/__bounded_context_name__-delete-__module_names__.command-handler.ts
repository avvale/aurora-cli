import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Command } from './{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleNames }}.command';
import { {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Service } from './{{ toKebabCase schema.boundedContextName }}-delete-{{ toKebabCase schema.moduleNames }}.service';

@CommandHandler({{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Command)
export class {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}CommandHandler implements ICommandHandler<{{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Command>
{
    constructor(
        private readonly delete{{ toPascalCase schema.moduleNames }}Service: {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Service,
    ) {}

    async execute(command: {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.delete{{ toPascalCase schema.moduleNames }}Service.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
