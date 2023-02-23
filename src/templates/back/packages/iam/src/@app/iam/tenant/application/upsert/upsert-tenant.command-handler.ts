/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpsertTenantCommand } from './upsert-tenant.command';
import { UpsertTenantService } from './upsert-tenant.service';
import {
    TenantId,
    TenantName,
    TenantCode,
    TenantLogo,
    TenantIsActive,
    TenantMeta,
    TenantAccountIds,
    TenantCreatedAt,
    TenantUpdatedAt,
    TenantDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpsertTenantCommand)
export class UpsertTenantCommandHandler implements ICommandHandler<UpsertTenantCommand>
{
    constructor(
        private readonly upsertTenantService: UpsertTenantService,
    ) {}

    async execute(command: UpsertTenantCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertTenantService.main(
            {
                id: new TenantId(command.payload.id),
                name: new TenantName(command.payload.name),
                code: new TenantCode(command.payload.code),
                logo: new TenantLogo(command.payload.logo),
                isActive: new TenantIsActive(command.payload.isActive),
                meta: new TenantMeta(command.payload.meta),
                accountIds: new TenantAccountIds(command.payload.accountIds),
            },
            command.cQMetadata,
        );
    }
}