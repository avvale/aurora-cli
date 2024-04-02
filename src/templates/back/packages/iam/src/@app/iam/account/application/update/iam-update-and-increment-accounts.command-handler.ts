/* eslint-disable key-spacing */
import { IamUpdateAndIncrementAccountsCommand } from '@app/iam/account';
import { IamUpdateAndIncrementAccountsService } from '@app/iam/account/application/update/iam-update-and-increment-accounts.service';
import {
    IamAccountClientId,
    IamAccountCode,
    IamAccountDApplicationCodes,
    IamAccountDPermissions,
    IamAccountDTenants,
    IamAccountEmail,
    IamAccountId,
    IamAccountIsActive,
    IamAccountMeta,
    IamAccountRoleIds,
    IamAccountScopes,
    IamAccountTags,
    IamAccountTenantIds,
    IamAccountType,
} from '@app/iam/account/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdateAndIncrementAccountsCommand)
export class IamUpdateAndIncrementAccountsCommandHandler implements ICommandHandler<IamUpdateAndIncrementAccountsCommand>
{
    constructor(
        private readonly updateAccountsService: IamUpdateAndIncrementAccountsService,
    ) {}

    async execute(command: IamUpdateAndIncrementAccountsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAccountsService.main(
            {
                id: new IamAccountId(command.payload.id, { undefinable: true }),
                type: new IamAccountType(command.payload.type, { undefinable: true }),
                code: new IamAccountCode(command.payload.code),
                email: new IamAccountEmail(command.payload.email, { undefinable: true }),
                isActive: new IamAccountIsActive(command.payload.isActive, { undefinable: true }),
                clientId: new IamAccountClientId(command.payload.clientId, { undefinable: true }),
                tags: new IamAccountTags(command.payload.tags),
                scopes: new IamAccountScopes(command.payload.scopes),
                dApplicationCodes: new IamAccountDApplicationCodes(command.payload.dApplicationCodes, { undefinable: true }),
                dPermissions: new IamAccountDPermissions(command.payload.dPermissions, { undefinable: true }),
                dTenants: new IamAccountDTenants(command.payload.dTenants, { undefinable: true }),
                meta: new IamAccountMeta(command.payload.meta),
                roleIds: new IamAccountRoleIds(command.payload.roleIds),
                tenantIds: new IamAccountTenantIds(command.payload.tenantIds),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
