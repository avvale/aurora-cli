import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSideEffectByIdCommand } from './delete-side-effect-by-id.command';
import { DeleteSideEffectByIdService } from './delete-side-effect-by-id.service';
import {
    SideEffectId
} from '../../domain/value-objects';

@CommandHandler(DeleteSideEffectByIdCommand)
export class DeleteSideEffectByIdCommandHandler implements ICommandHandler<DeleteSideEffectByIdCommand>
{
    constructor(
        private readonly deleteSideEffectByIdService: DeleteSideEffectByIdService,
    ) {}

    async execute(command: DeleteSideEffectByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteSideEffectByIdService.main(
            new SideEffectId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}