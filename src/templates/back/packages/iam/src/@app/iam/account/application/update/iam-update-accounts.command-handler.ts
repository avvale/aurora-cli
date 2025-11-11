/* eslint-disable key-spacing */
import { IamUpdateAccountsCommand } from '@app/iam/account';
import { IamUpdateAccountsService } from '@app/iam/account/application/update/iam-update-accounts.service';
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

@CommandHandler(IamUpdateAccountsCommand)
export class IamUpdateAccountsCommandHandler
    implements ICommandHandler<IamUpdateAccountsCommand>
{
    constructor(
        private readonly updateAccountsService: IamUpdateAccountsService,
    ) {}

    async execute(command: IamUpdateAccountsCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.updateAccountsService.main(
            {
                id: new IamAccountId(command.payload.id, { undefinable: true }),
                type: new IamAccountType(command.payload.type, {
                    undefinable: true,
                }),
                code: new IamAccountCode(command.payload.code),
                email: new IamAccountEmail(command.payload.email),
                username: new IamAccountUsername(command.payload.username, {
                    undefinable: true,
                }),
                isActive: new IamAccountIsActive(command.payload.isActive, {
                    undefinable: true,
                }),
                clientId: new IamAccountClientId(command.payload.clientId, {
                    undefinable: true,
                }),
                tags: new IamAccountTags(command.payload.tags),
                scopes: new IamAccountScopes(command.payload.scopes),
                dApplicationCodes: new IamAccountDApplicationCodes(
                    command.payload.dApplicationCodes,
                    { undefinable: true },
                ),
                dPermissions: new IamAccountDPermissions(
                    command.payload.dPermissions,
                    { undefinable: true },
                ),
                dTenants: new IamAccountDTenants(command.payload.dTenants, {
                    undefinable: true,
                }),
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
