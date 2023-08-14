import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonDeleteResourceByIdCommand } from './common-delete-resource-by-id.command';
import { CommonDeleteResourceByIdService } from './common-delete-resource-by-id.service';
import {
    CommonResourceId
} from '../../domain/value-objects';

@CommandHandler(CommonDeleteResourceByIdCommand)
export class CommonDeleteResourceByIdCommandHandler implements ICommandHandler<CommonDeleteResourceByIdCommand>
{
    constructor(
        private readonly deleteResourceByIdService: CommonDeleteResourceByIdService,
    ) {}

    async execute(command: CommonDeleteResourceByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteResourceByIdService.main(
            new CommonResourceId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
