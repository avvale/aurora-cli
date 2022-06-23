import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteLangByIdCommand } from './delete-lang-by-id.command';
import { DeleteLangByIdService } from './delete-lang-by-id.service';
import {
    LangId
} from '../../domain/value-objects';

@CommandHandler(DeleteLangByIdCommand)
export class DeleteLangByIdCommandHandler implements ICommandHandler<DeleteLangByIdCommand>
{
    constructor(
        private readonly deleteLangByIdService: DeleteLangByIdService,
    ) {}

    async execute(command: DeleteLangByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteLangByIdService.main(
            new LangId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}