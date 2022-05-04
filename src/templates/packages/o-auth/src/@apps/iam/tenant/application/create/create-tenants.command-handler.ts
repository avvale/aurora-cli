/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTenantsCommand } from './create-tenants.command';
import { CreateTenantsService } from './create-tenants.service';
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

@CommandHandler(CreateTenantsCommand)
export class CreateTenantsCommandHandler implements ICommandHandler<CreateTenantsCommand>
{
    constructor(
        private readonly createTenantsService: CreateTenantsService,
    ) {}

    async execute(command: CreateTenantsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createTenantsService.main(
            command.payload
                .map(tenant =>
                {
                    return {
                        id: new TenantId(tenant.id),
                        name: new TenantName(tenant.name),
                        code: new TenantCode(tenant.code),
                        logo: new TenantLogo(tenant.logo),
                        isActive: new TenantIsActive(tenant.isActive),
                        data: new TenantData(tenant.data),
                        accountIds: new TenantAccountIds(tenant.accountIds),
                    };
                }),
            command.cQMetadata,
        );
    }
}