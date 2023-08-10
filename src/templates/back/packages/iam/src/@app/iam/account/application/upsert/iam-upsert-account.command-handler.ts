/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamUpsertAccountCommand } from './iam-upsert-account.command';
import { IamUpsertAccountService } from './iam-upsert-account.service';
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

@CommandHandler(IamUpsertAccountCommand)
export class IamUpsertAccountCommandHandler implements ICommandHandler<IamUpsertAccountCommand>
{
    constructor(
        private readonly upsertAccountService: IamUpsertAccountService,
    ) {}

    async execute(command: IamUpsertAccountCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertAccountService.main(
            {
                id: new IamAccountId(command.payload.id),
                type: new IamAccountType(command.payload.type),
                code: new IamAccountCode(command.payload.code),
                email: new IamAccountEmail(command.payload.email),
                isActive: new IamAccountIsActive(command.payload.isActive),
                clientId: new IamAccountClientId(command.payload.clientId),
                scopes: new IamAccountScopes(command.payload.scopes),
                dApplicationCodes: new IamAccountDApplicationCodes(command.payload.dApplicationCodes),
                dPermissions: new IamAccountDPermissions(command.payload.dPermissions),
                dTenants: new IamAccountDTenants(command.payload.dTenants),
                meta: new IamAccountMeta(command.payload.meta),
                roleIds: new IamAccountRoleIds(command.payload.roleIds),
                tenantIds: new IamAccountTenantIds(command.payload.tenantIds),
            },
            command.cQMetadata,
        );
    }
}
