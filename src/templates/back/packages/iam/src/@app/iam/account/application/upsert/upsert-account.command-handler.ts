/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpsertAccountCommand } from './upsert-account.command';
import { UpsertAccountService } from './upsert-account.service';
import {
    AccountId,
    AccountType,
    AccountCode,
    AccountEmail,
    AccountIsActive,
    AccountClientId,
    AccountScopes,
    AccountDApplicationCodes,
    AccountDPermissions,
    AccountDTenants,
    AccountMeta,
    AccountRoleIds,
    AccountTenantIds,
    AccountCreatedAt,
    AccountUpdatedAt,
    AccountDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpsertAccountCommand)
export class UpsertAccountCommandHandler implements ICommandHandler<UpsertAccountCommand>
{
    constructor(
        private readonly upsertAccountService: UpsertAccountService,
    ) {}

    async execute(command: UpsertAccountCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertAccountService.main(
            {
                id: new AccountId(command.payload.id),
                type: new AccountType(command.payload.type),
                code: new AccountCode(command.payload.code),
                email: new AccountEmail(command.payload.email),
                isActive: new AccountIsActive(command.payload.isActive),
                clientId: new AccountClientId(command.payload.clientId),
                scopes: new AccountScopes(command.payload.scopes),
                dApplicationCodes: new AccountDApplicationCodes(command.payload.dApplicationCodes),
                dPermissions: new AccountDPermissions(command.payload.dPermissions),
                dTenants: new AccountDTenants(command.payload.dTenants),
                meta: new AccountMeta(command.payload.meta),
                roleIds: new AccountRoleIds(command.payload.roleIds),
                tenantIds: new AccountTenantIds(command.payload.tenantIds),
            },
            command.cQMetadata,
        );
    }
}