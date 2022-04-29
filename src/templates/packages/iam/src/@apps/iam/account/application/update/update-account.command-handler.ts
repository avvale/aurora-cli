/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAccountCommand } from './update-account.command';
import { UpdateAccountService } from './update-account.service';
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

@CommandHandler(UpdateAccountCommand)
export class UpdateAccountCommandHandler implements ICommandHandler<UpdateAccountCommand>
{
    constructor(
        private readonly updateAccountService: UpdateAccountService,
    ) {}

    async execute(command: UpdateAccountCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAccountService.main(
            {
                id: new AccountId(command.payload.id),
                type: new AccountType(command.payload.type, { undefinable: true }),
                email: new AccountEmail(command.payload.email, { undefinable: true }),
                isActive: new AccountIsActive(command.payload.isActive, { undefinable: true }),
                clientId: new AccountClientId(command.payload.clientId, { undefinable: true }),
                dApplicationCodes: new AccountDApplicationCodes(command.payload.dApplicationCodes, { undefinable: true }),
                dPermissions: new AccountDPermissions(command.payload.dPermissions, { undefinable: true }),
                dTenants: new AccountDTenants(command.payload.dTenants, { undefinable: true }),
                data: new AccountData(command.payload.data),
                roleIds: new AccountRoleIds(command.payload.roleIds),
                tenantIds: new AccountTenantIds(command.payload.tenantIds),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}