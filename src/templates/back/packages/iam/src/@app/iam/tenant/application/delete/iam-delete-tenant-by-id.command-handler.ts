import { IamDeleteTenantByIdCommand } from '@app/iam/tenant';
import { IamDeleteTenantByIdService } from '@app/iam/tenant/application/delete/iam-delete-tenant-by-id.service';
import { IamTenantId } from '@app/iam/tenant/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
