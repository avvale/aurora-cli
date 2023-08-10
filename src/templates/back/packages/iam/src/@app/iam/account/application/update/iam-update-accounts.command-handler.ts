/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamUpdateAccountsCommand } from './iam-update-accounts.command';
import { IamUpdateAccountsService } from './iam-update-accounts.service';
import {
    IamAccountId,
    IamAccountType,
    IamAccountCode,
    IamAccountEmail,
    IamAccountIsActive,
    IamAccountClientId,
    IamAccountScopes,
    IamAccountDApplicationCodes,
    IamAccountDPermissions,
    IamAccountDTenants,
    IamAccountMeta,
    IamAccountRoleIds,
    IamAccountTenantIds,
    IamAccountCreatedAt,
    IamAccountUpdatedAt,
    IamAccountDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(IamUpdateAccountsCommand)
export class IamUpdateAccountsCommandHandler implements ICommandHandler<IamUpdateAccountsCommand>
{
    constructor(
        private readonly updateAccountsService: IamUpdateAccountsService,
    ) {}

    async execute(command: IamUpdateAccountsCommand): Promise<void>
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
