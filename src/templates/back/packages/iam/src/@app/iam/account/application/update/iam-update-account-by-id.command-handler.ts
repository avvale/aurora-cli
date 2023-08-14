/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamUpdateAccountByIdCommand } from './iam-update-account-by-id.command';
import { IamUpdateAccountByIdService } from './iam-update-account-by-id.service';
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
                dTenants: new IamAccountDTenants(command.payload.dTenants, { undefinable: true }),
                meta: new IamAccountMeta(command.payload.meta),
                roleIds: new IamAccountRoleIds(command.payload.roleIds),
                tenantIds: new IamAccountTenantIds(command.payload.tenantIds),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
