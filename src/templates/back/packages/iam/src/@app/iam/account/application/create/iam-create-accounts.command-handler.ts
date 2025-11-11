/* eslint-disable key-spacing */
import { IamCreateAccountsCommand } from '@app/iam/account';
import { IamCreateAccountsService } from '@app/iam/account/application/create/iam-create-accounts.service';
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
    IamAccountUsername,
} from '@app/iam/account/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamCreateAccountsCommand)
export class IamCreateAccountsCommandHandler
    implements ICommandHandler<IamCreateAccountsCommand>
{
    constructor(
        private readonly createAccountsService: IamCreateAccountsService,
    ) {}

    async execute(command: IamCreateAccountsCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createAccountsService.main(
            command.payload.map((account) => {
                return {
                    id: new IamAccountId(account.id),
                    type: new IamAccountType(account.type),
                    code: new IamAccountCode(account.code),
                    email: new IamAccountEmail(account.email),
                    username: new IamAccountUsername(account.username),
                    isActive: new IamAccountIsActive(account.isActive),
                    clientId: new IamAccountClientId(account.clientId),
                    tags: new IamAccountTags(account.tags),
                    scopes: new IamAccountScopes(account.scopes),
                    dApplicationCodes: new IamAccountDApplicationCodes(
                        account.dApplicationCodes,
                    ),
                    dPermissions: new IamAccountDPermissions(
                        account.dPermissions,
                    ),
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
