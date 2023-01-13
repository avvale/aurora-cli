import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Delete{{ toPascalCase schema.moduleNames }}Command } from './delete-{{ toKebabCase schema.moduleNames }}.command';
import { Delete{{ toPascalCase schema.moduleNames }}Service } from './delete-{{ toKebabCase schema.moduleNames }}.service';

@CommandHandler(Delete{{ toPascalCase schema.moduleNames }}Command)
export class Delete{{ toPascalCase schema.moduleNames }}CommandHandler implements ICommandHandler<Delete{{ toPascalCase schema.moduleNames }}Command>
{
    constructor(
        private readonly delete{{ toPascalCase schema.moduleNames }}Service: Delete{{ toPascalCase schema.moduleNames }}Service,
    ) {}

    async execute(command: Delete{{ toPascalCase schema.moduleNames }}Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.delete{{ toPascalCase schema.moduleNames }}Service.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}