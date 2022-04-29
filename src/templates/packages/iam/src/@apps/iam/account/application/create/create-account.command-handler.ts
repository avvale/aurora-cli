/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountCommand } from './create-account.command';
import { CreateAccountService } from './create-account.service';
import {
    AccountId,
    AccountType,
    AccountEmail,
    AccountIsActive,
    AccountClientId,
    AccountDApplicationCodes,
    AccountDPermissions,
    AccountDTenants,
    AccountData,
    AccountRoleIds,
    AccountTenantIds,
    AccountCreatedAt,
    AccountUpdatedAt,
    AccountDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CreateAccountCommand)
export class CreateAccountCommandHandler implements ICommandHandler<CreateAccountCommand>
{
    constructor(
        private readonly createAccountService: CreateAccountService,
    ) {}

    async execute(command: CreateAccountCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAccountService.main(
            {
                id: new AccountId(command.payload.id),
                type: new AccountType(command.payload.type),
                email: new AccountEmail(command.payload.email),
                isActive: new AccountIsActive(command.payload.isActive),
                clientId: new AccountClientId(command.payload.clientId),
                dApplicationCodes: new AccountDApplicationCodes(command.payload.dApplicationCodes),
                dPermissions: new AccountDPermissions(command.payload.dPermissions, { default: {}}),
                dTenants: new AccountDTenants(command.payload.tenantIds, { default: []}),
                data: new AccountData(command.payload.data),
                roleIds: new AccountRoleIds(command.payload.roleIds),
                tenantIds: new AccountTenantIds(command.payload.tenantIds),
            },
            command.cQMetadata,
        );
    }
}