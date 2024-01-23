/* eslint-disable key-spacing */
import { IamUpdateAccountByIdCommand } from '@app/iam/account';
import { IamUpdateAccountByIdService } from '@app/iam/account/application/update/iam-update-account-by-id.service';
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
    IamAccountTenantIds,
    IamAccountType,
} from '@app/iam/account/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdateAccountByIdCommand)
export class IamUpdateAccountByIdCommandHandler implements ICommandHandler<IamUpdateAccountByIdCommand>
{
    constructor(
        private readonly updateAccountByIdService: IamUpdateAccountByIdService,
    ) {}

    async execute(command: IamUpdateAccountByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAccountByIdService.main(
            {
                id: new IamAccountId(command.payload.id),
                type: new IamAccountType(command.payload.type, { undefinable: true }),
                code: new IamAccountCode(command.payload.code),
                email: new IamAccountEmail(command.payload.email, { undefinable: true }),
                isActive: new IamAccountIsActive(command.payload.isActive, { undefinable: true }),
                clientId: new IamAccountClientId(command.payload.clientId, { undefinable: true }),
                scopes: new IamAccountScopes(command.payload.scopes),
                dApplicationCodes: new IamAccountDApplicationCodes(command.payload.dApplicationCodes, { undefinable: true }),
                dPermissions: new IamAccountDPermissions(command.payload.dPermissions, { undefinable: true }),
                dTenants: new IamAccountDTenants(command.payload.tenantIds, { undefinable: true }),
                meta: new IamAccountMeta(command.payload.meta),
                roleIds: new IamAccountRoleIds(command.payload.roleIds),
                tenantIds: new IamAccountTenantIds(command.payload.tenantIds),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
