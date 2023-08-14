import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamDeleteTenantByIdCommand } from './iam-delete-tenant-by-id.command';
import { IamDeleteTenantByIdService } from './iam-delete-tenant-by-id.service';
import {
    IamTenantId
} from '../../domain/value-objects';

@CommandHandler(IamDeleteTenantByIdCommand)
export class IamDeleteTenantByIdCommandHandler implements ICommandHandler<IamDeleteTenantByIdCommand>
{
    constructor(
        private readonly deleteTenantByIdService: IamDeleteTenantByIdService,
    ) {}

    async execute(command: IamDeleteTenantByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteTenantByIdService.main(
            new IamTenantId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
