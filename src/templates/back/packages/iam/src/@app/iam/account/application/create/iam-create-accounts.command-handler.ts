/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamCreateAccountsCommand } from './iam-create-accounts.command';
import { IamCreateAccountsService } from './iam-create-accounts.service';
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

@CommandHandler(IamCreateAccountsCommand)
export class IamCreateAccountsCommandHandler implements ICommandHandler<IamCreateAccountsCommand>
{
    constructor(
        private readonly createAccountsService: IamCreateAccountsService,
    ) {}

    async execute(command: IamCreateAccountsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAccountsService.main(
            command.payload
                .map(account =>
                {
                    return {
                        id: new IamAccountId(account.id),
                        type: new IamAccountType(account.type),
                        code: new IamAccountCode(account.code),
                        email: new IamAccountEmail(account.email),
                        isActive: new IamAccountIsActive(account.isActive),
                        clientId: new IamAccountClientId(account.clientId),
                        scopes: new IamAccountScopes(account.scopes),
                        dApplicationCodes: new IamAccountDApplicationCodes(account.dApplicationCodes),
                        dPermissions: new IamAccountDPermissions(account.dPermissions),
                        dTenants: new IamAccountDTenants(account.dTenants),
                        meta: new IamAccountMeta(account.meta),
                        roleIds: new IamAccountRoleIds(account.roleIds),
                        tenantIds: new IamAccountTenantIds(account.tenantIds),
                    };
                }),
            command.cQMetadata,
        );
    }
}
