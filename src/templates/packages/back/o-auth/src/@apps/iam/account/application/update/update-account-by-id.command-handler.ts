/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAccountByIdCommand } from './update-account-by-id.command';
import { UpdateAccountByIdService } from './update-account-by-id.service';
import {
    AccountId,
    AccountType,
    AccountEmail,
    AccountIsActive,
    AccountClientId,
    AccountDApplicationCodes,
    AccountDPermissions,
    AccountDTenants,
    AccountDScopes,
    AccountData,
    AccountRoleIds,
    AccountTenantIds,
    AccountCreatedAt,
    AccountUpdatedAt,
    AccountDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdateAccountByIdCommand)
export class UpdateAccountByIdCommandHandler implements ICommandHandler<UpdateAccountByIdCommand>
{
    constructor(
        private readonly updateAccountByIdService: UpdateAccountByIdService,
    ) {}

    async execute(command: UpdateAccountByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAccountByIdService.main(
            {
                id: new AccountId(command.payload.id),
                type: new AccountType(command.payload.type, { undefinable: true }),
                email: new AccountEmail(command.payload.email, { undefinable: true }),
                isActive: new AccountIsActive(command.payload.isActive, { undefinable: true }),
                clientId: new AccountClientId(command.payload.clientId, { undefinable: true }),
                dApplicationCodes: new AccountDApplicationCodes(command.payload.dApplicationCodes, { undefinable: true }),
                dPermissions: new AccountDPermissions(command.payload.dPermissions, { undefinable: true }),
                dTenants: new AccountDTenants(command.payload.dTenants, { undefinable: true }),
                dScopes: new AccountDScopes(command.payload.dScopes),
                data: new AccountData(command.payload.data),
                roleIds: new AccountRoleIds(command.payload.roleIds),
                tenantIds: new AccountTenantIds(command.payload.tenantIds),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}