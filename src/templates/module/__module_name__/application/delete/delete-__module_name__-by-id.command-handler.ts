import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Delete{{ toPascalCase schema.moduleName }}ByIdCommand } from './delete-{{ toKebabCase schema.moduleName }}-by-id.command';
import { Delete{{ toPascalCase schema.moduleName }}ByIdService } from './delete-{{ toKebabCase schema.moduleName }}-by-id.service';
import {
    {{ toPascalCase schema.moduleName }}Id
} from './../../domain/value-objects';

@CommandHandler(Delete{{ toPascalCase schema.moduleName }}ByIdCommand)
export class Delete{{ toPascalCase schema.moduleName }}ByIdCommandHandler implements ICommandHandler<Delete{{ toPascalCase schema.moduleName }}ByIdCommand>
{
    constructor(
        private readonly delete{{ toPascalCase schema.moduleName }}ByIdService: Delete{{ toPascalCase schema.moduleName }}ByIdService,
    ) {}

    async execute(command: Delete{{ toPascalCase schema.moduleName }}ByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.delete{{ toPascalCase schema.moduleName }}ByIdService.main(
            new {{ toPascalCase schema.moduleName }}Id(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}