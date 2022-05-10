/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTenantsCommand } from './update-tenants.command';
import { UpdateTenantsService } from './update-tenants.service';
import {
    TenantId,
    TenantName,
    TenantCode,
    TenantLogo,
    TenantIsActive,
    TenantData,
    TenantAccountIds,
    TenantCreatedAt,
    TenantUpdatedAt,
    TenantDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdateTenantsCommand)
export class UpdateTenantsCommandHandler implements ICommandHandler<UpdateTenantsCommand>
{
    constructor(
        private readonly updateTenantsService: UpdateTenantsService,
    ) {}

    async execute(command: UpdateTenantsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateTenantsService.main(
            {
                id: new TenantId(command.payload.id, { undefinable: true }),
                name: new TenantName(command.payload.name, { undefinable: true }),
                code: new TenantCode(command.payload.code),
                logo: new TenantLogo(command.payload.logo),
                isActive: new TenantIsActive(command.payload.isActive, { undefinable: true }),
                data: new TenantData(command.payload.data),
                accountIds: new TenantAccountIds(command.payload.accountIds),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}