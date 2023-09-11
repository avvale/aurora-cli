/* eslint-disable key-spacing */
import { IamUpdateTenantsAccountsCommand } from '@app/iam/tenant-account';
import { IamUpdateTenantsAccountsService } from '@app/iam/tenant-account/application/update/iam-update-tenants-accounts.service';
import {
    IamTenantAccountAccountId,
    IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdateTenantsAccountsCommand)
export class IamUpdateTenantsAccountsCommandHandler implements ICommandHandler<IamUpdateTenantsAccountsCommand>
{
    constructor(
        private readonly updateTenantsAccountsService: IamUpdateTenantsAccountsService,
    ) {}

    async execute(command: IamUpdateTenantsAccountsCommand): Promise<void>
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
