/* eslint-disable key-spacing */
import { IamCreateAccountCommand } from '@app/iam/account';
import { IamCreateAccountService } from '@app/iam/account/application/create/iam-create-account.service';
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

@CommandHandler(IamCreateAccountCommand)
export class IamCreateAccountCommandHandler implements ICommandHandler<IamCreateAccountCommand>
{
    constructor(
        private readonly createAccountService: IamCreateAccountService,
    ) {}

    async execute(command: IamCreateAccountCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAccountService.main(
            {
                id: new IamAccountId(command.payload.id),
                type: new IamAccountType(command.payload.type),
                code: new IamAccountCode(command.payload.code),
                email: new IamAccountEmail(command.payload.email),
                username: new IamAccountUsername(command.payload.username),
                isActive: new IamAccountIsActive(command.payload.isActive),
                clientId: new IamAccountClientId(command.payload.clientId),
                tags: new IamAccountTags(command.payload.tags),
                scopes: new IamAccountScopes(command.payload.scopes),
                dApplicationCodes: new IamAccountDApplicationCodes(command.payload.dApplicationCodes),
                dPermissions: new IamAccountDPermissions(command.payload.dPermissions, { default: {}}),
                dTenants: new IamAccountDTenants(command.payload.tenantIds, { default: []}),
                meta: new IamAccountMeta(command.payload.meta),
                roleIds: new IamAccountRoleIds(command.payload.roleIds),
                tenantIds: new IamAccountTenantIds(command.payload.tenantIds),
            },
            command.cQMetadata,
        );
    }
}
