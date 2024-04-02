/* eslint-disable key-spacing */
import { IamUpdateAndIncrementTenantsAccountsCommand } from '@app/iam/tenant-account';
import { IamUpdateAndIncrementTenantsAccountsService } from '@app/iam/tenant-account/application/update/iam-update-and-increment-tenants-accounts.service';
import {
    IamTenantAccountAccountId,
    IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdateAndIncrementTenantsAccountsCommand)
export class IamUpdateAndIncrementTenantsAccountsCommandHandler implements ICommandHandler<IamUpdateAndIncrementTenantsAccountsCommand>
{
    constructor(
        private readonly updateTenantsAccountsService: IamUpdateAndIncrementTenantsAccountsService,
    ) {}

    async execute(command: IamUpdateAndIncrementTenantsAccountsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateTenantsAccountsService.main(
            {
                tenantId: new IamTenantAccountTenantId(command.payload.tenantId, { undefinable: true }),
                accountId: new IamTenantAccountAccountId(command.payload.accountId, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
