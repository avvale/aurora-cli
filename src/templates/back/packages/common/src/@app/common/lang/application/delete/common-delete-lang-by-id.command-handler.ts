import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonDeleteLangByIdCommand } from './common-delete-lang-by-id.command';
import { CommonDeleteLangByIdService } from './common-delete-lang-by-id.service';
import {
    CommonLangId
} from '../../domain/value-objects';

@CommandHandler(CommonDeleteLangByIdCommand)
export class CommonDeleteLangByIdCommandHandler implements ICommandHandler<CommonDeleteLangByIdCommand>
{
    constructor(
        private readonly deleteLangByIdService: CommonDeleteLangByIdService,
    ) {}

    async execute(command: CommonDeleteLangByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteLangByIdService.main(
            new CommonLangId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}