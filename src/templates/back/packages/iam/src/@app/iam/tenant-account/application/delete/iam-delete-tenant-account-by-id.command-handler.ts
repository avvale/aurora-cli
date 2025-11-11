import { IamDeleteTenantAccountByIdCommand } from '@app/iam/tenant-account';
import { IamDeleteTenantAccountByIdService } from '@app/iam/tenant-account/application/delete/iam-delete-tenant-account-by-id.service';
import {
    IamTenantAccountAccountId,
    IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamDeleteTenantAccountByIdCommand)
export class IamDeleteTenantAccountByIdCommandHandler
    implements ICommandHandler<IamDeleteTenantAccountByIdCommand>
{
    constructor(
        private readonly deleteTenantAccountByIdService: IamDeleteTenantAccountByIdService,
    ) {}

    async execute(command: IamDeleteTenantAccountByIdCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteTenantAccountByIdService.main(
            new IamTenantAccountTenantId(command.tenantId),
            new IamTenantAccountAccountId(command.accountId),
            command.constraint,
            command.cQMetadata,
        );
    }
}
