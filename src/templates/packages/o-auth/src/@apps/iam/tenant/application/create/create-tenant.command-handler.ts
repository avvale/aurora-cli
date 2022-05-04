/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTenantCommand } from './create-tenant.command';
import { CreateTenantService } from './create-tenant.service';
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

@CommandHandler(CreateTenantCommand)
export class CreateTenantCommandHandler implements ICommandHandler<CreateTenantCommand>
{
    constructor(
        private readonly createTenantService: CreateTenantService,
    ) {}

    async execute(command: CreateTenantCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createTenantService.main(
            {
                id: new TenantId(command.payload.id),
                name: new TenantName(command.payload.name),
                code: new TenantCode(command.payload.code),
                logo: new TenantLogo(command.payload.logo),
                isActive: new TenantIsActive(command.payload.isActive),
                data: new TenantData(command.payload.data),
                accountIds: new TenantAccountIds(command.payload.accountIds),
            },
            command.cQMetadata,
        );
    }
}