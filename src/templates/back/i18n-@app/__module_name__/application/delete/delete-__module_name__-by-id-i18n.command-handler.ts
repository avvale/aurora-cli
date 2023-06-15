import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Delete{{ toPascalCase schema.moduleName }}ByIdI18nCommand } from './delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.command';
import { Delete{{ toPascalCase schema.moduleName }}ByIdI18nService } from './delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.service';
import {
    {{ toPascalCase schema.moduleName }}Id
} from '../../domain/value-objects';

@CommandHandler(Delete{{ toPascalCase schema.moduleName }}ByIdI18nCommand)
export class Delete{{ toPascalCase schema.moduleName }}ByIdI18nCommandHandler implements ICommandHandler<Delete{{ toPascalCase schema.moduleName }}ByIdI18nCommand>
{
    constructor(
        private readonly delete{{ toPascalCase schema.moduleName }}ByIdI18nService: Delete{{ toPascalCase schema.moduleName }}ByIdI18nService,
    ) {}

    async execute(command: Delete{{ toPascalCase schema.moduleName }}ByIdI18nCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.delete{{ toPascalCase schema.moduleName }}ByIdI18nService
            .main(
                new {{ toPascalCase schema.moduleName }}Id(command.id),
                command.constraint,
                command.cQMetadata,
            );
    }
}