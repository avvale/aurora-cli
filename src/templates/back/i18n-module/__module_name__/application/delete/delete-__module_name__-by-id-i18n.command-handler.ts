import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Delete{{ toPascalCase schema.moduleName }}ByIdI18NCommand } from './delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.command';
import { Delete{{ toPascalCase schema.moduleName }}ByIdI18NService } from './delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.service';
import {
    {{ toPascalCase schema.moduleName }}Id
} from '../../domain/value-objects';

@CommandHandler(Delete{{ toPascalCase schema.moduleName }}ByIdI18NCommand)
export class Delete{{ toPascalCase schema.moduleName }}ByIdI18NCommandHandler implements ICommandHandler<Delete{{ toPascalCase schema.moduleName }}ByIdI18NCommand>
{
    constructor(
        private readonly delete{{ toPascalCase schema.moduleName }}ByIdI18NService: Delete{{ toPascalCase schema.moduleName }}ByIdI18NService,
    ) {}

    async execute(command: Delete{{ toPascalCase schema.moduleName }}ByIdI18NCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.delete{{ toPascalCase schema.moduleName }}ByIdI18NService.main(
            new {{ toPascalCase schema.moduleName }}Id(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}